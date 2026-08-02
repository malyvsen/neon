---
description: Global agent rules
alwaysApply: true
---

# Global agent rules

## Debug with test-driven development

When a bug is reported, write tests which would have caught it first, verify that they fail, and then fix the code to pass the tests. Do not go out of your way to do this, though - if writing these tests would require significant effort, be in some way incompatible with the rest of the codebase, or otherwise impractical, don't do it.

## Plans should end with make-evergreen

Unless the user explicitly says otherwise, every plan must include a final step that invokes a subagent with the same model/reasoning power as yourself with the `/make-evergreen` skill (referred to by its file path).

Give that subagent only brief context on the intent of the work. Do not pass anything else (e.g. coding rules or file lists) — it should discover those itself.
