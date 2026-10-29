---
name: plan-ui
description: Plans UI changes by creating an interactive mockup of the proposed interface, then writing an implementation plan. Use when creating UI mockups or designing visual updates.
disable-model-invocation: true
---

# Plan UI

1. Create a mockup of the proposed interface that matches the app’s styling. Support switching between pages and design variants when presenting several, and show device frames for the relevant target devices.
2. If not using a specialized tool for the mockup process, open the mockup for the user in a browser.
3. Iterate with the user. Don't reopen the mockup unless asked to.
3. Once the user is happy with the mockup, follow `/write-plan` to write the implementation plan. Reference the agreed mockup using the selected tool’s artifact reference or, for a standalone file, its path.


## Visualization tool choice

Prefer a specialized visualization or mockup tool that supports the required content and interactions. If no tool is readily available, create a temporary .html file in an appropriate spot.

Order of preference - pick the first spot that clearly exists:
1. The repository's preferred location for mockups.
2. A natural spot within the current framework.
3. `/tmp`.
