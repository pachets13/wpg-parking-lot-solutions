#!/usr/bin/env node
/**
 * test-anonymity-gate.mjs — prove that check-anonymity.mjs still fails on the
 * things it exists to catch.
 *
 * WHY THIS EXISTS
 * The gate was originally proven by breaking it nine ways by hand, once, in the
 * session that wrote it. That is the exact shape RULES.md § 8 disqualifies: "a
 * check that only runs when someone remembers is a suggestion, not a gate." A
 * proof performed once is a suggestion about the past. Nothing would notice if a
 * later regex edit, a renamed directory, or a changed build layout quietly
 * stopped the gate from matching — the build would go green and stay green, and
 * the next audit would be what told you.
 *
 * So every one of those nine breakages is a case here, and this runs before any
 * publish.
 *
 * WHY THE FIRST CASE IS "A CLEAN REPO PASSES"
 * Eight tests that all assert "the check failed" are also satisfied by a check
 * that fails unconditionally — `exit 1` on line one would score 9/9. The baseline
 * case is what makes the other nine mean anything.
 *
 * WHY NO REAL BUSINESS NAME APPEARS IN THIS FILE
 * Same rule as the check itself: this ships in a public repo. The fixtures read
 * their forbidden strings out of the private pair at runtime, so the thing being
 * tested for is never committed here. A test that hardcoded the real name would
 * be the leak it is testing for, and would fail the gate it is testing.
 *
 * WHAT IT DOES NOT PROVE
 * That the gate catches leaks nobody has thought of. Every case here is a
 * regression test for a failure that actually happened or was actually
 * simulated; none of them is a proof of completeness. A new *kind* of leak needs
 * a new rule in the check and a new case here, in the same commit.
 *
 * Usage: node scripts/test-anonymity-gate.mjs   (npm test; run by deploy.sh)
 */

import { readFile, writeFile, copyFile, rename, unlink, readdir, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONCEPT_SITES = join(ROOT, '..');
const CHECK = join(ROOT, 'scripts', 'check-anonymity.mjs');

/** Run the gate. Resolves to its exit code; never throws on non-zero. */
async function gate(...args) {
  try {
    await run('node', [CHECK, ...args], { cwd: ROOT });
    return 0;
  } catch (e) {
    return e.code ?? 1;
  }
}

const results = [];
async function testCase(name, expect, fn) {
  let code;
  try {
    code = await fn();
  } catch (e) {
    results.push({ name, ok: false, detail: `threw: ${e.message}` });
    return;
  }
  const ok = expect === 'fail' ? code !== 0 : code === 0;
  results.push({
    name,
    ok,
    detail: ok ? '' : `expected ${expect}, gate exited ${code}`,
  });
}

/* ── fixture inputs, read from the private pair so nothing real is committed ── */

async function loadPair() {
  const registry = await readFile(
    join(CONCEPT_SITES, '..', 'web-design-and-development', 'concept-sites.md'),
    'utf8'
  );
  const rows = [];
  for (const line of registry.split('\n')) {
    const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*(public|private)\s*\|/);
    if (m) rows.push({ repo: m[1], visibility: m[2] });
  }
  const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));
  const i = rows.findIndex((r) => r.repo === pkg.name);
  const pair = rows[i + 1];
  if (!pair || pair.visibility !== 'private') return null;

  const termsPath = join(CONCEPT_SITES, pair.repo, 'anonymity-terms.json');
  if (!existsSync(termsPath)) return null;
  const terms = JSON.parse(await readFile(termsPath, 'utf8')).terms;
  return { repo: pair.repo, root: join(CONCEPT_SITES, pair.repo), terms };
}

const pair = await loadPair();
if (!pair) {
  console.error(
    '\n✗ gate self-test cannot run: the private pair is not reachable.\n' +
      '  These cases need the real forbidden strings, which deliberately live only\n' +
      '  in the private repo. Restore it beside this one in concept-sites/.\n'
  );
  process.exit(1);
}

