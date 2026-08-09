# Week 7 — Evals & Feedback Loops: How Do You Know It's Good?

## 🔧 Tooling habit (5–10 min)

This week you're working inside your Week 4 mini-agent project:

```bash
cd ~/projects/mini-agent
git checkout main
git pull
git checkout -b week7-lab
mkdir -p evals
```

At the end of the lab: commit everything and push the branch. By now your fingers
should do this without your brain's help — that's the whole point of the habit.

## 🎯 Goal

Build a grading system for your own AI agent, prove with a *number* whether a change
made it better or worse — and watch Claude Code use tests to fix code all by itself.

## 📖 Concepts (~15 min)

### "It looked right" is not evidence

Here's the uncomfortable truth about AI: run the same prompt twice and you can get two
different answers. One might be great, one might be subtly wrong. So when you tweak your
agent and the next answer "looks right"... did you actually improve it? Or did you just
get lucky on that one run? You genuinely cannot tell by eyeballing it.

### Evals: turning "hmm, seems good" into a number

An [eval](../GLOSSARY.md) is how professionals answer that question. It has three parts:

1. **Tasks with known-good answers** — questions where you already know what correct looks like.
2. **A scorer** — code that checks each answer automatically.
3. **A report** — a scoreboard: 7/10.

Once you have that number, a magic thing happens: "did my change make it better or
worse?" stops being a debate and becomes **subtraction**. Before: 6/10. After: 9/10.
That's called checking for *regression* — making sure a change didn't quietly break
things that used to work.

### LLM-as-judge: one AI grading another

Some answers are easy to score in code ("does it contain 399.5?"). But how do you score
"summarize this file in one sentence"? There's no exact right answer. The industry trick:
send the answer to a *different* AI model with strict instructions to grade it PASS or
FAIL. That's [LLM-as-judge](../GLOSSARY.md), and it works because **judging is easier
than doing** — you might not be able to write a great summary of a book you haven't
read, but you can tell whether a summary of a book you *have* read is accurate.

### The self-correcting loop

Remember [TDD](../GLOSSARY.md) from the glossary? Test → run → fix → repeat. Here's why
agents + tests are such a powerful combo: a test gives the agent the same thing your
eval gives you — an *objective signal*. The agent writes code, runs the test, sees
FAIL, reads the error, fixes the code, runs the test again... without you steering
every step. The test is the steering. You'll watch this happen live in the Challenge.

### Hooks, in one paragraph

A [hook](../GLOSSARY.md) is an automatic check that fires whenever the agent does
something — for example, "every time Claude edits a Python file, run the tests." It's a
guardrail that doesn't rely on anyone (human or AI) remembering to check. You'll try one
as a stretch goal today.

## 🛠️ Guided exercise (~90 min)

You're building an eval harness for the mini-agent you wrote in Week 4 — the one with
the `calculator` and `read_file` tools.

### Step 1 — Write the tasks (~20 min)

Create `evals/tasks.json`: about **10 tasks**, mixing two types.

- **`exact` tasks** — checkable in plain Python. Example: "What is 17% of 2350?" →
  the answer must contain `399.5`.
- **`judged` tasks** — free-text, graded by an AI judge. Example: "Summarize
  pyproject.toml in one sentence" → judged on accuracy.

Use this shape for each task:

```json
{
  "id": "percent-1",
  "type": "exact",
  "question": "What is 17% of 2350?",
  "expected_contains": "399.5"
}
```

```json
{
  "id": "summary-1",
  "type": "judged",
  "question": "Read pyproject.toml and summarize it in one sentence.",
  "criteria": "Must be one sentence and accurately describe what the file declares."
}
```

Start `claude` inside `~/projects/mini-agent` and let it help you:

> Look at my agent in main.py and its tools. Help me write evals/tasks.json with 10
> eval tasks in this exact format: [paste the two examples above]. Make about 6 "exact"
> tasks (math the calculator can do, facts from files in this project) and 4 "judged"
> tasks (summaries, explanations). For exact tasks, compute the expected answer yourself
> and double-check it.

**Read every task before moving on.** Bad expected answers = a broken ruler. Check the
math on at least two exact tasks with a real calculator.

### Step 2 — Build the runner (~35 min)

First add the two libraries your runner needs (anthropic for your agent, openai for the
judge):

```bash
uv add anthropic openai
```

Now have Claude build `evals/run_evals.py`. Be specific — you learned how in Week 2:

