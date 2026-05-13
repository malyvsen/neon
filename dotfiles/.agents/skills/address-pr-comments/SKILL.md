---
name: address-pr-comments
description: Help the user address comments on a PR.
disable-model-invocation: yes
---

# Help the user address comments on a PR

1. List the commits on the current branch with `git --no-pager log --oneline --decorate origin/HEAD..HEAD`.
2. Look at the comments on the PR from the current branch.
3. Go through each comment one by one:
    a. Assess its validity, i.e. whether it agrees in spirit with the PR's intent and repository guidelines.
    b. Report your assessment to the user and give them a few options on what to do, marking the one you think is best. The default is to create a new commit with your changes, but if you think it makes sense, you may suggest amending a previous commit on the current branch rather than creating a new one with fixes.
    c. If the amendment route is chosen, use `GIT_SEQUENCE_EDITOR="perl -pi -e 's/^pick (<sha1>|<sha2>|...)/edit $1/'" git rebase -i <base>` to stop at the commit or commits to amend, where `<base>` is the parent of the earliest commit being amended.
    d. Do what the user asked you to and - if any changes were made - verify the integrity of the code using the repository's preferred way of doing so.
    e. Continue to the next comment.
4. When done with all comments, offer to push, possibly with `--force-with-lease` if needed.

When doing step 3, do so interactively, i.e. talk about the first comment, talk with the user about it, address it in full, only then move on to the next one.
