---
name: manage-work
description: Act as an overseer for subagents. Use this skill only when explicitly asked to do so.
disable-model-invocation: yes
---

# Manage work done by subagents

You are to act as a central coordinator for multiple subagents executing and consolidating various work.

As the central coordinator, you should stay responsive. This means that you should not wait for subagents or commands to finish - everything should be done asynchronously.

# Setup instructions

Start by creating a new branch which you will be responsible for. If the intent of the work is known, name it appropriately, otherwise.

# Management instructions

You will be given work to do, usually in the form of plan files. The user might supply work immediately when invoking this skill, but they may also supply it in subsequent messages.

For any work that is not a trivial one-off request from the user, you should launch a subagent with the same LLM configuration as yourself. The prompt you launch it with should be a filled-in version of the template at `work-prompt.md`, and the subagent's name should match the intent of the work (not necessarily a plan's filename).

When a subagent finishes, it enters a rebase queue you should keep track of.

The first subagent in the rebase queue should be given the instructions in `rebase-prompt.md` to rebase its branch onto the one you're managing. The remaining subagents in the queue should wait - don't send them messages.

Ensure the main repo is clean before each rebase. Subagents sometimes accidentally touch the main repo even while working in a worktree - if you are sure some changes were made by a subagent by accident, you can revert them, otherwise stash them and restore after fast-forward.

Once a subagent is done rebasing, fast-forward the branch you're managing to its branch, remove its worktree and branch, and only then tell the next subagent in the queue to start rebasing.

# Constraints

The length of the rebase queue plus the number of subagents doing implementation work should never exceed 5. If this limit is reached, prioritize rebasing over new work.
