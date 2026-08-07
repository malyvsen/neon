---
name: make-pr
description: Push the current branch and open a pull request in the user's engineering PR style. Use when explicitly asked to make or open a PR.
disable-model-invocation: yes
---

# Make a PR

Open a pull request. By default, this should be from the current branch, but the user may override this.

## Steps

1. Inspect branch state and conversations with other agents pertaining to it.
2. If there are uncommitted changes the user intended to include, stop and ask — do not invent a commit unless they asked for one.
3. Push if needed, then create the PR.
4. Return the PR URL, title, and body.

## Title

- Sentence case, imperative or plain descriptive — like a short changelog line.
- No prefix which belongs in commit messages.
- Prefer naming the outcome or problem, not the mechanism.

## Body

Write like a colleague explaining the change in chat: full sentences, focused on **why**, light on implementation detail. Match length to the change — a one-line fix gets a couple of sentences at most; a large change still usually fits in one to three short paragraphs.

Do:

- Lead with the motivation, problem, or constraint that made the change necessary.
- Mention non-obvious decisions, deliberate non-goals, feature flags / blast radius, and stacking (`Stacked on #N`) when a reviewer would otherwise wonder.
- If verification is incomplete, say so.
- Use a short bullet list only when the PR is several independent items; otherwise plain prose.
- Write so the body is correct from the base branch's point of view — do not describe paths, services, or names that only exist in a later PR.

Do not:

- Use `## Summary` / `## Test plan` scaffolding or checklists.
- Dump a file list, commit list, or blow-by-blow of what changed (the diff already has that).
- Use nicknames or shorthand that someone who did not participate in creating the PR would not know.

`gh` may append a "created by this and this agent" footer; do not add one yourself.

## Example

The title already carries the main point; the body only adds what a reviewer would still wonder about.

**Title:** `Expose ranking evals data for the research team`

**Body:**

```text
Exposed only when the terraform var `enable_evals` is set to `true`.
For now I decided against providing an API for this data - the evals code can do whatever it likes by accessing the DB directly (will probably lead to faster iteration initially, and less hassle with making `query-api` have conditionally available endpoints in another db schema).
Tested locally with synthetic data - remote with real data on `dev-sandbox` is still in progress.

Stacked on #246.
```
