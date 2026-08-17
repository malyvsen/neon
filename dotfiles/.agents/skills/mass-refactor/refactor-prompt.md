# Your objective

Carry out a single high-level step in a mass refactor.

Your priorities, in order:

1. Introducing coupling where it's beneficial, and removing it where it's not.
2. Increasing iteration speed.
3. Increasing onboarding speed.

{{#if not top-level}}
You are one of many agents executing the refactor, and the work has been split between you. Your part concerns {{slice}}. Your focus should be on improving it in accordance with the priorities above. If that requires modifying other parts, you are allowed to do so (your work will later be intelligently consolidated with that of the other agents, so don't worry about conflicts), but your objective remains to improve the part you are responsible for.
{{/if}}

{{#if subagent is structural, not content-focused}}
You are allowed to modify files, but should primarily be concerned with their structure. For example, you are allowed to change the directory/package structure and names, including splitting/merging/removing/adding packages.
{{/if}}

{{#rewrite as needed}}
Your work does not only concern code files, but also documentation, configuration, tests, and development tooling. The term "refactor" is being used broadly here - changes to any of these are desired as long as they are in line with the priorities above.
{{/rewrite}}

It is up to you to decide if changes are needed at all.

# Instructions

Create a worktree for yourself and check out a new branch named {{branch}} in it. Start from the `mass-refactor` branch.
Inspect {{slice}}. Focus on the high-level structure, what depends on what.
Inspect historical changes to {{slice}} and past agent conversations concerning {{slice}}.
Consider what changes would be beneficial to make.
Implement the changes, splitting the work into multiple commits if needed. Each commit should pass all automated checks. Avoid interactivity - try not to surface any approval requests or questions.
Briefly report what you did{{#if subagent is structural, not content-focused}} and how further work in {{slice}} should be split between a few (roughly 3-5) new subagents so that each gets a fairly independent piece to refactor. This does not need to be a filesystem-based split - it can also be a logical one, e.g. by feature, topic or category of file content. For each subagent, decide if it should focus on the high-level structure or the file contents themselves. The latter case is only a good idea if the total amount of content is small enough to wrap one's head around - roughly 2000 lines at most. It's OK to recommend only launching structural subagents - they will then get to recommend content-focused subagents if they see fit{{/if}}.

# Philosophy

## Coupling

Coupling is beneficial when the coupled parts are expected to change together, and detrimental when they are expected to diverge. This can, to some extent, be inferred from history - if parts change together frequently, they should probably be coupled, and if one part is often pulled in conflicting directions, it should probably be split, making its related parts decoupled. This future is what matters though, and conversations with agents frequently hint at what it holds.

For example, poor coupling is documentation that is not colocated with the code it describes, when that code is expected to change. Possible improvements in this case include:

- colocating the documentation
- removing the change-prone details from the documentation, pointing to the code instead
- removing the documentation altogether - agents are pretty good at figuring things out on their own, and misleading documentation is worse than no documentation at all

## Iteration & onboarding speed

Issues that make onboarding and iteration slower can also be inferred from history and past conversations. If a conceptually simple change needed a lot of code changes or took a lot of agent time, that likely points to an issue.

Common problems include:

- convoluted logic
- long chains of parameter-passing
- inconsistent naming of files or variables
- misleading or incomprehensible documentation
- flaky or slow tests
- confusing error messages
- many others!

Always ask yourself what the ultimate point of doing a certain thing is, and if that can be achieved in a less convoluted way - do it.

## Content volume

A frequent indicator of a good refactor is a reduction in the total amount of content in the repository. This is not necessary - there are cases when more content is better - but frequently a good idea.
