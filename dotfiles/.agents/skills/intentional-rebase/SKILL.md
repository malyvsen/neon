---
name: intentional-rebase
description: Rebase while ensuring the intent of all commits is preserved.
disable-model-invocation: yes
---

# Intentional rebase

The objective is to cleanly rebase a branch (or stack of branches) on top of a target branch (usually main). To achieve this, you need to understand the intent of each commit and ensure that the rebase preserves that intent.

A stack here means multiple branches rebased on top of each other.

## Instructions

1. Identify which branches should be rebased on top of which. Usually, the objective is to rebase the current branch or branch stack on top of `main`, i.e. if the current state is `top-branch -> middle-branch -> bottom-branch -> main`, the objective is to rebase `top-branch -> middle-branch -> bottom-branch` on top of `main`. If it's not so simple, ask the user what to do.
2. Once the branches are identified, checkout the target branch and pull the latest changes, unless explicitly told not to.
3. Starting from the bottom branch and working your way up, rebase each branch on top of the lower one using `GIT_SEQUENCE_EDITOR="perl -pi -e 's/^pick /edit /'" git rebase -i <lower-branch>`. This pauses the rebase at every commit so you can inspect it; run `git rebase --continue` to advance to the next one.
4. While rebasing each branch, ensure each commit still makes sense & is complete (e.g. a mass rename which used to affect all files before the rebase should be amended to still affect all files, including those changed/added in new commits from the target branch). If there are any automated local checks, make sure every commit passes them, unless there are reasons to suspect the original commit did not.
5. Once you're done with all branches, report back to the user with a list of all commits, including if you made any amendments, and offer to push with `--force-with-lease`.
