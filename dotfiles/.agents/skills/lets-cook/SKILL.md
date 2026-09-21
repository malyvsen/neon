---
name: lets-cook
description: Creates an interactive recipe from ingredients the user has, with checklists, an EU nutrition table, and a selectable cooking timeline. Use when the user wants to cook or bake from what is in the kitchen, fridge, or pantry, or asks for a recipe from available ingredients.
disable-model-invocation: true
---

# Let's cook!

The objective is to write a recipe for the user to follow, using only the ingredients they have available.

## Instructions

1. The user will provide a list of ingredients they have, and optionally a rough idea of what they want to cook or bake. The ingredients they provide may be in various formats - text, images, something else. The list will almost certainly be incomplete, as it's impractical to inventory every item in one's house.
2. Create an interactive recipe preview. Try to use only the ingredients that the user has provided, but prefer to make a sensible recipe than to be limited to these.
   - Prefer an available visualization or mockup tool that supports the required content and interactions. Read and follow its instructions for output format, previewing, file location, theming, and saving interactive selections. Use [example.html](example.html) as a reference for content, design, and behavior, adapting its implementation to the selected tool.
   - If no suitable tool is available, copy [example.html](example.html) to a writable output location chosen according to the environment’s instructions. Edit the recipe constants at the start of the script, set `LANGUAGE` to `en` or `pl`, and retain the nutrient IDs while updating their values and reference-intake percentages. Open the customized file in a browser.
   - Match the user’s input language throughout the recipe, including headings, ingredient names, quantities, and cooking instructions.
   - Include ingredient and utensil checklists, an EU nutrition table, ordered cooking steps, and a timeline whose selection stays synchronized with the selected step.
   - Scale the recipe so that the most scarce ingredient is fully used, unless told otherwise.
   - Express amounts in the most natural form, e.g. tablespoons, teaspoons, grams, item count — possibly provide several formats if unclear which is best.
3. If ingredients are missing, ask the user if they happen to have them. Suggest replacements if they do not. For example, ask: "Do you have any X, and if yes, how much? If not, you could also use Y or Z instead." Let the user answer in free form rather than a structured question so that they can provide the details they wish. After every question, update the recipe preview and use the `/make-evergreen` skill to make sure the recipe remains legible and sensible.
4. Keep asking and iterating on the recipe until it is complete and the user is satisfied.
