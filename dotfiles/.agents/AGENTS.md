---
description: Global agent rules
alwaysApply: true
---

# Global agent rules

## Isolated worktrees

Put new git worktrees in the environment's standard agent worktree directory (e.g. `~/.cursor/worktrees` in Cursor). Request full permissions on the first `git worktree add`.

Once in a worktree, use full permissions for the shell - otherwise, the sandbox might provide stale views of files. Point every Read, Write, Grep, and shell call at the worktree path; tools default to the main repo.
