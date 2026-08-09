# Week 2 — Coaching Notes (parent only)

## What success looks like

- A `quiz-game` repo on her GitHub with a `week2-lab` branch, containing a playable
  quiz (`uv run main.py`), a `CLAUDE.md`, and high-score persistence from the challenge.
- She can articulate, in her own words:
  - Context window = the agent's short-term memory; it fills up; fresh sessions forget
    everything *except* CLAUDE.md.
  - Every detail left out of a prompt is a decision handed to the AI — that's why the
    specific prompt won.
  - Plan mode = propose before touching files; Esc = interrupt and redirect mid-task.
- She reports an honest prompt count for the challenge (the count matters less than the
  post-mortem: "what detail did I leave out?").

## Before the lab (your prep, ~10 min)

- Skim her Week 1 repo to confirm git/gh still work; the tooling ritual assumes they do.
- Run `claude` yourself once and type `/` to see the current command menu — slash
  commands shift between versions. If `/plan` isn't listed, plan mode is likely on
  Shift+Tab (cycles modes) — find it beforehand so you can redirect her calmly instead
  of debugging live. The concept (propose-then-approve) is the lesson, not the keystroke.
- Optional but fun: think about your own one-shot prompt for the stretch challenge —
  competing against her prompt is a great dynamic.

## Where kids typically get stuck

1. **Running `claude` in the wrong folder.** Symptoms: "it can't find my file", or
   CLAUDE.md silently ignored. Reflex to teach: `pwd` before `claude`.
2. **CLAUDE.md created but not picked up** — she made the file *during* a session.
   It's read at session start; `/exit` and relaunch. Also check the filename is exactly
   `CLAUDE.md` (VS Code may sneak in `.txt`).
3. **ANSI color codes printing as literal `[32m` junk** — depends on how Claude wrote
   the colors. Fastest path: paste the garbled output to Claude. If it proposes adding
   `colorama` or `rich`, that's fine — but notice whether it *asked first* (her
   CLAUDE.md says it should; catching a violation is a teachable moment, not a failure).
4. **The vague attempt goes "too well."** Sometimes the vague prompt yields a decent
   game and she concludes vague is fine. Push on the comparison questions: is it *her*
   topic? Her scoring? The lesson is control, not quality.
5. **Challenge spiral: many small fix-up prompts.** She's patching instead of
   specifying. The lab tells her the fix (fresh session, one complete prompt); nudge her
   back to it rather than letting her grind.
6. **Prompt-count fudging.** "That one doesn't count, it was just a fix" — gently insist
   every message counts. Honest measurement is a Week 7 (evals) seed.

## Hint escalation (don't jump to answers)

1. Question first: "What did your prompt actually say about that? Read it back."
2. Ask-Claude next: "Paste the error / the weird output into Claude and ask it to
   explain before fixing."
3. Only then sit together and drive — and even then, let her type.

## Discussion upgrades (if she's flying)

- **Context window made visceral:** in a long session, ask "what's in Claude's memory
  right now?" — then `/exit`, relaunch, and ask Claude what it remembers. Nothing —
  except CLAUDE.md. That contrast lands the whole concepts section in 2 minutes.
- **Spec thinking:** her winning challenge prompt is, structurally, a requirements spec.
  Point that out — "you just wrote what professional engineers get paid to write."
- **CLAUDE.md as policy:** ask "what rule would you add for a *team* of five people
  sharing this project?" — seeds Week 3 (real codebase) thinking.
- **Where's the data?** Have her open the high-score file (likely JSON) in VS Code and
  hand-edit a score, then rerun. File-based state she can see and poke is a theme that
  returns in Weeks 4 and 8.
