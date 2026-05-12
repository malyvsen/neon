---
name: rebase-stack
description: Rebase a stack of branches on top of main while ensuring the intent of all commits is preserved.
disable-model-invocation: yes
---

# Rebase branch stack

1. Run `git --no-pager log --oneline --decorate origin/HEAD..HEAD` to see every commit and branch in the stack on top of the main branch. If `origin/HEAD` is unset, abort and ask the user what to do.
2. Check out the main branch and pull the latest changes.
3. Starting from the branch closest to the main one in the git log you viewed, rebase each branch on top of the previous one using `GIT_SEQUENCE_EDITOR="perl -pi -e 's/^pick /edit /'" git rebase -i <previous-branch>`. This pauses the rebase at every commit so you can inspect it; run `git rebase --continue` to advance to the next one.
4. While rebasing each branch, ensure each commit still makes sense & is complete (e.g. a mass rename which used to affect all files before the rebase should be amended to affect all files, including those changed/added in new commits from the main branch). If there are any automated local checks, make sure every commit passes them, unless there are reasons to suspect the original commit did not.
5. Once you're done with all branches, report back to the user with a list of all commits, including if you made any amendments, and offer to push with `--force-with-lease`.
