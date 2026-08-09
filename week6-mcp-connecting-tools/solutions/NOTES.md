# Week 6 — Coaching Notes (parent only)

## What success looks like

- `claude mcp list` in her quiz-game project shows `context7` connected (local scope).
- She saw the before/after: Claude hedging from training data vs. quoting current `rich`
  docs — and the quiz game has colored output, committed on `week6-lab` and pushed.
- A 5-line `proposal.md` exists for one challenge server, and she pitched it to you out
  loud. Approval is optional; the pitch is the deliverable.
- She can explain MCP with her own USB analogy and say why new servers need approval
  (new powers + unknown publisher = vet first).

## Before the lab (your prep, ~20 min)

1. **Pre-test the Context7 command yourself** in a scratch folder:

   ```bash
   claude mcp add --transport http context7 https://mcp.context7.com/mcp
   claude mcp list
   ```

   Double-check against the Context7 README (github.com/upstash/context7) before the lab.
   As of Aug 2026 their docs show API-key variants of both install forms:

   ```bash
   claude mcp add --scope user --header "Authorization: Bearer YOUR_API_KEY" --transport http context7 https://mcp.context7.com/mcp
   ```

   ```bash
   claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
   ```

   The keyless HTTP form has worked with lower rate limits, but if your pre-test fails or
   gets rate-limited, create a free key at context7.com (dashboard), use the header form,
   and treat the key by the course rules: shell config or `.env`, never in git — and note
   the add command itself embeds the key in local Claude config, which is fine (it's
   local-only), but it must not go in `.mcp.json` at project scope.

2. **Decide your approval criteria for the challenge** before she pitches, so your "yes"
   or "no" is principled, not mood-based. Good preapproved categories: docs lookup,
   browser automation (Playwright: `claude mcp add playwright -- npx -y @playwright/mcp@latest`),
   filesystem-within-her-projects. Categories to decline this week: anything touching real
   accounts (email, calendar, money), anything needing credentials to a service she uses
   for school or socially — cite README rule 6, not just "no."

## How to evaluate an MCP server's trustworthiness (the approval conversation)

Walk this checklist *with* her — the point is that she internalizes it:

- **Who publishes it?** Official vendor org (e.g. `modelcontextprotocol`, `upstash`,
  `microsoft`) or a random username? Stars/recent commits are weak signals; publisher
  identity is the strong one.
- **What can it touch?** Read-only public data (docs, weather) is low risk. Filesystem,
  browser, or anything that *writes* or *spends* is medium-high. Real personal accounts
  are out this course.
- **Local vs. remote:** a stdio server (`npx ...`) runs code *on your machine* — that's
  full trust in the publisher. A remote HTTP server runs elsewhere but sees whatever data
  the agent sends it.
- **Does it need an API key or login?** Then it acts *as her* somewhere. Whose account?
  What's the blast radius if the agent misbehaves?
- **Is it on the official reference list** (github.com/modelcontextprotocol/servers) or
  only on community lists? Community ≠ bad, but it shifts the burden of proof.

A perfectly good outcome is approving nothing: "this one's cool but touches email — pick
again" is the lesson working.

## Where kids typically get stuck

1. **Running `claude mcp` commands inside the Claude session** — they're terminal
   commands. Symptom: Claude chats about the command instead of it running. Fix: `/exit`
   first (though `/mcp` inside Claude is the in-session equivalent of `list`).
2. **Claude answers from memory instead of calling Context7.** The phrase "using
   context7" at the start of the prompt is the reliable trigger. It's not magic syntax —
   it's just steering, same as Week 2.
3. **Server added in the wrong folder.** Local scope means the server exists only where
   she ran the `add`. If `claude mcp list` looks empty, check `pwd`.
4. **Typo'd URL** shows as a failed connection, not a clear error.
   `claude mcp remove context7` and re-add is faster than debugging.
5. **Challenge paralysis** — the awesome-list is enormous. Timebox browsing to 15 minutes;
   the proposal matters more than the pick.

## Hint escalation (don't jump to answers)

1. "What does `claude mcp list` say right now? Read it out loud."
2. "Ask Claude itself: 'what MCP tools do you have available, and did you use one just
   now?'"
3. "Compare the command you ran, character by character, against the lab."
4. Only then: sit down and drive together.

## Discussion upgrades (if she's flying)

- Open `~/.claude.json` (or the project `.mcp.json` if she tries project scope) and show
  her that MCP config is *just a file* — same demystification as `git log` in Week 1.
- Ask: "Context7 only *reads* public docs. What's the worst a malicious docs server could
  still do?" (Answer worth reaching: it feeds text into the agent's context — poisoned
  docs could steer the agent into writing bad code. Inputs are an attack surface too.)
  This seeds Week 7's "how do you know it's good?"
- Have her run the before/after test on a library that changed recently — the gap between
  memory and live docs gets more visceral the fresher the change.
- Connect forward: in Week 8's capstone she'll pick her own tool stack. The proposal
  format from this week's challenge is exactly how she should justify each piece.
