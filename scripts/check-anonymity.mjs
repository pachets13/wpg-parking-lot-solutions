#!/usr/bin/env node
/**
 * check-anonymity.mjs — fail the build when the real business behind this
 * sanitized fork becomes identifiable in it.
 *
 * WHY THIS EXISTS, AND WHY IT IS SHAPED THIS WAY
 * The 2026-08-06 remediation scrubbed all three public concept repos and was
 * believed complete. On 2026-08-07 both this repo and fire-protection-demo were
 * still leaking, live and publicly fetchable. The reason is that the whole 2026-
 * 08-06 pass searched for TEXT — `git log -S` over history, `grep` over dist/.
 * Every survivor was invisible to a text search:
 *
 *   - 15 image FILENAMES carrying the real company name. A grep of file
 *     *contents* never reads a path.
 *   - A ROUTE whose slug was the real company name, so it sat in a published URL.
 *   - An unreferenced LOGO in the fire fork: the real company's actual mark,
 *     byte-identical to the private original, marked "orphaned (no longer
 *     referenced)" and left in place. Nothing parses a JPEG as text, and not
 *     referenced is not removed — it still served at a guessable public URL.
 *
 * Note that this comment describes those leaks without reproducing any of them.
 * That is a rule, not an accident: this file ships in a public repo, so writing
 * the real name here — even to explain what must never appear — would be the
 * leak itself. It would also fail this very check, which is the correct answer.
 *
 * So this check deliberately does not look where the last one looked. It reads
 * paths, it reads built output, and it compares file *hashes* against the
 * private original. The hash rule is the only one of the three that catches a
 * leaked image after somebody renames it.
 *
 * WHY prebuild AND postbuild, NOT ONE OR THE OTHER
 * The source rules (paths, source strings, asset hashes) belong on `prebuild`:
 * they check inputs, and they should fail before the build spends any time.
 * The dist rule CANNOT run there. `prebuild` fires before `astro build`, so at
 * that moment dist/ is the *previous* build's output — checking it would pass a
 * stale-clean dist while shipping a dirty new one, and fail a stale-dirty dist
 * after the source was already fixed. Both answers are wrong. The dist rule
 * runs on `postbuild`, against the bytes that are actually about to ship.
 *
 * WHY NOT meta/checks/
 * Same reason as pachet-site/scripts/check-privacy-sync.mjs, which this is
 * modelled on: meta/checks/run-all.sh runs on knowledge-repo commits, and those
 * have no correlation with concept-site changes — every concept site is a
 * separate gitignored repo with its own commit stream. A knowledge-repo commit
 * gate would never have fired on any of the leaks above.
 *
 * WHY THE PAIR MAPPING IS NOT IN THIS FILE
 * Which private repo this fork is paired with is already structured data, in
 * web-design-and-development/concept-sites.md. Restating it here would create a
 * second home for one fact (RULES.md § 2), and the copy would be the one that
 * goes stale. This parses that table instead.
 *
 * TWO TIERS, AND WHY DEPLOY DEMANDS THE FULL ONE
 * The term rules need the real business's identifying strings, which live in the
 * PRIVATE pair (anonymity-terms.json). A list of "never publish these strings"
 * is itself a disclosure, so it cannot be committed here. That means a clone of
 * this public repo alone cannot run the term rules.
 *
 * Rather than hard-fail such a clone (this repo is a portfolio artifact people
 * may reasonably want to build) or silently skip (a gate nobody notices is dead
 * is worse than no gate), the check runs in the best tier available and says
 * which one, loudly:
 *
 *   FULL      private pair reachable — all four rules run
 *   PARTIAL   private pair absent — hash rule runs off the committed manifest,
 *             term rules cannot run
 *
 * The un-skippable point is publication, not compilation: scripts/deploy.sh
 * refuses to publish unless this exits FULL. That is the same place .nojekyll is
 * already enforced, and publication is the only moment a leak reaches anyone.
 *
 * WHAT THIS DELIBERATELY DOES NOT PROVE
 * (following the example of pachet-site/scripts/check-headers.mjs)
 * It cannot tell you an image is unrecognisable. It can only tell you the image
 * is not the same FILE. Re-crop, re-compress, re-export, or screenshot the real
 * company's logo and every rule here passes — the hash changes, no name appears
 * in the path, no string reaches dist/. A photograph of the real owner, the real
 * truck with the real livery, or the real building passes all four rules with
 * nothing to say about it.
 *
 * Green here means "the specific mechanical leaks that actually happened cannot
 * happen again." It does not mean the site is anonymous. That judgment is a
 * human looking at the images, and this check is not a substitute for it.
 *
 * WHY THERE IS A --history MODE, AND WHY IT IS NOT OPTIONAL AT DEPLOY
 * Every rule above reads the *working tree* — the files as they are right now.
 * Git does not forget. A leak that was committed and later deleted is still a
 * blob in .git, still reachable from an old commit, and — once pushed — still
 * served by the host at a stable URL. `main`'s own root commit is permanently
 * reachable: it is not orphaned residue awaiting garbage collection, so "it
 * will be collected eventually" is not true of it.
 *
 * That is not hypothetical here. Two separate remediation passes squashed these
 * forks and declared them clean, and both times the declaration rested on a
 * hand-picked `git log -S` for the string the *last* leak happened to use. On
 * 2026-08-07 all three forks were still serving an identifying string out of
 * their root commit, unauthenticated, over the raw-content host. The 2026-08-06
 * pass searched one term per repo and got one of three right.
 *
 * So the fix is not a better search term. It is to stop choosing search terms by
 * hand: this mode walks every object in `git rev-list --all` and applies the
 * exact same term rules, from the exact same source of truth, that the working
 * tree already gets. The term list is the private pair's anonymity-terms.json —
 * the full structured list, with its documented exceptions — not somebody's
 * memory of what leaked last time.
 *
 * It reads three things a tree scan cannot:
 *   - every blob's CONTENT, at every version it ever had
 *   - every PATH any blob was ever stored under (a filename is a public URL,
 *     and renaming a file does not remove the old name from history)
 *   - every COMMIT MESSAGE and ref name. This one is easy to forget and it is
 *     load-bearing: concept-sites.md records that redacting file contents while
 *     keeping the commit graph would not have worked, because the messages were
 *     themselves the tell.
 *
 * Usage:
 *   node scripts/check-anonymity.mjs           # source rules  (wired to prebuild)
 *   node scripts/check-anonymity.mjs --dist    # dist rules    (wired to postbuild)
 *   node scripts/check-anonymity.mjs --history # history rules (used by deploy.sh)
 *   node scripts/check-anonymity.mjs --require-full   # used by deploy.sh
 */

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONCEPT_SITES = join(ROOT, '..');
const REGISTRY = join(
  CONCEPT_SITES,
  '..',
  'web-design-and-development',
  'concept-sites.md'
);
const MANIFEST = join(ROOT, 'scripts', 'private-asset-hashes.txt');
const ALLOWLIST = join(ROOT, 'scripts', 'shared-assets.allow');
const SCAN_FLOOR = join(ROOT, 'scripts', 'scan-floor.json');

