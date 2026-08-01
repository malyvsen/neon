---
name: make-evergreen
description: Make sure the repo is evergreen. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Make sure the repo is evergreen

The objective is to make sure that the repo is evergreen, i.e. it looks as if it were written with the current logic/features in mind from the start. This applies to the code, file structure (directories, filenames), documentation, and tests. Remove all convoluted naming, roundabout logic and pointless abstractions.

## The problem to address

If you have recently made some edits, then this skill was probably invoked because agents tend to produce minimal-diff changes with backward compatibility in mind, and the user does not wish it to be so. Make sure what you did, and adjacent/related things, look as if they were written with the user's intent in mind from the start. For example:

- You wanted to create a file called `gardening` where you would put cabbage-planting logic.
- You discovered that a file with that name already existed and contained irrigation and soil-prep logic.
- You decided to create a new file called `cabbage-planting` and put the cabbage-planting logic there.
- In that case, this skill is asking you to consider (not necessarily do - it remains your judgement call) whether to create a `gardening` directory, place the original file into it while splitting it into `irrigation` and `soil-prep`, and move `cabbage-planting` in there too.

If this skill was invoked out of the blue, apply changes to the entire codebase, or a part of it if told so.
