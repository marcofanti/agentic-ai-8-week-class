# Week 7 — Coaching Notes (parent only)

## What success looks like

- `~/projects/mini-agent` has an `evals/` folder on branch `week7-lab` with
  `tasks.json` (~10 tasks, both types) and a working `run_evals.py` that prints a
  per-task ✓/✗ scoreboard and a total.
- She ran the eval **at least 3 times before and 3 times after** a system-prompt
  change, and can show you the numbers moving (the emotional core of the week:
  "I changed a sentence and I can PROVE it").
- In `quiz-game`, a pytest test she watched fail, then watched Claude make pass
  autonomously — with her hands off the keyboard.
- She can articulate: (a) AI output varies run to run, so one good run proves nothing;
  (b) an eval = tasks + scorer + report; (c) LLM-as-judge works because judging is
  easier than doing, but the judge can be fooled by confident-sounding wrong answers.

## Before the lab (your prep, ~15 min)

- **Both API keys must work.** The agent uses `ANTHROPIC_API_KEY`, the judge uses
  `OPENAI_API_KEY`. The OpenAI key may not have been touched since setup week — verify
  it *before* the lab: a dead judge key 40 minutes in is demoralizing. Quick check:
  `echo $OPENAI_API_KEY` shows something, and the platform.openai.com account has
  billing/credits active.
- **Cost expectation:** a full eval run costs cents (10 short agent calls + ~4 tiny
  judge calls). Even a whole afternoon of re-runs stays well under a dollar. If she's
  hesitant to re-run "because it costs money," reassure her — re-running is the lesson.
- `eval_harness_reference.py` in this folder is a complete working harness. It's your
  answer key, not hers. To sanity-check her setup independently of her code:
  `cd ~/projects/mini-agent && uv run /path/to/eval_harness_reference.py`
  (it embeds 4 fallback tasks if her `tasks.json` doesn't exist yet).
- Skim her Week 4 `main.py` beforehand so you know what her agent's loop and system
  prompt look like — Step 2 asks Claude to reuse that loop.

## Where kids typically get stuck

1. **Wrong expected answers in tasks.json.** Claude occasionally computes an expected
   value wrong, and then the eval grades correct answers as failures. Symptom: a task
   fails but the agent's answer looks fine. Fix: verify the arithmetic by hand.
2. **Judge output parsing.** The judge replies "PASS." or "PASS — because..." and her
   code checks `== "PASS"`. Nudge: print the raw judge reply, then check
   `startswith("PASS")` on the first line.
3. **Format mismatches on exact tasks** (`399.50` vs `399.5`, `$` signs, commas).
   This is a genuine eval-design lesson, not an annoyance — let her decide whether to
   loosen the check or tighten the agent's prompt, and discuss the tradeoff.
4. **The model-name error.** If `gpt-5-mini` has been renamed/retired by the time she
   runs this, the lab tells her to ask Claude for the current cheap model. Let her
   drive that fix — recovering from a stale model name is a real-world skill.
5. **Score doesn't improve after her change.** She may take this as failure. Reframe:
   the eval just saved her from *believing* a change helped when it didn't — that's the
   system working. Have her try a different sentence and re-run.
6. **Challenge: the "failing" test passes immediately.** Means the feature accidentally
   already exists or the test is weak. The lab has the fix (make the test stricter);
   only step in if she's stuck on *why* red-first matters.

## Hint escalation (don't jump to answers)

1. "What does the scoreboard/error actually say? Read it out loud."
2. "Add a print() so you can see the agent's raw answer / the judge's raw reply."
3. "Paste the error and the relevant code into Claude and ask it to explain first,
   fix second."
4. Only then: open `eval_harness_reference.py` together and compare against her
   version — one function at a time, not a wholesale copy.

## Discussion upgrades (if she's flying)

- **Fool the judge on purpose.** Have her agent answer a judged task with confident
  nonsense ("The file declares a Node.js web server" for pyproject.toml) and submit it
  to the judge manually. Does the judge catch it? Sometimes it won't — that's judge
  bias/gullibility, the exact weakness she should name in the checkpoint.
- **Judge the judge:** who evals the eval? Real teams hand-grade a sample of judge
  verdicts to measure judge accuracy. Ask her how she'd do that with 20 minutes.
- **Flaky vs. real signal:** if scores are 7, 8, 7 across runs, is a jump to 8 after a
  change meaningful? Introduce the idea of averaging multiple runs — she's one step
  from discovering why evals run hundreds of tasks, not ten.
- **Connect to Week 8:** her capstone should ship with a small eval. Ask: "what would
  the tasks.json for your capstone idea look like?" — planting that seed now makes next
  week's spec conversation much richer.