/** A term that is a bare name fragment, and one that looks like contact data. */
const nameTerm = pair.terms[0].match;
const contactTerm = (pair.terms.find((t) => /\d/.test(t.match)) || pair.terms[0]).match;
const domainTerm = (pair.terms.find((t) => t.match.includes('.')) || pair.terms[0]).match;

/** A private asset NOT already present (and therefore not allowlisted) here. */
async function unlistedPrivateAsset() {
  const allow = await readFile(join(ROOT, 'scripts', 'shared-assets.allow'), 'utf8');
  const listed = new Set(
    allow.split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.trim().split(/\s+/)[0])
  );
  const walk = async (d, out = []) => {
    for (const e of await readdir(d, { withFileTypes: true }).catch(() => [])) {
      if (e.name === '.DS_Store') continue;
      const p = join(d, e.name);
      e.isDirectory() ? await walk(p, out) : out.push(p);
    }
    return out;
  };
  for (const f of await walk(join(pair.root, 'public'))) {
    const buf = await readFile(f);
    if (!listed.has(createHash('sha256').update(buf).digest('hex'))) return f;
  }
  return null;
}

/* ── the cases ───────────────────────────────────────────────────────────── */

// 0. Baseline. Without this, "exit 1" on line one would pass every other case.
await testCase('clean repo passes (source)', 'pass', () => gate());
await testCase('clean repo passes (dist)', 'pass', () => gate('--dist'));

// 1. A leaked FILENAME under public/. Invisible to any grep of file contents,
//    and the class that survived the 2026-08-06 text-only scrub: 15 of them.
await testCase('leaked filename under public/', 'fail', async () => {
  const f = join(ROOT, 'public', `${nameTerm}-leak-fixture.jpg`);
  await writeFile(f, 'x');
  try { return await gate(); } finally { await unlink(f).catch(() => {}); }
});

// 2. A leaked ROUTE name. The real name lands in a published URL, not in prose.
//    The fixture takes its extension from whatever the repo's pages already use,
//    so this same file works in an Astro fork and a React one without edits.
await testCase('leaked route slug under src/pages/', 'fail', async () => {
  const pages = join(ROOT, 'src', 'pages');
  const existing = (await readdir(pages).catch(() => [])).find((n) => n.includes('.'));
  if (!existing) throw new Error('src/pages has no files to copy an extension from');
  const ext = existing.slice(existing.lastIndexOf('.'));
  const f = join(pages, `why-${nameTerm}-fixture${ext}`);
  await writeFile(f, '<p>x</p>');
  try { return await gate(); } finally { await unlink(f).catch(() => {}); }
});

// 3 + 4. Real contact data and the real domain, reintroduced into source. This
//    is the only class the old text search could see, so it is the control.
await testCase('real contact string in source', 'fail', async () => {
  const f = join(ROOT, 'src', 'data', 'fixture-contact.json');
  await writeFile(f, JSON.stringify({ phone: contactTerm }));
  try { return await gate(); } finally { await unlink(f).catch(() => {}); }
});
await testCase('real domain in source', 'fail', async () => {
  const f = join(ROOT, 'src', 'data', 'fixture-domain.json');
  await writeFile(f, JSON.stringify({ site: `https://www.${domainTerm}` }));
  try { return await gate(); } finally { await unlink(f).catch(() => {}); }
});

