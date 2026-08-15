---
name: open-pr
description: Push the current branch and open a pull request in the user's style. Use when explicitly asked to open a PR.
disable-model-invocation: no
---

# Open a PR

Open a pull request. By default, this should be from the current branch, but the user may override this.

## Steps

1. Inspect branch state and conversations with other agents pertaining to it.
2. If there are uncommitted changes the user intended to include, stop and ask what to do.
3. Push if needed, then create the PR.
4. Use GitHub's native PR stacking if it seems natural to make the PR part of a stack.
5. Return the PR URL, title, and body.

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
