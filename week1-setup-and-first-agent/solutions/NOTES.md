# Week 1 — Coaching Notes (parent only)

## What success looks like

- Every ✓ Verify in SETUP.md passes, including the API haiku smoke test.
- A `my-website` repo exists on her GitHub account with ≥2 commits.
- She can articulate: chat AI answers / agentic AI acts; the loop is
  think → pick tool → act → observe → repeat; keys live in her password manager and in
  per-project git-ignored `.env` files, never in code/git/chats.

## Before the lab (your prep, ~20 min)

- Create/verify her Claude account (subscription seat) so sign-in is smooth.
- On console.anthropic.com and platform.openai.com: set spend limits **before** the lab
  ($5–10/month each is plenty for the whole course), and be present for step 7.
- Decide her GitHub username together beforehand — it becomes semi-permanent identity.

## Where kids typically get stuck

1. **Homebrew "next steps"** — the two `eval` lines it prints at the end get skipped, and
   then nothing else installs. If `brew` isn't found, this is it.
2. **New terminal window needed** after installs (PATH refresh). Teach the reflex: "not
   found → new window → retry."
3. **Password typing shows nothing** — warn her in advance or she'll think it's frozen.
4. **`gh auth login` choices** — pick GitHub.com → HTTPS → login with web browser.
5. **`.env` formatting** — a stray space around `=`, quotes, or a "smart quote" from
   pasting breaks the key. If the smoke test can't authenticate, open `.env` and check
   each line is exactly `KEY=value`. Also make sure she has a password manager set up
   *before* step 7 — that's where the master copies live.

## Hint escalation (don't jump to answers)

1. "Read the error message out loud. What is it literally saying?"
2. "Ask Claude to explain the error — paste it in."
3. Only then: sit down and drive together.

## Discussion upgrades (if she's flying)

- Show her `git log` and `git diff HEAD~1` on her website repo — history is visceral.
- Ask: "what could an agent with file access do that would be *bad*? How do the
  permission prompts prevent that?" — seeds Week 6/7 safety thinking.
