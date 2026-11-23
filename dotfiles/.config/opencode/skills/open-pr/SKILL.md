---
name: open-pr
description: Pushes the current branch and opens a pull request in the user's style. Use when opening a PR, creating a pull request, publishing a branch for review, or submitting a stack.
disable-model-invocation: false
---

# Open a PR

By default this should be from the current branch, but the user may override this.

## Steps

1. Inspect branch state and conversations with other agents pertaining to it.
2. If there are uncommitted changes the user intended to include, stop and ask what to do.
3. If the branch is already in a stack (`gh stack view --json`), follow `/gh-stack` and publish with `gh stack submit --auto`. Otherwise push if needed and open a normal PR.
4. Return the PR URL, title, and body.

## Title

- Name the outcome, not the mechanism.
- Sentence case, imperative — like a short changelog line.
- No structured wording like conventional commits - keep it proper English.

## Body

Write in full sentences, focusing on why the PR was made. Assume that the reader only has very general knowledge of the codebase, and no knowledge of the work in the PR whatsoever.

Do not repeat information from the title - sometimes a good title alone is almost enough.

## Example

**Let billing pause when a workspace has no active seats**

Workspaces that drop to zero seats still accrue a minimum charge until someone notices and cancels. Pausing automatically avoids that surprise without requiring an admin to remember a cleanup step.
