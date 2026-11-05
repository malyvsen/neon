---
name: plan-ui
description: Plans UI changes by creating an interactive mockup of the proposed interface, then writing an implementation plan. Use when creating UI mockups or designing visual updates.
disable-model-invocation: true
---

# Plan UI

1. Create a mockup of the proposed interface that matches the app’s styling.
2. If not using a specialized tool for the mockup process, open the mockup for the user in a browser.
3. Iterate with the user. Don't reopen the mockup unless asked to.
3. Once the user is happy with the mockup, write an implementation plan, referring to the mockup as needed.


## Visualization tool choice

Prefer a specialized visualization or mockup tool that supports the required content and interactions. If no tool is readily available, create a temporary .html file in an appropriate spot.

Order of preference - pick the first spot that clearly exists:
1. The repository's preferred location for mockups.
2. A natural spot within the current framework.
3. `/tmp`.

## Mockup conventions

- The visualization you create may contain extra text or elements if you think these are necessary, but make sure that the mockup within the visualization is free from these and only shows the app UI.
- Don't make up open questions, but if there are any, make sure the user can interactively choose answers to them within the visualization and see the mockup update.
- Once the user informs you of their answer to an open question, bake in their answer - do not keep the switch for that question.
- If there are multiple pages to mock up, support switching between them. However, do not break up an individual page into its elements - keep pages complete.
- If there are multiple target devices, support switching between them.
