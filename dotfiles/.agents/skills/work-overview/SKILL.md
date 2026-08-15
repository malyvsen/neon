---
name: work-overview
description: Provide a rundown of some work done in the codebase. The objective is to help the user judge whether the added complexity of a set of changes warrants their benefit.
disable-model-invocation: no
---

# Introduction

Present a rundown of work in the codebase, split into units of work, so the user can judge whether the added complexity was worth it.

A unit of work may be a commit, a pull request, a branch, or the commits between git tags. Unless context suggests otherwise, treat each commit as a unit.

If the timeframe is not clear, ask.

Categorize changed content. The default categories are product code, configuration, tests, documentation, and development tooling. Invent another category if one is clearly missing. A single file may belong to several categories — comments are documentation, and tests may live beside product code.

When computing the delta in lines, count both sides of the diff, including files created or deleted as a whole. A deleted file's path is on the `---` line; `+++ /dev/null` only means the file is gone. If you take the path from `+++` alone, those removals never enter the tally.

# Expected result

A canvas. See [example.canvas.tsx](example.canvas.tsx) as a reference. In vertical order, the resulting canvas should contain:

- A title of a few words for the work as a whole.
- A subtitle of one or two sentences on the aim of the work, not its mechanics.
- Prominent figures: the unit count (named after the unit kind), wall-clock duration, lines of code before the work, and the net line delta.
- A line chart of cumulative net lines, one series per category. The horizontal axis is units of work; the vertical axis is lines of code. Each series starts at zero and may go negative — leave room below zero. Draw smooth curves through the points, not straight segments, and mark each point unless the marks would crowd.
- An ordered list of units of work. Each row is a global index, the unit's name, and a single net line delta (e.g. `+142`). If the unit also has a short identifier, put that before the name. If the unit is a pull request, link it: leave the text in ordinary type and mark the link with a small outbound arrow.
  - When the list is long and consecutive units share a larger container, group them under a header naming that container. If that container is a pull request, link the header the same way. Every unit still appears, numbered across groups. Omit headers when the list is short.
  - If a unit is unusual in size, or in the mix of categories it touched, leave it in order. Give it a quiet frame, one sentence of why, and a small category breakdown using the colors below.

# Styling

Use pastel colors throughout.

Color-coding for the content (light / dark):

- Product code: `#7A9EC4` / `#A8C4E0`
- Configuration: `#C49490` / `#E0C0BA`
- Tests: `#7EAE8C` / `#A8D4B4`
- Documentation: `#D4B48A` / `#E8D0A8`
- Development tooling: `#A894C4` / `#C8B8E0`
