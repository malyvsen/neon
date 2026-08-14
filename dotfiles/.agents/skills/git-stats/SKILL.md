---
name: git-stats
description: Help the user judge a set of changes by presenting them with git history statistics.
disable-model-invocation: no
---

# Instructions

Provide a rundown of units of work as they appear in the git history - these could be commits, PRs, branches, etc. The objective is to help the user judge whether the added complexity of a set of changes warrants their benefit.

1. If it is not clear from context what timeframe to consider, ask. The default unit of work is a commit, assume that if there is no reason to think otherwise.
2. Briefly look at the history in question to establish what breakdowns (see below) will work best - a good breakdown is balanced, i.e. a fairly similar proportion of the total changes occurred in each breakdown bucket. The breakdowns will need to be stable across the units of work, hence the need to establish them upfront.
3. Compute line-of-code statistics (total present, added, removed & delta) for the work as a whole and for each unit of work separately. Break this down by:
   - Category of content: code, tests, documentation, tooling - you may think of another category if you spot one.
   - Package/module.
4. Present the results in a canvas. In vertical order:
   - A title describing the work done overall - a few words.
   - A subtitle describing the work in one or two sentences. Focus on the overall objective of the work rather than its technicalities.
   - The total lines present in the codebase before the work, and the added/removed/delta in the work as a whole, in a prominent font.
   - A stacked line chart with the horizontal axis being the units of work, and the vertical axis being the total number of lines in the codebase. This is stacked because it's broken down by category of content.
   - An alluvial diagram showing the total lines present before the work, and how this was affected. On the left - the whole codebase, in the middle - packages/modules, on the right - categories of content (separately for each package/module). At each of the three levels, in each point of the breakdown, there should be an indicator showing the overall delta in lines of code as a consequence of the work.
   - A table where each row is a unit of work, the first column is its ID and name, the second column is a total, and the remaining columns are the breakdowns, grouped visually by which breakdown it is. Each cell contains the delta in lines of code.

# Formatting

Color-coding for the content:

- Code: blue
- Tests: green
- Documentation: yellow
- Tooling: purple
