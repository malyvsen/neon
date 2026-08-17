---
name: mass-refactor
description: Have subagents refactor the codebase. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Have subagents refactor the codebase

This is an extension of the `/manage-work` skill. If that is not already active, use it first.

The objective is to make sure that the entire codebase is as clean as possible. This is probably a lot of work, so you will be using subagents to do it. Once a subagent is done, it may recommend further splitting of work among new subagents - listen to it.

The subagents can be divided into two categories:

- Structural subagents, responsible for high-level changes. These may recommend further splitting of work.
- Content-focused subagents, responsible for low-level changes. These should not recommend further splitting of work.

Start by launching a single structural subagent, prompted with a filled-in version of the template at `refactor-prompt.md` to refactor the entire codebase.
