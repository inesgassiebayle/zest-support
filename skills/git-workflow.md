# Git & PR workflow

## Branches
- `feature/<short-description>` for new functionality, `fix/<short-description>` for bug fixes, `chore/<short-description>` for non-functional changes (deps, config, docs).
- Branch off the latest `main`, don't stack unrelated changes onto an existing feature branch.

## Commits
- One logical change per commit where reasonable; avoid giant "fixed stuff" commits that mix unrelated changes.
- Write commit messages that explain *why*, not just *what* (the diff already shows what changed).

## Pull requests
- Keep PRs small and reviewable — one feature or fix per PR, not a batch of unrelated changes.
- PR description should say what changed and why, and link the related issue/task if there is one.
- Before opening a PR: code builds, lint passes, and (once tests exist) tests pass locally.
- For UI changes, include a screenshot or short clip in the PR description.
- At least one other person reviews before merging — don't self-merge unreviewed changes to `main`.

## What NOT to do
- Don't force-push to `main` or shared branches.
- Don't commit directly to `main` — always go through a PR, even for small fixes.
- Don't merge a PR with failing CI "to unblock" without a human decision to do so.