// 4b. The real name inside the CONTENT of whatever component format this repo
//     uses. The route case above only proves paths are matched; this proves the
//     file is actually read. It exists because that is the precise shape of the
//     bug in meta/checks/check-image-alt: it walks concept-sites/* but its
//     SOURCE_SUFFIXES omits .jsx, so on a React build it opens nothing and
//     reports clean. A component extension this check does not know about would
//     reproduce it exactly, and silently.
await testCase('real name inside a component file is read', 'fail', async () => {
  const comp = join(ROOT, 'src', 'components');
  const existing = (await readdir(comp).catch(() => [])).find((n) => n.includes('.'));
  if (!existing) throw new Error('src/components has no files to copy an extension from');
  const ext = existing.slice(existing.lastIndexOf('.'));
  const f = join(comp, `FixtureLeak${ext}`);
  await writeFile(f, `export default () => <p>Proudly serving as ${nameTerm}</p>;\n`);
  try { return await gate(); } finally { await unlink(f).catch(() => {}); }
});

// 5. THE LOAD-BEARING ONE. A real asset from the private original, renamed to
//    something innocent. No rule but the hash comparison can see this, and a
//    filename-only remediation produces exactly it.
await testCase('renamed private asset, identical bytes', 'fail', async () => {
  const src = await unlistedPrivateAsset();
  if (!src) throw new Error('no unlisted private asset available to test with');
  const f = join(ROOT, 'public', 'perfectly-innocent-name.jpg');
  await copyFile(src, f);
  try { return await gate(); } finally { await unlink(f).catch(() => {}); }
});

// 6. A leak that exists only in built output. Catches the case where source is
//    clean but a template, config or data file composes the string at build time.
await testCase('leak present only in dist/', 'fail', async () => {
  const f = join(ROOT, 'dist', 'fixture-leak.html');
  if (!existsSync(join(ROOT, 'dist'))) throw new Error('dist/ missing — build first');
  await writeFile(f, `<!-- ${contactTerm} -->`);
  try { return await gate('--dist'); } finally { await unlink(f).catch(() => {}); }
});

// 7. With the private pair unreachable the term rules cannot run, but the hash
//    rule must still work off the committed manifest. Otherwise "no private
//    repo" would silently mean "no checking at all".
await testCase('PARTIAL tier still enforces the hash rule', 'fail', async () => {
  const terms = join(pair.root, 'anonymity-terms.json');
  const hidden = join(pair.root, 'anonymity-terms.json.testbak');
  const src = await unlistedPrivateAsset();
  const f = join(ROOT, 'public', 'perfectly-innocent-name-2.jpg');
  await rename(terms, hidden);
  try {
    await copyFile(src, f);
    return await gate();
  } finally {
    await unlink(f).catch(() => {});
    await rename(hidden, terms).catch(() => {});
  }
});

// 8. A PARTIAL check must never be publishable. This is the assertion deploy.sh
//    depends on.
await testCase('deploy path refuses a PARTIAL check', 'fail', async () => {
  const terms = join(pair.root, 'anonymity-terms.json');
  const hidden = join(pair.root, 'anonymity-terms.json.testbak');
  await rename(terms, hidden);
  try { return await gate('--require-full'); } finally { await rename(hidden, terms).catch(() => {}); }
});

// 9. A GATE THAT INSPECTS NOTHING MUST NOT REPORT CLEAN. Hide the source tree
//    and the scan collapses; the floor in scan-floor.json has to catch that.
//    This is the failure mode meta/checks/check-image-alt has had for months on
//    the React builds — zero files scanned, green result, nobody told.
// 9a. The comparison itself: raise the expectation above what exists and the
//     check must fail rather than shrug.
await testCase('scan below the recorded floor fails', 'fail', async () => {
  const p = join(ROOT, 'scripts', 'scan-floor.json');
  const orig = await readFile(p, 'utf8');
  const bumped = JSON.parse(orig);
  bumped.source = { paths: 99999, text: 99999, publicAssets: 99999 };
  await writeFile(p, JSON.stringify(bumped, null, 2));
  try { return await gate(); } finally { await writeFile(p, orig); }
});