const DIST_MODE = process.argv.includes('--dist');
const HISTORY_MODE = process.argv.includes('--history');
const REQUIRE_FULL = process.argv.includes('--require-full');
const WRITE_FLOOR = process.argv.includes('--write-floor');

const errors = [];
const notes = [];

/* ── helpers ─────────────────────────────────────────────────────────────── */

/**
 * Directories that never contain our own content. node_modules is obvious;
 * package-lock.json is the subtle one. npm records a subresource hash for every
 * dependency under a fixed key name, and that key name collides exactly with a
 * forbidden term in one of these forks — scanning the lockfile there produced
 * ~1,900 false positives. False positives are how you train yourself to reach
 * for --no-verify, so the lockfile is excluded by name rather than tolerated.
 *
 * (This file is identical in every public fork, so it must never spell out any
 * real business name — a term forbidden in a sibling fork would fail there.)
 */
const SKIP_DIRS = new Set(['node_modules', '.git', '.astro', 'dist']);
const SKIP_FILES = new Set(['package-lock.json', 'private-asset-hashes.txt', 'shared-assets.allow']);
const TEXT_EXT = new Set([
  '.astro', '.js', '.mjs', '.cjs', '.ts', '.jsx', '.tsx', '.json', '.md',
  '.css', '.html', '.txt', '.svg', '.sh', '.py', '.yml', '.yaml',
]);

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.name === '.DS_Store') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      await walk(full, out);
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

