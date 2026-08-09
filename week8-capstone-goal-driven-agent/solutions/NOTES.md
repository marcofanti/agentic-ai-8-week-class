# Week 8 — Coaching Notes (parent only)

Your role changes this week: less teacher, more **engineering manager**. You review the
spec, guard the scope, unblock her when she's stuck, and run demo day. You do not write
the spec, pick the project, or drive the keyboard.

## What success looks like

- A `SPEC.md` she wrote herself, reviewed and signed by you *before* building started.
- 3–4 session branches in the repo, each ending in a commit — evidence of the rhythm.
- Her success-measure evals exist as runnable checks, and they pass (or the spec was
  consciously descoped and they pass the revised bar).
- A 10-minute demo that follows her script, one eval shown running live.
- A written, honest `RETRO.md`.

A capstone that got descoped twice and *works* is a full success. A grand one that's 80%
done is not — say that out loud early in the week.

## The design review: how to coach without writing it

Book a real 20–30 minute review after her spec hour. Your job is questions, not edits:

- **Goal:** "Say the goal in one sentence without looking at the page." If she can't, the
  goal isn't hers yet — have her rewrite it, don't rewrite it for her.
- **Evals:** the most important section. For each one ask: "How exactly does this get
  measured? Could Claude judge it, or does it need you?" Vague measures ("it should be
  helpful") get sent back. Push for at least one automated check.
- **Scope fence:** "What happens Thursday night if you're behind — what gets cut first?"
  Get her to rank the cuts *now*, in the review, while she's calm.
- **Agency vs. autonomy:** "What's the worst thing this agent could do if it ran without
  asking?" Whatever she names should be on the asks-first side.
- **Session 1:** confirm the riskiest unknown is scheduled first, not last.

Then sign it. The signature matters — it makes the scope a shared agreement she can lean
on later ("that's outside the spec we signed") instead of a suggestion.

If she asks Claude to review the spec, that's fine and even good practice — but the
review conversation with you still happens, and her hands stay on the pen.

## Judging scope — the #1 failure mode is overscoping

Rule of thumb: whatever she specs, mentally cut it in half and ask if the half is still a
demo she'd be proud of. If yes, the original *might* be achievable. Concrete descope moves
per option — keep these in your pocket for midweek:

1. **Study-Buddy:** one class → one chapter of notes. Weak-topic tracking becomes a plain
   text/JSON file the agent appends to (no dashboards, no graphs). Quiz formats: one
   (multiple choice), not three. The wk5 study-guide skill is reused, not rewritten.
2. **College-Search:** 10 schools → 3–5. Criteria: 3–4 max. Output is one markdown
   comparison table + short per-school paragraphs — not a website, not a PDF. Parallel
   subagents are a nice-to-have; sequential research that finishes beats parallel that
   doesn't.
3. **Hobby App:** the app shrinks to whatever hosts the agent loop — the loop is the
   assignment, the app is the frame. One screen/one command-line flow is plenty. Watch
   for "and then it also..." sentences in her spec; each one is a cut candidate.
4. **Finance-App upgrade (hardest — steer her here only if wk3 was smooth):** the
   insights agent can be a *separate script* that reads the app's transaction data and
   writes a report — it does not have to be wired into the React UI. Full UI integration
   is the stretch goal, not the baseline. Read-only against the data, always.

Midweek check-in (put it on the calendar now): "Which session finish-lines are done?
Which eval passes today?" If she's behind after session 2, invoke the ranked cuts from
the review. Frame it exactly as the lab does: cutting scope is a pro move, not failure.

## The build week: your touchpoints

- **Don't hover.** The lab tells her when to steer Claude vs. let it run; let her make
  those calls and occasionally make them wrong — that's the learning.
- **Hint escalation still applies** (same ladder as Week 1): "read the error out loud" →
  "paste it to Claude and ask" → only then sit down together.
- **Watch for eval-gaming.** If an eval keeps failing, the honest options are: fix the
  agent, fix a genuinely-wrong eval, or descope. Quietly lowering the bar to green is the
  one move to call out — the lab names it "lying to yourself"; back that up.
- **Safety recap:** any MCP server she adds still needs your OK; API keys never in the
  repo; if the capstone touches her real notes or data, agree on read-only vs. write.

## Demo day logistics

- **Schedule it** like it's real — a set time, the whole family, phones down, ~20 min.
- **Before:** have her do one full dry run alone, following her demo script. Check the
  laptop is charged, terminal font is big enough for the room, notes file/demo data is
  loaded, and she knows exactly which eval she'll run live.
- **During:** you're the audience, not tech support. If it breaks, let her debug out loud
  — resist the urge to lean in. Ask one "explain it to Grandma" question: "what makes
  this an *agent* and not just a chatbot?"
- **After:** applaud like you mean it. Eight weeks earned it. Then the retro — same
  sitting or next morning, but don't let it slide more than a day.

## Retro questions (she writes RETRO.md; you just ask)

The four from the lab, plus follow-ups that get past one-word answers:

- What worked better than expected? — "What would you tell someone starting Week 1?"
- What would you do differently? — "Was your spec too big, too small, or right? How do
  you know?"
- What surprised you about agents? — "When did Claude most impress you, and when did it
  most need you? What does that say about where humans fit?"
- What next? — this one matters most; see below.

## Where to go after the course

Have real pointers ready when she answers "what next":

- **Build a real MCP server.** She's *used* MCP (wk6); building one that serves something
  she cares about (her quiz bank, her school schedule) and plugging it into Claude Code
  is the natural next rung. The official MCP docs + Python SDK make this a weekend
  project at her level now.
- **Claude Agent SDK.** Her wk4 mini-agent was the from-scratch version; the Agent SDK is
  the production version of the same loop — subagents, hooks, tools included. Porting her
  capstone to it is a great "same project, pro tooling" exercise.
- **Science fair / school angle.** Her wk7 eval harness is legitimately science-fair
  shaped: question, method, measurements, results. "How reliably can an LLM judge X?" or
  a before/after study of her Study-Buddy on her own test scores would stand out — and
  she already has the instruments built.
- **Publish the portfolio.** Walk through her repos together; pick 2–3 to polish and flip
  to public (README, no secrets in history — check!, a screenshot or demo GIF). A GitHub
  profile with a website, a built-from-scratch agent, an eval harness, and a capstone is
  a genuinely unusual thing for a teenager to own. Pin the capstone.
- And whichever she picks: same method as this week. Spec it, build it, prove it works.
