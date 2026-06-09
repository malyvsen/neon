---
name: make-evergreen
description: Make sure the code is evergreen. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Make sure code is evergreen

The objective is to make sure that code is evergreen, i.e. it looks as if it were written with this logic in mind from the start. This applies to the contents of files, their structure (directories, filenames), and documentation. Remove all convoluted naming, roundabout logic and pointless abstractions.

## Scope limits

If you have been working on some code changes, then this skill was probably invoked because coding agents tend to produce minimal-diff changes with backward compatibility in mind, and the user does not wish it to be so. Apply changes to the code changes you've made as well as adjacent code. For example:

- You wanted to create a file called `gardening` where you would put cabbage-planting logic.
- You discovered that a file with that name already existed and contained irrigation and soil-prep logic.
- You decided to create a new file called `cabbage-planting` and put the cabbage-planting logic there.
- In that case, this skill is asking you to consider (not necessarily do - it remains your judgement call) whether to create a `gardening` directory, place the original file into it while splitting it into `irrigation` and `soil-prep`, and move `cabbage-planting` in there too.

If this skill was invoked out of the blue, apply changes to the entire codebase, or a part of it if told so.
