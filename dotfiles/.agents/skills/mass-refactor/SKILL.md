---
name: mass-refactor
description: Refactor the whole codebase. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Refactor the whole codebase

The objective is to make sure that the entire codebase is as clean as possible. This is probably a lot of work, so it's broken down hierarchically, and work is split between subagents so as not to overload one agent with too much context.

## Step-by-step instructions

1. Look at the current git state. If it is not clean, refuse to continue.
2. Create a new branch and worktree for the refactor under `/tmp` if you're not on one already.
3. Identify a hirearchy of the refactor. The highest level is always the entire codebase, lower levels could be e.g. packages, apps, modules, docs directories etc. If needed, there can be further sublevels - a good leaf level is up to 10 thousand text lines in total (code, tests, documentation, configuration files - anything), but it can be fewer if it's nonetheless an independent architectural component.
4. Execute the refactor using subagents hierarchically, in BFS order, starting from the highest level. Run the levels sequentially, but within each level run agents in parallel - no more than 5 at a time though. Note that the hierarchy may change if agents choose to restructure parts of the codebase - adapt to it.
   a. When a level is complete, launch a subagent which consolidates the changes from all the subagents on that level, working on the refactor branch. It is up to that subagent to decide how to best do this to achieve a clean git history.

## Guidelines for the refactoring subagents

Each subagent should be told to follow the `/make-evergreen` skill, referred to by its file path. The subagents should use the same LLM as you. They should be free to judge whether they actually need to change anything or not - some aspects of the code may already be in good shape. After a subagent finishes its work, it should make sure all automated checks pass and then commit its changes, possibly splitting its work into multiple commits - if so, automated checks should pass after each commit.

The non-leaf subagents should primarily think about architectural and DX questions such as coupling between smaller elements and iteration speed. They are allowed to modify files, but should primarily be concerned with their structure. They are allowed to e.g. change the directory/package structure and names, including splitting/merging/removing/adding packages. Leaf-level subagents should actually focus on the code itself, although they too are allowed to change structure if needed.

The subagent is allowed to also touch other parts of the codebase where that is required for its work, but it should focus on its assigned piece. Because subagents may touch other parts, they must work in separate worktrees, so include instructions to set up a git branch and worktree under `/tmp` when launching each subagent. Tell the agent what to name its branch and worktree.

## Guidelines for coordinating the work

Because each subagent gets their own wortkree, they should be free to change any files they like. However, sometimes they might decide that a specific change they see a need for would be outside of their scope, and in that case they should report it to you. You may then choose when to launch a new subagent to handle it. That subagent should be free to judge whether the change is beneficial or not.

If you have trouble retrieving the responses from subagents, you may view the transcript files that are automatically stored for each of them.

## Non-interactivity

This skill is expected to take a long time to complete and the user will probably not monitor progress continuously. For this reason, you and the subagents should avoid interactivity - be it asking the user questions or prompting them to confirm actions.

If this non-interactivity requirement causes some work to be blocked, report it to the user once the refactor is complete.
