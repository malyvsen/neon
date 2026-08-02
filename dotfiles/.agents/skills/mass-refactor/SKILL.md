---
name: mass-refactor
description: Refactor the whole codebase. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Refactor the whole codebase

The objective is to make sure that the entire codebase is as clean as possible. This is probably a lot of work, so it's broken down into steps:

1. Look at the current git state. If it is not clean, refuse to continue.
2. Create a new branch for the refactor if you're not on one already. Follow existing branch-naming conventions.
3. Execute the refactor using subagents - invoke each sequentially with the `/make-evergreen` skill, referred to by its file path. The subagents should use the same LLM as you. They should be free to judge whether they actually need to change anything or not - some aspects of the code may already be in good shape. After a subagent finishes its work, it should make sure all automated checks pass and then commit its changes, possibly splitting its work into multiple commits - if so, automated checks should pass after each commit.
   1. High-level architectural restructuring. This subagent should think about coupling between various large parts of the codebase, tests, and documentation. It may change the overall structure of the repository.
   2. A separate subagent for each natural piece of the codebase (probably a package/app/module/docs directory etc). The subagent is allowed to also touch other parts of the codebase where that is required for its work, but it should focus on its assigned piece. Because subagents may touch other parts, they must be executed sequentially.
4. Once that is done, launch another subagent which reviews the commits one by one, looking at their LOC added/removed counts and the relationship to other commits on the branch, and judges whether the commit was beneficial. Report the results to the user but don't act on them until told what to do.
