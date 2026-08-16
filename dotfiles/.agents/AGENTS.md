---
description: Global agent rules
alwaysApply: true
---

# Global agent rules

## Debug with test-driven development

When a bug is reported, write tests which would have caught it first, verify that they fail, and then fix the code to pass the tests. Do not go out of your way to do this, though - if writing these tests would require significant effort, be in some way incompatible with the rest of the codebase, or otherwise impractical, don't do it.

## Every commit in a plan should be evergreen

When writing a plan, make sure that every resulting commit is made evergreen. This should be done by invoking a subagent with the same model/reasoning power as yourself with the `/make-evergreen` skill (referred to by its file path). Give that subagent only brief context on the intent of the work. Do not pass anything else (e.g. coding rules or file lists) — it should discover those itself.

Each commit in the plan should be made evergreen separately. Just before the commit is made, the subagent should be launched, and once it's done, its changes should be included in the commit, unless you deem them counterproductive.

If the plan does not call for committing, run the subagent as its final step.

## Isolated worktrees

Put new git worktrees in the environment's standard agent worktree directory (e.g. `~/.cursor/worktrees` in Cursor). Request full permissions on the first `git worktree add`.

Once in a worktree, use full permissions for the shell - otherwise, the sandbox might provide stale views of files. Point every Read, Write, Grep, and shell call at the worktree path; tools default to the main repo.