async function readMaybe(p, enc) {
  try {
    return await readFile(p, enc);
  } catch {
    return null;
  }
}

/* ── the pair mapping, read from the one place it lives ──────────────────── */

/**
 * Parse the builds table in concept-sites.md. Rows look like:
 *   | `some-public-fork` | public  | `some-case-study` | Sanitized fork — published |
 *   | `its-private-pair`  | private | —                 | Real-data original |
 *
 * (Deliberately generic: naming this repo's actual private pair here would put
 * the real business's name in a public file, and would fail this check.)
 *
 * The pairing is positional: each public fork is immediately followed by its
 * private original. That is the table's own convention and the reason it reads
 * as pairs; this relies on it rather than inventing a parallel mapping file.
 */
async function resolvePrivatePair(selfName) {
  const src = await readMaybe(REGISTRY, 'utf8');
  if (!src) return { pair: null, why: `registry not readable at ${REGISTRY}` };

  const rows = [];
  for (const line of src.split('\n')) {
    const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*(public|private)\s*\|/);
    if (m) rows.push({ repo: m[1], visibility: m[2] });
  }
  if (!rows.length) {
    return {
      pair: null,
      why:
        'the builds table in concept-sites.md no longer parses as ' +
        '`| `repo` | public/private | ...` rows. If that table was restructured, ' +
        'this check lost its pair mapping — fix the parser, do not copy the ' +
        'pairs into a second file (RULES.md § 2).',
    };
  }

  const i = rows.findIndex((r) => r.repo === selfName);
  if (i === -1) {
    return { pair: null, why: `${selfName} is not listed in concept-sites.md` };
  }
  const next = rows[i + 1];
  if (!next || next.visibility !== 'private') {
    return { pair: null, why: `${selfName} has no private original after it in the table` };
  }
  return { pair: next.repo, why: null };
}

/* ── forbidden terms, from the private pair ──────────────────────────────── */

async function loadTerms(pairRepo) {
  const p = join(CONCEPT_SITES, pairRepo, 'anonymity-terms.json');
  const raw = await readMaybe(p, 'utf8');
  if (!raw) return null;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    errors.push(
      `${pairRepo}/anonymity-terms.json is not valid JSON (${e.message}).\n` +
        '  That file is the term rules. Malformed, this check is silently weaker.'
    );
    return null;
  }
  if (!Array.isArray(parsed.terms) || !parsed.terms.length) {
    errors.push(`${pairRepo}/anonymity-terms.json has no \`terms\` array.`);
    return null;
  }
  return parsed.terms.map((t) => ({
    match: String(t.match).toLowerCase(),
    why: t.why || '',
    except: (t.except || []).map((x) => String(x).toLowerCase()),
  }));
}

/**
 * Find a term in a haystack, ignoring occurrences that sit inside a documented
 * exception. Returns the offending index, or -1.
 */
function findTerm(haystackLower, term) {
  let from = 0;
  for (;;) {
    const i = haystackLower.indexOf(term.match, from);
    if (i === -1) return -1;
    const covered = term.except.some((ex) => {
      let j = haystackLower.lastIndexOf(ex, i);
      return j !== -1 && j + ex.length > i;
    });
    if (!covered) return i;
    from = i + 1;
  }
}

function contextAt(text, index) {
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + 60);
  return (start ? '…' : '') + text.slice(start, end).replace(/\s+/g, ' ') + (end < text.length ? '…' : '');
}

/* ── git plumbing, for the history rule ──────────────────────────────────── */

