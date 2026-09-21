Work in an isolated checkout. Reuse an assigned checkout; otherwise create one with the environment's native worktree tool, falling back to `git worktree add`. Create and check out a branch named {{subagent's branch, made up of the managed branch name plus a suffix matching the subagent's name}}, starting from {{managed branch}}. Run all file operations and commands in that checkout.

{{if a plan is provided}}
Once the worktree is set up, execute the plan at {{path to plan}}.
{{else provide instructions as needed}}
{{/if}}
