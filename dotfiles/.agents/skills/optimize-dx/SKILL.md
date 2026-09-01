---
name: optimize-dx
description: Runs subagents that improve developer experience across structure, iteration speed, and onboarding. Use when optimizing DX, improving the developer experience, or making the repo faster to iterate in.
disable-model-invocation: true
---

# Optimize the developer experience

This is an extension of the `/manage-work` skill. If that is not already active, use it first.

The objective is to make sure that the entire codebase is as pleasant to work with as possible. This is probably a lot of work, so you will be using subagents to do it.

The subagents can be divided into two categories:

- Structural subagents, responsible for high-level changes.
- Content-focused subagents, responsible for low-level changes.

Start by launching the top-level structural subagent, prompted with a filled-in version of the template at `manage-work/work-prompt.md`, with the entire codebase in scope and the work as described in `subagent-task.md`.

Once a structural subagent is done, it may recommend further work to be done by new subagents - do so, but only launch the new subagents when the one who recommended their launch is done rebasing.

This work should be given lower priority than work supplied directly by the user as part of `/manage-work`, both in implementation and in the rebase queue.
