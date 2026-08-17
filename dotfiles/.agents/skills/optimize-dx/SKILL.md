---
name: optimize-dx
description: Have subagents optimize the developer experience. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Have subagents optimize the developer experience

This is an extension of the `/manage-work` skill. If that is not already active, use it first.

The objective is to make sure that the entire codebase is as pleasant to work with as possible. This is probably a lot of work, so you will be using subagents to do it. Once a subagent is done, it may recommend further splitting of work among new subagents - listen to it.

The subagents can be divided into two categories:

- Structural subagents, responsible for high-level changes. These may recommend further splitting of work.
- Content-focused subagents, responsible for low-level changes. These should not recommend further splitting of work.

Start by launching the top-level structural subagent, prompted with a filled-in version of the template at `manage-work/work-prompt.md`, with the entire codebase in scope and the work as described in `subagent-task.md`.
