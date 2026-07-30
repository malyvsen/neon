---
name: repo-news
description: Present the user with a summary of activity in the repository. Use when explicitly asked to do so.
disable-model-invocation: yes
---

# Present the user with a summary of activity in the repository

1. Establish when the user was last up-to-date. If not told otherwise, you can assume that was the last workday around 18:00 local time.
2. Find all commit and PR activity on GitHub since then, on all branches. Ignore activity by the user themselves.
3. Identify what goal each piece of work is trying to achieve by looking at the changes, commit messages, and PR descriptions.
4. Present the user with an overview of the activity, including links in Markdown format where relevant. If there are multiple stacks of branches or PRs, group the updates by stack and order from lowest (nearest to the main branch) to highest.

## Example output format

```markdown
### {Theme / workstream} — {Author}

**[#{N}]({pr_url})** — **{merged|closed|open}**
Areas: `{top-level code path}` ({short note}), `{top-level code path}` ({short note})

{2–5 sentences of product-oriented overview. Assume the reader has context about the repo, but not the work being done.}

**[#{N}]({pr_url})** — **{merged|closed|open}**
Areas: `{top-level code path}`

{…}

### {Next theme} — {Author}

**[#{N}]({pr_url})** — **{merged|closed|open}**
Areas: `{top-level code path}`

{…}
```
