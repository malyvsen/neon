Run `git log --oneline HEAD..{{managed branch}}` to see a list of commits to rebase onto. If it is empty, there's nothing to do.

Otherwise, rebase your branch onto {{managed branch}}. Make sure the resulting history is clean - the repo should pass automated checks after each individual commit you made.

If a commit you made is no longer valuable, drop it.

If it is still valuable but needs amending to keep its original intent, amend it. Make sure it is complete, e.g. if you performed a mass rename, make sure that nothing kept its old name (which could happen if the base branch used the old name in a commit you rebased onto).

If it is necessary to introduce a new commit somewhere in the history, create it.