// 9b. End to end: actually narrow the scan and confirm the floor notices.
//     src/ has to move OUTSIDE the scanned root — the first version of this test
//     renamed it in place to src.testbak, which the walker happily kept reading,
//     so the counts never moved and the case passed while proving nothing.
await testCase('narrowed scan fails against the floor', 'fail', async () => {
  const src = join(ROOT, 'src');
  const bak = join(CONCEPT_SITES, `.${relative(CONCEPT_SITES, ROOT)}-src.testbak`);
  if (existsSync(bak)) throw new Error(`${bak} exists — clean it up before running`);
  await rename(src, bak);
  try { return await gate(); } finally { await rename(bak, src).catch(() => {}); }
});

// 10. THE HISTORY RULE. Deleting a leak in a new commit does not remove it:
//     the old blob is still reachable, and on a public repo still served by SHA.
//     Both prior remediation passes missed this and both declared the repo clean.
//
//     These cases point the gate at a THROWAWAY repository via GIT_DIR rather
//     than committing a leak fixture into this one. That is deliberate and not
//     merely tidy: a fixture commit here would put the real business's name into
//     this repo's object database, where an interrupted run would strand it —
//     which is the precise failure this whole check exists to prevent. The
//     scratch repo lives in the OS temp dir, so it cannot be committed or pushed
//     even if this process is killed.
async function withScratchRepo(seed) {
  const dir = await mkdtemp(join(tmpdir(), 'anon-gate-'));
  const git = (...args) => run('git', args, { cwd: dir });
  await git('init', '-q');
  await git('config', 'user.email', 'test@example.invalid');
  await git('config', 'user.name', 'gate self-test');
  await seed(dir, git);
  return {
    dir,
    env: { ...process.env, GIT_DIR: join(dir, '.git'), GIT_WORK_TREE: dir },
    cleanup: () => rm(dir, { recursive: true, force: true }),
  };
}

/**
 * A scratch repo holds two or three files; this repo's recorded history floor is
 * in the dozens. Left alone, every case below would fail on the floor rather than
 * on the rule it is testing — the baseline would go red, and the three leak cases
 * would go green for the wrong reason, which is worse. So the floor is relaxed to
 * 1 for the duration and restored afterwards, exactly as case 9a does. Case 11
 * then proves the real floor is still doing its job.
 */
async function withHistoryFloor(fn) {
  const p = join(ROOT, 'scripts', 'scan-floor.json');
  const orig = await readFile(p, 'utf8');
  const relaxed = JSON.parse(orig);
  relaxed.history = { blobPaths: 1, blobsRead: 1, messages: 1 };
  await writeFile(p, JSON.stringify(relaxed, null, 2) + '\n');
  try {
    return await fn();
  } finally {
    await writeFile(p, orig);
  }
}

/** Run the gate against a scratch object graph instead of this repo's. */
async function gateWithEnv(env, ...args) {
  try {
    await run('node', [CHECK, ...args], { cwd: ROOT, env });
    return 0;
  } catch (e) {
    return e.code ?? 1;
  }
}

// 10a. Baseline, for the same reason case 1 exists: a history rule that fails
//      unconditionally would score on 10b alone and prove nothing.
await testCase('clean history passes', 'pass', async () => {
  const s = await withScratchRepo(async (dir, git) => {
    await writeFile(join(dir, 'notes.md'), 'Nothing identifying in here.\n');
    await git('add', '-A');
    await git('commit', '-qm', 'a perfectly ordinary commit');
  });
  try { return await withHistoryFloor(() => gateWithEnv(s.env, "--history")); } finally { await s.cleanup(); }
});

// 10b. A leak added and then deleted. HEAD is clean, so the source and dist
//      rules both pass — this is the state the forks were actually in.
await testCase('leak deleted at HEAD is still caught in history', 'fail', async () => {
  const s = await withScratchRepo(async (dir, git) => {
    await writeFile(join(dir, 'about.md'), `We are ${nameTerm} and this is our story.\n`);
    await git('add', '-A');
    await git('commit', '-qm', 'add the about page');
    await writeFile(join(dir, 'about.md'), 'We are a fictional company.\n');
    await git('add', '-A');
    await git('commit', '-qm', 'sanitize the about page');
  });
  try { return await withHistoryFloor(() => gateWithEnv(s.env, "--history")); } finally { await s.cleanup(); }
});

