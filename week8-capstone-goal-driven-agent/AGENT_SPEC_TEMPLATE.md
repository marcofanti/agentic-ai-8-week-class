# Capstone Spec — <your project name>

*Copy this file into your capstone repo as `SPEC.md` and replace every italic line with
your answers. Short and concrete beats long and vague — the whole spec should fit on one
or two screens. This is the document Dad reviews and signs before you build anything.*

## Goal

*One sentence. What does this agent help you accomplish? A goal, not a feature list.
Test: could you say it to a friend in one breath?*

> Example: "Help me actually remember my AP Bio material by quizzing me on my own notes
> and focusing on what I keep getting wrong."

## Who it's for

*One or two sentences. Who uses this, and when? (Usually: you, in a specific real
situation. "Me, the night before a bio quiz" is a great answer.)*

## Agency vs. autonomy

*Your deliberate choice from the Concepts section: what does the agent do on its own, and
what must it check with you first? One line for each.*

> Example: "Runs on its own: picking quiz questions, updating my weak-topics file.
> Asks first: deleting anything, changing my actual notes."

## Tools it needs

*List each ability the agent must have — the "hands." For each: what it is, and where it
comes from (built into Claude Code, an MCP server from Week 6, or a Python tool you write
like in Week 4).*

| Tool | What it does | Comes from |
|---|---|---|
| Read notes file | Loads my class notes as context | Claude Code built-in |
| *...* | *...* | *...* |

## Skills it needs

*Which reusable instructions does it need — your Week 5 skills, a CLAUDE.md, a new skill
you'll write? List them. "None" is allowed if it's true.*

## What it does NOT do (scope fence)

*At least three things a bigger version might do that YOURS will not. This list is what
keeps the project finishable — you'll be tempted to cross it mid-week. Don't, unless you
update this spec and re-review with Dad.*

> Example: "Does not cover any class except AP Bio. Does not make flashcard images. Does
> not track anything across multiple users — it's just for me."

## Success measures (3–5 evals)

*How will you PROVE it works? Each row is an eval you will actually build and run, Week 7
style — a check with a clear pass/fail, not a feeling. At least one should be automated;
LLM-as-judge counts.*

| # | The check | How it's measured | Pass looks like |
|---|---|---|---|
| 1 | Quiz questions come from my notes | LLM-as-judge: "is this question answerable from the notes file?" on 10 sampled questions | ≥ 9/10 judged yes |
| 2 | *...* | *...* | *...* |
| 3 | *...* | *...* | *...* |

## Demo script

*The exact 10-minute walkthrough for demo day, as numbered steps: what you'll show, in
what order, ending with one eval running live. Write it now — it forces you to picture
the finished thing.*

1. *...*
2. *...*
3. Run eval #_ live and show it pass.

## Session plan

*Break the build into 3–4 sessions. Each gets one finish-line sentence — something that
either works or doesn't by the end of that session. Put the riskiest/most unknown part
in session 1, not session 3.*

| Session | Finish line ("by the end, ___ works") |
|---|---|
| 1 | *...* |
| 2 | *...* |
| 3 | *...* |
| 4 (optional) | *...* |

## Design review sign-off

*Do not start building above this line being blank.*

- Reviewed with: ____________  Date: ____________
- Changes agreed during review: *...*
- Approved: ☐