/**
 * Returns stdout as a Buffer, never a string: blob payloads are read by byte
 * offset and any decoding here would corrupt the offsets. `input` is passed as
 * a Buffer for the same reason.
 */
function git(args, input) {
  return execFileSync('git', args, {
    cwd: ROOT,
    input: input === undefined ? undefined : Buffer.from(input, 'utf8'),
    maxBuffer: 1024 * 1024 * 1024,
  });
}

/**
 * Every (blob sha → every path it was ever stored under) across every commit on
 * every ref.
 *
 * WHY THIS WALKS COMMITS INSTEAD OF USING `rev-list --objects --all`
 * The obvious implementation is one `rev-list --objects --all`, which lists the
 * whole graph in a single pass and hands you a path with each blob. It is wrong
 * here, and wrong in the exact way this check exists to catch: **it emits each
 * object once**, with whichever path the traversal happened to reach first. So
 * for a file that was renamed, only the surviving name is reported and the old
 * one silently disappears — while the old name is the one that leaked, is still
 * in an old tree, and was a live public URL for as long as it existed.
 *
 * `git mv public/<realname>-logo.png public/logo.png` is enough to hide the leak
 * from that version. Renaming the offending files is also the most natural way
 * somebody "fixes" this, so the failure mode and the likely history coincide.
 *
 * Walking `ls-tree -r` per commit gives every (path, blob) pair that ever
 * existed, renames included. It costs one git call per commit, which is nothing
 * on a squashed repo and acceptable on any repo small enough to be a concept
 * site. `-z` keeps paths raw so unusual characters are not shell-quoted.
 */
function historyBlobs() {
  const commits = git(['rev-list', '--all']).toString('utf8').split('\n').filter(Boolean);
  const blobs = new Map(); // sha -> Set(path)
  for (const commit of commits) {
    const listing = git(['ls-tree', '-r', '-z', commit]).toString('utf8');
    for (const rec of listing.split('\0')) {
      if (!rec) continue;
      const tab = rec.indexOf('\t');
      if (tab === -1) continue;
      const [, type, sha] = rec.slice(0, tab).split(/\s+/);
      if (type !== 'blob') continue;
      const path = rec.slice(tab + 1);
      if (!blobs.has(sha)) blobs.set(sha, new Set());
      blobs.get(sha).add(path);
    }
  }
  return blobs;
}

/**
 * Bulk-read blob contents. `cat-file --batch` streams
 *   "<sha> <type> <size>\n<size bytes>\n"
 * per record, so it is parsed by byte offset rather than by splitting on
 * newlines — blob content contains newlines, and a naive split silently drops
 * most of the file. Reading each blob with its own `git cat-file` process would
 * be simpler and is what makes this check too slow to leave wired to deploy.
 */
function readBlobs(shas) {
  const out = new Map();
  if (!shas.length) return out;
  const buf = git(['cat-file', '--batch'], shas.join('\n') + '\n');
  let off = 0;
  while (off < buf.length) {
    const nl = buf.indexOf(0x0a, off);
    if (nl === -1) break;
    const header = buf.toString('utf8', off, nl);
    const parts = header.split(' ');
    if (parts.length < 3) break; // "<sha> missing" — skip defensively
    const size = Number(parts[2]);
    if (!Number.isFinite(size)) break;
    const start = nl + 1;
    out.set(parts[0], buf.subarray(start, start + size));
    off = start + size + 1; // trailing newline after the payload
  }
  return out;
}

/** Commit messages and ref names — history that is not a file. */
function historyMessages() {
  const records = [];
  const log = git(['log', '--all', '--pretty=format:%H%x00%B%x01']).toString('utf8');
  for (const rec of log.split('\x01')) {
    const i = rec.indexOf('\x00');
    if (i === -1) continue;
    records.push({ label: `commit ${rec.slice(0, i).trim().slice(0, 12)} message`, text: rec.slice(i + 1) });
  }
  const refs = git(['for-each-ref', '--format=%(refname)']).toString('utf8');
  for (const r of refs.split('\n')) {
    if (r.trim()) records.push({ label: 'ref name', text: r.trim() });
  }
  return records;
}