// 10c. A leaked FILENAME, later renamed. No text search finds this, and the
//      old path is a URL that was served.
await testCase('renamed-away filename is still caught in history', 'fail', async () => {
  const s = await withScratchRepo(async (dir, git) => {
    await mkdir(join(dir, 'public'), { recursive: true });
    // A clean text file rides along so this case fails on the leaked PATH and
    // not on the zero-text-blobs rule, which would also exit non-zero and would
    // make the case pass while proving nothing.
    await writeFile(join(dir, 'readme.md'), 'Entirely clean content.\n');
    await writeFile(join(dir, 'public', `${nameTerm}-logo.png`), 'not really a png\n');
    await git('add', '-A');
    await git('commit', '-qm', 'add the logo');
    await git('mv', `public/${nameTerm}-logo.png`, 'public/logo.png');
    await git('commit', '-qm', 'rename the logo');
  });
  try { return await withHistoryFloor(() => gateWithEnv(s.env, "--history")); } finally { await s.cleanup(); }
});

// 10d. The commit MESSAGE. concept-sites.md records that redacting file contents
//      while keeping the graph would not have worked, because the messages were
//      themselves the tell — and on 2026-08-07 the message of each fork's own
//      remediation commit was still naming the business it had just scrubbed.
await testCase('leak in a commit message is caught', 'fail', async () => {
  const s = await withScratchRepo(async (dir, git) => {
    await writeFile(join(dir, 'index.md'), 'Entirely clean content.\n');
    await git('add', '-A');
    await git('commit', '-qm', `remove every mention of ${nameTerm} from the site`);
  });
  try { return await withHistoryFloor(() => gateWithEnv(s.env, "--history")); } finally { await s.cleanup(); }
});

// 11. The history floor is real. Every case above relaxes it to 1 so the scratch
//     repos can run at all, which would quietly cover up a deleted or emptied
//     `history` entry in scan-floor.json. This runs a two-blob scratch graph
//     against the REAL recorded floor and requires it to fail — the same
//     "a gate that inspects nothing must not report clean" property that cases
//     9a and 9b assert for the source scan.
await testCase('history scan below the recorded floor fails', 'fail', async () => {
  const s = await withScratchRepo(async (dir, git) => {
    await writeFile(join(dir, 'notes.md'), 'Nothing identifying in here.\n');
    await git('add', '-A');
    await git('commit', '-qm', 'a perfectly ordinary commit');
  });
  try { return await gateWithEnv(s.env, '--history'); } finally { await s.cleanup(); }
});

/* ── report ──────────────────────────────────────────────────────────────── */

const failed = results.filter((r) => !r.ok);
for (const r of results) {
  console.log(`  ${r.ok ? '✓' : '✗'} ${r.name}${r.detail ? ` — ${r.detail}` : ''}`);
}

if (failed.length) {
  console.error(
    `\n✗ anonymity gate self-test: ${failed.length} of ${results.length} cases failed.\n` +
      '  The gate is not catching something it used to catch. Do not publish until\n' +
      '  this is green — a gate nobody has verified is a comment.\n'
  );
  process.exit(1);
}

// Leave nothing behind: a fixture surviving a crashed run would itself be a leak.
for (const stray of ['../.wpg-parking-lot-solutions-src.testbak', 'public/perfectly-innocent-name.jpg', 'public/perfectly-innocent-name-2.jpg']) {
  if (existsSync(join(ROOT, stray))) {
    console.error(`\n✗ self-test left ${stray} behind. Remove it before publishing.\n`);
    process.exit(1);
  }
}

console.log(`\n✓ anonymity gate self-test: ${results.length}/${results.length} cases pass\n`);
