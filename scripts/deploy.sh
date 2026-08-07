#!/usr/bin/env bash
#
# Publish dist/ to the gh-pages branch as a single orphan commit.
#
# Why not the gh-pages npm package: it copies dist *over* a cached checkout of
# the branch rather than replacing it, and its --remove default (the glob ".")
# never matches dotfiles. The practical effect is that any dotfile published
# once can never be removed by a later deploy — five stray .DS_Store files sat
# on the public branch until this replaced it. Force-pushing an orphan commit
# makes the branch exactly dist/, nothing more, which is also the one-commit
# shape the concept-sites registry expects.
#
# This branch is legacy branch-based Pages, so it runs Jekyll over the content
# and hard-fails without .nojekyll. That file comes from public/.nojekyll via
# the build — do not remove it.
#
set -euo pipefail

REPO_URL="git@github.com:pachets13/wpg-parking-lot-solutions.git"
cd "$(dirname "$0")/.."

[ -d dist ] || { echo "dist/ missing — run npm run build first" >&2; exit 1; }
[ -f dist/.nojekyll ] || { echo "dist/.nojekyll missing — Pages will hard-fail" >&2; exit 1; }

# The anonymity gate runs on every build, but a build can only reach its PARTIAL
# tier when the paired private repo is absent -- and the term rules do not run
# there. Publication is the one moment a leak reaches anyone, so this is where
# the full check is mandatory rather than best-effort. Same posture as .nojekyll
# above: refuse to publish rather than publish something unverified.
node scripts/check-anonymity.mjs --require-full
node scripts/check-anonymity.mjs --dist

# Git does not forget, and the two rules above only read the present: the working
# tree and the bytes about to ship. Both pass on a repo whose history still
# carries the leak in an older commit -- which is exactly the state all three of
# these forks were in on 2026-08-07, publicly fetchable, after two separate
# passes had declared them clean. main's own root commit is permanently
# reachable, so "it gets garbage-collected eventually" is not true of it.
#
# This walks every object in the graph with the same term list, rather than the
# hand-picked string search that has now missed the leak twice.
node scripts/check-anonymity.mjs --history

# And prove the gate still catches what it is for. A gate nobody has verified is
# a comment: if a regex edit or a path change quietly stopped it matching, every
# line above would still exit 0. This is the assertion that the 0s mean anything.
node scripts/test-anonymity-gate.mjs

cd dist
rm -rf .git
git init -q
git add -A
git -c user.email=shawn@pachet.ca -c user.name=pachets13 commit -q -m "Deploy"
git push -q --force "$REPO_URL" HEAD:gh-pages
rm -rf .git

echo "Published to gh-pages."
echo "Pages takes 1-2 min. Verify the LIVE bundle hash, not this exit code."
