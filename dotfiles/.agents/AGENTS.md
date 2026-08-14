---
description: Global agent rules
alwaysApply: true
---

# Global agent rules

## Debug with test-driven development

When a bug is reported, write tests which would have caught it first, verify that they fail, and then fix the code to pass the tests. Do not go out of your way to do this, though - if writing these tests would require significant effort, be in some way incompatible with the rest of the codebase, or otherwise impractical, don't do it.

## Every commit in a plan should be evergreen

When writing a plan, make sure that every resulting commit is made evergreen. This should be done by invoking a subagent with the same model/reasoning power as yourself with the `/make-evergreen` skill (referred to by its file path). Give that subagent only brief context on the intent of the work. Do not pass anything else (e.g. coding rules or file lists) — it should discover those itself.

If the plan is broken up into multiple commits, each should be made evergreen separately. After the commit is made, the subagent should be launched, and once it's done, the changes it made should be folded into the original commit.

Otherwise, the subagent should be run as a final step in the plan.

## Isolated worktrees

When creating a git worktree, put it in the environment's standard agent worktree directory by default - for example, in Cursor, this is `~/.cursor/worktrees`.
