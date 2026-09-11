---
name: lets-cook
description: Comes up with a recipe from ingredients the user has, as an interactive canvas with a checklist, EU nutrition table, and cooking timeline. Use when the user wants to cook or bake from what is in the kitchen, fridge, or pantry, or asks for a recipe from available ingredients.
disable-model-invocation: true
---

# Let's cook!

The objective is to write a recipe for the user to follow, using only the ingredients they have available.

## Instructions

1. The user will provide a list of ingredients they have, and optionally a rough idea of what they want to cook or bake. The ingredients they provide may be in various formats - text, images, something else. The list will almost certainly be incomplete, as it's impractical to inventory every item in one's house.
2. Come up with a rough sketch of a recipe and place it in a canvas. Copy [example.canvas.tsx](example.canvas.tsx) to the workspace canvases directory and replace only the recipe constants at the top (`NAME`, `SERVINGS`, `INGREDIENTS`, `UTENSILS`, `NUTRIENTS`, `STEPS`). Ids only need to be unique within each of those lists. Empty lists are omitted. Try to use only the ingredients that the user has provided, but prefer to make a sensible recipe than to be limited to these. Scale the recipe so that the most scarce ingredient is fully used, unless told otherwise. Express amounts in the most natural form, e.g. tablespoons, teaspoons, grams, item count - possibly provide several formats if unclear which is best.
3. If ingredients are missing, ask the user if they happen to have them. Suggest replacements if they do not. For example, ask: "Do you have any X, and if yes, how much? If not, you could also use Y or Z instead." Let the user answer in free form rather than a structured question so that they can provide the details they wish. After every question, update the canvas and use the `/make-evergreen` skill to make sure the recipe remains legible and sensible.
4. Keep asking and iterating on the recipe until it is complete and the user is satisfied.