> Write evals/run_evals.py. It should: (1) load evals/tasks.json; (2) for each task,
> run the question through my agent's loop from main.py — import or copy the loop, don't
> reinvent it; (3) score "exact" tasks in plain Python by checking that
> expected_contains appears in the answer; (4) score "judged" tasks by sending the
> question, the criteria, and my agent's answer to the OpenAI model "gpt-5-mini" with a
> strict judge prompt: reply with exactly PASS or FAIL on the first line, then a
> one-sentence reason; (5) print a scoreboard: one line per task with ✓ or ✗ and the
> reason for failures, then a total like "Score: 7/10". Both API keys are already in my
> environment. Run it via uv run.

*(Model names change over time. If `gpt-5-mini` errors, ask Claude: "what's the current
cheapest OpenAI model? Update the judge to use it.")*

Run it:

```bash
uv run evals/run_evals.py
```

Debug with Claude until you see a real scoreboard. A full run costs a few cents — 10
questions to your agent, ~4 to the judge.

### Step 3 — The experiment (~30 min)

This is the payoff. **Run the eval three times:**

```bash
uv run evals/run_evals.py
uv run evals/run_evals.py
uv run evals/run_evals.py
```

Write the three scores down. Are they identical? Probably not — *that* is why
"it looked right once" proves nothing.

Now improve your agent. Look at which tasks fail most. Is it skipping the calculator
and doing math in its head? Rambling for three paragraphs when asked for one sentence?
**You pick the weakness.** Then edit the *system prompt* in `main.py` — often one added
sentence, like "Always use the calculator tool for arithmetic; never compute in your
head" or "When asked for one sentence, answer in exactly one sentence."

Re-run the eval three times. Watch the number move.

If your score jumped: you just did real AI engineering. You changed one sentence and you
can **prove** it made your agent better — not vibes, a number. If it didn't move, that's
a finding too: try a different fix and re-run. Either way, the loop is the skill.

Commit your work:

```bash
git add evals/ main.py
git commit -m "feat: eval harness with exact + judged scoring"
git push -u origin week7-lab
```

## 🚀 Challenge (~30–60 min)

Now watch an agent run the *same* loop on itself — the self-correcting loop, live.

```bash
cd ~/projects/quiz-game
git checkout -b week7-tdd
claude
```

1. Ask Claude for a test for a feature that **doesn't exist yet**:

   > Write a real pytest test in test_quiz.py for this rule: the player's score can
   > never go negative, even if they answer everything wrong. Don't change the game code
   > yet. Then run the test with uv run pytest and show me the failure.

2. Watch it fail. Red is good — a failing test is proof the test actually tests something.

3. Now say the magic words:

   > Make this test pass — run the tests yourself to verify.

   Don't touch anything. Watch the loop: edit → run pytest → read output → (maybe fix
   again) → green. That's the same test→run→fix cycle from your eval harness, except the
   agent is driving. Commit when it's green.

**Stretch:** ask Claude to set up a simple hook so pytest runs automatically after every
edit it makes in this project — a guardrail with no memory required:

> Set up a Claude Code hook for this project that runs "uv run pytest -q" after every
> file edit you make. Then break something small on purpose and show me the hook
> catching it.

## ✅ Show a parent

Demo the scoreboard and the TDD loop, then explain in your own words:

1. Why isn't "I ran it once and it looked right" enough evidence that an agent works?
2. Show your before/after scores. What one change did you make, and how do you *know*
   it helped?
3. What is LLM-as-judge, and name one way the judge could get it wrong (hint: can a
   judge be fooled by a confident-sounding wrong answer?).

## 🆘 If you get stuck

- **The runner crashes immediately** → read the error's *last* line first. `KeyError`
  usually means a task in tasks.json is missing a field — compare it to the examples.
- **Every judged task fails** → print what the judge actually said. Is it replying
  "PASS." with a period, or a whole paragraph? Your code might be checking too strictly
  — ask Claude how to make the PASS/FAIL check more forgiving.
- **`gpt-5-mini` errors** → model names change. Ask Claude for the current cheap OpenAI
  model and swap it in.
- **Score is 0/10** → is your agent even being called? Add a `print()` of each answer
  before scoring — you can't debug what you can't see.
- **The exact task fails but the answer looks right** → check formats: is the agent
  saying `399.50` or `$399.5` while you expect `399.5`? Decide whether to loosen the
  check or tighten the prompt.
- **Claude's TDD test passes immediately** → then it isn't testing a missing feature.
  Tell Claude: "this test should fail on the current code — make it stricter."
