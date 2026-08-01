---
description: Global agent rules
alwaysApply: true
---

# Global agent rules

## Plans end with make-evergreen

Unless the user explicitly says otherwise, every plan must include a final step that invokes a subagent with the same model/reasoning power as yourself with the `/make-evergreen` skill (referred to by its file path).

Give that subagent only brief context on the intent of the work. Do not pass anything else (e.g. coding rules or file lists) — it should discover those itself.