/* ── main ────────────────────────────────────────────────────────────────── */

const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));
const SELF = pkg.name;

const { pair, why: pairWhy } = await resolvePrivatePair(SELF);
const terms = pair ? await loadTerms(pair) : null;
const tier = terms ? 'FULL' : 'PARTIAL';

if (tier === 'PARTIAL') {
  notes.push(
    pair
      ? `private pair "${pair}" is not reachable at ../${pair}/anonymity-terms.json`
      : `private pair unknown: ${pairWhy}`
  );
}

if (REQUIRE_FULL && tier !== 'FULL') {
  console.error('\n✗ anonymity gate: refusing to publish on a PARTIAL check\n');
  for (const n of notes) console.error('  • ' + n);
  console.error(
    '\n  Publishing is the only moment a leak reaches anyone, so the deploy path\n' +
      '  requires every rule to have actually run. Restore the private pair beside\n' +
      '  this repo in concept-sites/ and deploy again.\n'
  );
  process.exit(1);
}

if (HISTORY_MODE) {
  /* ── RULE 5: no forbidden term anywhere in the object graph ───────────── */
  if (!terms) {
    console.error(
      '\n✗ anonymity gate: --history cannot run without the term rules.\n\n' +
        '  History is scanned with the same terms as the working tree, and those\n' +
        '  live in the private pair. Restore it beside this repo in concept-sites/.\n'
    );
    process.exit(1);
  }

  const blobs = historyBlobs();
  let blobsScanned = 0;
  let blobsRead = 0;

  // Path rules first: they need no content, and a leaked filename is a public
  // URL on its own. A blob keeps every path it was ever stored under, so a
  // rename does not retire the old one.
  const textShas = new Set();
  for (const [sha, pathSet] of blobs) {
    for (const p of pathSet) {
      const parts = p.split('/');
      if (parts.some((seg) => SKIP_DIRS.has(seg))) continue;
      if (SKIP_FILES.has(parts[parts.length - 1])) continue;
      blobsScanned++;
      const lowerPath = p.toLowerCase();
      for (const t of terms) {
        if (findTerm(lowerPath, t) !== -1) {
          errors.push(
            `history: blob ${sha.slice(0, 12)} was stored at "${p}", which contains "${t.match}".\n` +
              `  ${t.why}\n` +
              '  Deleting the file does not remove this. The path is in the commit that\n' +
              '  added it, and that commit is still reachable and still served.'
          );
        }
      }
      const ext = p.slice(p.lastIndexOf('.'));
      if (TEXT_EXT.has(ext)) textShas.add(sha);
    }
  }

  // Content rules, in bulk.
  const contents = readBlobs([...textShas]);
  for (const [sha, buf] of contents) {
    // A NUL byte means the extension lied and this is binary; decoding it
    // as text yields mojibake, not a match. The extension filter already did
    // the real work, so this is only a safety net.
    if (buf.includes(0)) continue;
    const text = buf.toString('utf8');
    blobsRead++;
    const lower = text.toLowerCase();
    const where = [...(blobs.get(sha) || [])].join(', ') || '(no path)';
    for (const t of terms) {
      const i = findTerm(lower, t);
      if (i !== -1) {
        errors.push(
          `history: blob ${sha.slice(0, 12)} (${where}) contains "${t.match}".\n` +
            `  ${t.why}\n  context: ${contextAt(text, i)}\n` +
            '  This is reachable over the network by SHA and cannot be fixed by a new\n' +
            '  commit — only by replacing the history and force-pushing.'
        );
      }
    }
  }

  // Commit messages and ref names. concept-sites.md records that the messages
  // were the tell last time, so redacting content alone would not have held.
  const messages = historyMessages();
  for (const rec of messages) {
    const lower = rec.text.toLowerCase();
    for (const t of terms) {
      const i = findTerm(lower, t);
      if (i !== -1) {
        errors.push(
          `history: ${rec.label} contains "${t.match}".\n` +
            `  ${t.why}\n  context: ${contextAt(rec.text, i)}`
        );
      }
    }
  }

  await enforceScanFloor('history', {
    blobPaths: blobsScanned,
    blobsRead,
    messages: messages.length,
  });
  report(
    `history scan: ${blobs.size} blobs over ${blobsScanned} paths, ` +
      `${blobsRead} read as text, ${messages.length} messages and refs`
  );
} else if (DIST_MODE) {
  /* ── RULE 4: no forbidden string in the bytes about to ship ───────────── */
  const distFiles = await walk(join(ROOT, 'dist'));
  if (!distFiles.length) {
    console.error('\n✗ anonymity gate: dist/ is empty or missing on a --dist run.\n');
    process.exit(1);
  }
  let scanned = 0;
  if (terms) {
    for (const f of distFiles) {
      const rel = relative(ROOT, f);
      const ext = f.slice(f.lastIndexOf('.'));
      if (!TEXT_EXT.has(ext)) continue;
      const text = await readMaybe(f, 'utf8');
      if (text === null) continue;
      scanned++;
      const lower = text.toLowerCase();
      // Paths are checked too: dist/ is what actually gets served, so a leaked
      // filename here is a live URL.
      const lowerRel = rel.toLowerCase();
      for (const t of terms) {
        const pi = findTerm(lowerRel, t);
        if (pi !== -1) {
          errors.push(`dist path "${rel}" contains "${t.match}".\n  ${t.why}`);
        }
        const i = findTerm(lower, t);
        if (i !== -1) {
          errors.push(
            `${rel} contains "${t.match}" — this is about to be published.\n` +
              `  ${t.why}\n  context: ${contextAt(text, i)}`
          );
        }
      }
    }
    // Non-text dist files still get their paths checked.
    for (const f of distFiles) {
      const rel = relative(ROOT, f);
      const ext = f.slice(f.lastIndexOf('.'));
      if (TEXT_EXT.has(ext)) continue;
      const lowerRel = rel.toLowerCase();
      for (const t of terms) {
        if (findTerm(lowerRel, t) !== -1) {
          errors.push(`dist path "${rel}" contains "${t.match}".\n  ${t.why}`);
        }
      }
    }
  }
  await enforceScanFloor('dist', { distFiles: distFiles.length, distText: scanned });
  report(`dist scan: ${distFiles.length} files, ${scanned} read as text`);
} else {
  /* ── RULE 1 + 2: forbidden terms in source paths and source text ───────── */
  const sourceFiles = await walk(ROOT);
  let pathsChecked = 0;
  let textChecked = 0;

  if (terms) {
    for (const f of sourceFiles) {
      const rel = relative(ROOT, f);
      const parts = rel.split(sep);
      if (SKIP_FILES.has(parts[parts.length - 1])) continue;

      pathsChecked++;
      const lowerRel = rel.toLowerCase();
      for (const t of terms) {
        if (findTerm(lowerRel, t) !== -1) {
          errors.push(
            `path "${rel}" contains "${t.match}".\n  ${t.why}\n` +
              '  Rename it. A filename is served at a public URL and no text search sees it.'
          );
        }
      }

      const ext = f.slice(f.lastIndexOf('.'));
      if (!TEXT_EXT.has(ext)) continue;
      const text = await readMaybe(f, 'utf8');
      if (text === null) continue;
      textChecked++;
      const lower = text.toLowerCase();
      for (const t of terms) {
        const i = findTerm(lower, t);
        if (i !== -1) {
          errors.push(`${rel} contains "${t.match}".\n  ${t.why}\n  context: ${contextAt(text, i)}`);
        }
      }
    }
  }

  /* ── RULE 3: no file under public/ is byte-identical to the private one ── */
  const allowed = new Map(); // hash -> reason
  const allowRaw = await readMaybe(ALLOWLIST, 'utf8');
  if (allowRaw) {
    for (const line of allowRaw.split('\n')) {
      const s = line.trim();
      if (!s || s.startsWith('#')) continue;
      const [h, ...rest] = s.split(/\s+/);
      allowed.set(h.toLowerCase(), rest.join(' ') || '(no reason recorded)');
    }
  }

  let privateHashes = new Map(); // hash -> private-relative path
  let manifestSource;

  if (pair) {
    const privRoot = join(CONCEPT_SITES, pair);
    const privFiles = [
      ...(await walk(join(privRoot, 'public'))),
      ...(await walk(join(privRoot, 'dist'))),
    ];
    if (privFiles.length) {
      for (const f of privFiles) {
        const buf = await readMaybe(f);
        // Zero-length files are excluded from the identity rule. Every empty
        // file has the same hash, so a .gitkeep in the public fork would
        // "match" a .gitkeep in the private one and report a leak of nothing.
        // An empty file cannot carry a name, a mark or a photograph.
        if (buf && buf.length > 0) privateHashes.set(sha256(buf), relative(privRoot, f));
      }
      manifestSource = `live (${pair}, ${privateHashes.size} distinct assets)`;

      // Refresh the committed manifest so the PARTIAL tier can never go stale:
      // every full run rewrites it. Hashes are one-way, so publishing them
      // discloses nothing — you cannot recover an image from its digest.
      const body =
        '# Generated by scripts/check-anonymity.mjs on every FULL-tier build.\n' +
        '# SHA-256 of every asset in the paired private original.\n' +
        '# Committed so the hash rule still runs where the private repo is absent.\n' +
        '# Hashes are one-way: this file names no business and leaks no content.\n' +
        '# Do not hand-edit — it is rewritten by the next full build.\n' +
        [...privateHashes.keys()].sort().join('\n') +
        '\n';
      const existing = await readMaybe(MANIFEST, 'utf8');
      if (existing !== body) {
        await writeFile(MANIFEST, body);
        notes.push(`refreshed scripts/private-asset-hashes.txt (${privateHashes.size} hashes)`);
      }
    }
  }

  if (!privateHashes.size) {
    const raw = await readMaybe(MANIFEST, 'utf8');
    if (raw) {
      for (const line of raw.split('\n')) {
        const s = line.trim();
        if (s && !s.startsWith('#')) privateHashes.set(s.toLowerCase(), '(from committed manifest)');
      }
      manifestSource = `committed manifest (${privateHashes.size} hashes)`;
    }
  }

  if (!privateHashes.size) {
    errors.push(
      'no private-asset hashes available from either the paired repo or\n' +
        '  scripts/private-asset-hashes.txt, so the byte-identity rule did not run.\n' +
        '  That rule is the only one that catches a leaked image after a rename.'
    );
  }

  const publicFiles = await walk(join(ROOT, 'public'));
  let dupes = 0;
  let allowedHits = 0;
  for (const f of publicFiles) {
    const buf = await readMaybe(f);
    if (!buf) continue;
    const h = sha256(buf);
    if (!privateHashes.has(h)) continue;
    if (allowed.has(h)) {
      allowedHits++;
      continue;
    }
    dupes++;
    errors.push(
      `public/${relative(join(ROOT, 'public'), f)} is byte-identical to the private\n` +
        `  original's ${privateHashes.get(h)}.\n` +
        '  Replace it, or — if it genuinely carries no name, mark, person, vehicle or\n' +
        '  building — record it in scripts/shared-assets.allow with a reason:\n' +
        `      ${h}  <why this specific file is safe to share>`
    );
  }

  await enforceScanFloor('source', {
    paths: pathsChecked,
    text: textChecked,
    publicAssets: publicFiles.length,
  });

  report(
    `source scan: ${pathsChecked} paths, ${textChecked} text files, ` +
      `${publicFiles.length} public assets vs ${manifestSource || 'no manifest'}; ` +
      `${allowedHits} allowlisted, ${dupes} unlisted duplicate${dupes === 1 ? '' : 's'}`
  );
}

