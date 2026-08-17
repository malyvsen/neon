---
name: mass-refactor
description: Refactor the whole codebase. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Refactor the whole codebase

The objective is to make sure that the entire codebase is as clean as possible. This is probably a lot of work, so it's broken down hierarchically, and work is split between subagents so as not to overload one agent with too much context.

## Step-by-step instructions

1. Look at the current git state. If it is not clean, refuse to continue.
2. Create a new branch called `mass-refactor` and a worktree if these haven't been prepared for you already.
3. Launch the top-level subagent.
4. The subagent should report how to split work further. Launch new subagents according to its recommendation.
   a. When a subagent finishes, it enters a rebase queue you should keep track of.
   b. The first subagent in the rebase queue should be given the instructions in `rebase-prompt.md` to rebase its branch onto `mass-refactor`. The remaining subagents in the queue should wait - don't send them messages.
   c. Once a subagent is done rebasing, fast-forward `mass-refactor` to its branch, remove its worktree and branch, and only then tell the next subagent in the queue to start rebasing.
   d. Subagents may recommend further splitting of work among new subagents. Once the recommending subagent's changes are on `mass-refactor`, launch the new subagents.
5. When the refactor is complete, run the `/work-overview` skill over the `mass-refactor` branch.

## Guidelines for coordinating the work

The instructions you give to subagents when launching them should be based on the prompt template in `refactor-prompt.md`. Rewrite it as needed.

Launch subagents asynchronously so that you are able to converse with the user while they work. Report progress whenever something happens, including an estimated elapsed and remaining time. Make sure no more than 10 subagents are running at any given time - if more are needed, wait for one to finish before launching a new one.

Because each subagent makes their own worktree, they should be free to change any files they like. However, sometimes they might decide that a specific change they see a need for would be outside of their scope, and in that case they should report it to you. You may then choose when to launch a new subagent to handle it. That subagent should be free to judge whether the change is beneficial or not.

If you have trouble retrieving the responses from subagents, you may view the transcript files that are automatically stored for each of them.

## Non-interactivity

This skill is expected to take a long time to complete and the user will probably not monitor progress continuously. For this reason, you should avoid interactivity - be it asking the user questions or prompting them to confirm actions.

If this non-interactivity requirement causes some work to be blocked, report it to the user once the refactor is complete.
