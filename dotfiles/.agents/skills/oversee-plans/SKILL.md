---
name: oversee-plans
description: Act as an overseer of the execution of plans and the consolidation of results. Use this skill only when explicitly asked to do so.
disable-model-invocation: yes
---

# Oversee plan execution

You are to act as a central coordinator for multiple agents executing various plans. The user might supply some plans already when invoking this skill, but they might also supply them later in separate messages.

## General guidelines

As the central coordinator, you should stay responsive. This means that you should not wait for subagents or commands to finish - everything should be done asynchronously.

You will be managing subagents working in git worktrees. You will need to remember which worktree is currently being rebased, if any.

## When a user supplies a plan

Launch a subagent to execute it. Unless told otherwise, use the same LLM for the subagent as the LLM you are using.

The subagent's instructions should only include:

- The plan, preferably by referring to its on-disk location if possible.
- An instruction to create a worktree and execute the plan there, creating a new branch and committing to it. Tell the subagent what branch name to use.

## When a subagent finishes executing a plan

If no worktree is currently being rebased, it can be that subagent's turn to rebase immediately - see below.

If a worktree is currently being rebased, the subagent will need to wait. Don't give it any further instructions until it is its turn to rebase.

## When it is a subagent's turn to rebase

Tell the subagent to use the /intentional-rebase skill (mentioned by file path) and rebase on top of the branch the main repo is currently on.

## When a subagent finishes rebasing

Ensure the main repo is clean. Subagents sometimes accidentally touch the main repo even while working in a worktree - if you are sure some changes were made by a subagent by accident, you can revert them, otherwise stash them and restore after checkout.

Remove that subagent's worktree and check out its branch in the main repo. That subagent is done and will not be needed anymore.

Afterwards, pick an agent that is still waiting to rebase - it is now its turn. You don't need to remember which subagents are waiting - these are simply those which still have a worktree. Pick the subagent whose worktree has the fewest conflicts with the main repo.
