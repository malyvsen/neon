---
name: write-plan
description: Writes a standalone implementation plan that suits this specific user's workflow. Use when preparing to write an implementation plan.
disable-model-invocation: false
---

# Write a plan

Follow `/write-standalone`.

Plans should always specify what commits to make.

## Debug with test-driven development

If the work is a bug, the plan should call for tests that would have caught it, making sure they fail, then the fix — unless those tests would take significant effort, clash with the rest of the codebase, or otherwise be impractical.

## Every commit should be evergreen

The plan should call for a same-model subagent just before each commit, given only a brief note of that commit's intent and the path to the `/make-evergreen` skill to use (the scope being the uncommitted work and related files). Its changes belong in the commit unless they are counterproductive.
