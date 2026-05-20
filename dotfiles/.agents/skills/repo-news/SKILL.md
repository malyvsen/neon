---
name: repo-news
description: Present the user with a summary of activity in the repository. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Present the user with a summary of activity in the repository

1. Establish when the user was last up-to-date. If not told otherwise, you can assume that was the last workday around 18:00 local time.
2. Find all commit and PR activity on GitHub since then. Ignore activity by the user themselves.
3. Present the user with an overview of the activity, including links in Markdown format where relevant. If there are multiple stacks of branches or PRs, group the updates by stack and order from lowest (nearest to the main branch) to highest.