/**
 * A GATE THAT INSPECTS NOTHING MUST NEVER REPORT CLEAN.
 *
 * Every rule above is "look at these files, and fail if you find X." That shape
 * has a silent failure mode: look at *no* files, find no X, report green. A
 * regex edit, a renamed directory, a source extension this file does not know
 * about, or a build layout change all produce it, and none of them look like a
 * bug — the build goes green and stays green.
 *
 * The concrete precedent is in this system already: meta/checks/check-image-alt
 * walks concept-sites/* but its SOURCE_SUFFIXES omits .jsx, so on a React build
 * it scans zero files and passes. It has "passed" that repo for months without
 * ever reading it (concept-sites.md, Known inconsistencies).
 *
 * So the counts are themselves an assertion. scan-floor.json records how much
 * this check saw when it was known-correct, and seeing less is a failure, not a
 * quiet success. Zero in any category is always fatal regardless of the file.
 *
 * The floor is hand-maintained, deliberately. Auto-raising it would let the
 * regression it exists to catch rewrite its own expectation. Same friction as
 * the REQUIRED map in pachet-site/scripts/check-headers.mjs: if you really did
 * delete files, update this in the same commit.
 */
async function enforceScanFloor(mode, counts) {
  if (WRITE_FLOOR) {
    let all = {};
    const prev = await readMaybe(SCAN_FLOOR, 'utf8');
    if (prev) { try { all = JSON.parse(prev); } catch { all = {}; } }
    all._comment =
      'Hand-maintained. How many files check-anonymity.mjs is expected to inspect. ' +
      'Seeing fewer is a failure: a scan that silently narrowed would otherwise pass ' +
      'green forever. Lower a number only in the same commit that deletes the files.';
    all[mode] = counts;
    await writeFile(SCAN_FLOOR, JSON.stringify(all, null, 2) + '\n');
    console.log(`wrote scan floor [${mode}]: ${JSON.stringify(counts)}`);
    return;
  }

  for (const [k, v] of Object.entries(counts)) {
    if (v === 0) {
      errors.push(
        `the ${mode} scan inspected 0 ${k}. A check that reads nothing cannot find\n` +
          '  anything, and would report clean forever. This is a broken check, not a\n' +
          '  clean repo — look at what changed about the paths or file extensions.'
      );
    }
  }

  const raw = await readMaybe(SCAN_FLOOR, 'utf8');
  if (!raw) {
    errors.push(
      'scripts/scan-floor.json is missing. It records how many files this check\n' +
        '  is expected to inspect, which is what stops a silently-narrowed scan from\n' +
        '  passing green. Restore it, or regenerate with --write-floor.'
    );
    return;
  }

  let floors;
  try {
    floors = JSON.parse(raw)[mode];
  } catch (e) {
    errors.push(`scripts/scan-floor.json is not valid JSON (${e.message}).`);
    return;
  }
  if (!floors) return;

  for (const [k, min] of Object.entries(floors)) {
    if (counts[k] === undefined) continue;
    if (counts[k] < min) {
      errors.push(
        `the ${mode} scan inspected ${counts[k]} ${k}, but scan-floor.json expects at\n` +
          `  least ${min}. Either something narrowed this check's reach, or you deleted\n` +
          '  files on purpose. If it was on purpose, lower the number in\n' +
          '  scripts/scan-floor.json in the same commit — that friction is the point.'
      );
    }
  }
}

function report(summary) {
  if (errors.length) {
    console.error(`\n✗ anonymity gate failed (${tier})\n`);
    for (const e of errors) console.error('  • ' + e + '\n');
    console.error(
      `  ${errors.length} problem${errors.length === 1 ? '' : 's'}. ` +
        'The case study promises this business is unidentifiable.\n'
    );
    process.exit(1);
  }
  const label = tier === 'FULL' ? '✓' : '⚠';
  console.log(`${label} anonymity gate [${tier}]: ${summary}`);
  for (const n of notes) console.log(`  note: ${n}`);
  if (tier === 'PARTIAL') {
    console.log(
      '  Term rules did NOT run. This build cannot be published — deploy.sh\n' +
        '  requires a FULL check.'
    );
  }
}
