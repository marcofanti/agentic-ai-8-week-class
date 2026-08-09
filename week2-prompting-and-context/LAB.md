# Week 2 — Prompting, Context & Steering

## 🔧 Tooling habit (5–10 min)

First week of the ritual! Create this week's project, put it on GitHub, and do all your
work on a [branch](../GLOSSARY.md):

```bash
cd ~/projects
uv init quiz-game
cd quiz-game
git init
git add -A
git commit -m "chore: new project from uv init"
gh repo create quiz-game --private --source=. --push
git switch -c week2-lab
```

At the **end** of the lab, save and push your work:

```bash
git add -A
git commit -m "feat: quiz game with high scores"
git push -u origin week2-lab
```

## 🎯 Goal

Prove to yourself that *how you ask* changes what you get — then set up standing
instructions and steering tricks so the agent works your way every time.

## 📖 Concepts (~15 min)

### The context window: the agent's short-term memory

Everything Claude can "see" right now — your conversation, files it read, its own
outputs — lives in the [context window](../GLOSSARY.md). It's big, but it fills up, and
when it does, older stuff falls out. Two practical rules follow from this:

1. **Don't make Claude guess.** Guessing burns turns, and every wasted turn fills the
   window with junk. Say what you want up front.
2. **One conversation = one job.** Starting fresh (`/exit`, then `claude` again) gives you
   a clean window. Fresh sessions forget everything — *except* one special file you'll
   meet below.

### Specific beats vague — every time

"Make me a quiz game" leaves a hundred decisions to the AI: topic, length, scoring, looks.
It will make all hundred *for* you, and most won't match what you imagined. A specific
[prompt](../GLOSSARY.md) makes the decisions yourself and hands over a spec. Today you'll
run this as an actual experiment: same task, vague vs. specific, results side by side.

### Plan before code

For anything non-trivial, pros make the agent *propose a plan first* and only then let it
touch files. Claude Code has this built in: [plan mode](../GLOSSARY.md). Cheap to review a
plan; expensive to untangle wrong code.

### CLAUDE.md: instructions that survive

A [CLAUDE.md](../GLOSSARY.md) file in your project is read by Claude Code at the start of
*every* session — a note taped to the fridge: "in this house, we do things this way."
Preferences you'd otherwise repeat every conversation go there once.

## 🛠️ Guided exercise (~90 min)

### Part A — The vague prompt (15 min)

The vague attempt gets its own throwaway folder so the two results can sit side by side:

```bash
cd ~/projects
uv init quiz-vague
cd quiz-vague
claude
```

Give it exactly this and nothing more:

> Make me a quiz game.

Approve what it asks, let it finish, then play the result:

```bash
uv run main.py
```

Jot down (really — paper or a note): What topic did it pick? How many questions? Is there
scoring? Colors? Can you play again without rerunning? Then `/exit`.

### Part B — The specific prompt (25 min)

Now the real project. Pick a topic you actually care about — a band, a fandom, a school
subject:

```bash
cd ~/projects/quiz-game
claude
```

Give it a spec. Use this shape, but fill in *your* topic and tweak anything:

> Build a terminal quiz game in main.py, run with uv. Topic: Taylor Swift (swap in
> yours). 10 multiple-choice questions, 4 options each, that get harder as you go.
> Scoring: 1 point for easy questions, 2 for medium, 3 for hard, with a final score and
> a fun rank title at the end. Use colored terminal output: green for correct, red for
> wrong, and show the right answer when I miss. After the last question, ask if I want
> to play again. Keep it all in one file with plain Python.

Play it:

```bash
uv run main.py
```

### Part C — Compare, side by side (10 min)

Open both `main.py` files in VS Code and put your Part A notes next to the new game.
For each difference — topic, question count, scoring, colors, replay — ask: *did I choose
that, or did the AI?* That's the whole lesson: **every detail you don't specify is a
decision you handed to the AI.** Vague isn't wrong for exploring ideas; it's wrong when
you already know what you want.

Clean up the throwaway:

```bash
cd ~/projects && rm -rf quiz-vague
```

### Part D — Your first CLAUDE.md (20 min)

Time to stop repeating yourself. In `~/projects/quiz-game`, create a file named exactly
`CLAUDE.md` (VS Code: File → New File) with your standing rules — here's a starter,
make it yours:

```markdown
# Project rules

- My name is Christina. Address me by name.
- This is a uv project: always run code with `uv run`, add packages with `uv add`.
- Ask me before adding any new package.
- After every change, explain what you changed in one short paragraph.
```

Now prove it works. Start a **fresh** session (`claude`) and ask:

> Add a question countdown so I can see how many questions are left.

Watch for the evidence: did it call you Christina? Explain in one paragraph? If it
wanted a package, did it ask first? That's persistence — a brand-new session, zero
reminders, and it already knows your rules.

### Part E — Plan mode and steering (20 min)

Two steering skills, in the same session.

**Plan first.** Type `/plan` to switch into plan mode, then ask for something bigger:

> Add a two-player mode where players alternate questions and the game tracks both
> scores.

Claude now *proposes* an approach instead of editing files. Read the plan. Change one
thing about it in plain English ("keep it in one file", "show both scores after every
question") before approving. Only then let it build.

**Interrupt and redirect.** While Claude is mid-task on your next request, press `Esc`.
It stops immediately — nothing broken, no hard feelings. Then redirect:

> Actually, hold on — do that, but without adding any new files.

Interrupting an agent isn't rude; it's the steering wheel. Use it whenever you see it
heading somewhere you don't want.

## 🚀 Challenge (~30–60 min)

**The fewest-prompts game.** Get this feature fully working:

*High-score tracking: after each game, save the player's name and score to a file, and
show the top 5 scores at the end of every game — surviving between runs.*

Rules: count **every** message you send until it works, including fix-up messages.
Before you type anything, think: what would Claude need to know to nail this in one shot?
(Where's the data saved? What format? What if the file doesn't exist yet? What exactly
does the top-5 display look like?) Write the one prompt, send it, test with
`uv run main.py` a few times.

- One prompt: legendary. Two or three: excellent. More: look back at which details you
  left out — that's your prompting lesson, free of charge.
- **Stretch:** delete the feature (`git checkout -- main.py` after committing your win)
  and get a *different* person's one-shot attempt — say, Dad writes the prompt. Whose
  prompt was tighter?

Don't forget the end-of-lab commit and push from the top of this lab.

## ✅ Show a parent

1. Play both memories of the experiment: describe the vague game vs. the specific one,
   and explain *why* the specific prompt won.
2. Open your `CLAUDE.md` and explain what it does and when Claude reads it.
3. Tell them your challenge prompt count — and what you'd put in the prompt next time.

## 🆘 If you get stuck

- **Colors don't show / weird codes like `[32m` print instead** → tell Claude exactly
  what you see, paste a sample. Terminal color is a classic "works on my machine" bug and
  Claude fixes it fast when it can see the symptom.
- **Claude ignored your CLAUDE.md** → is the file named exactly `CLAUDE.md`, in the same
  folder where you ran `claude`? Did you start a *fresh* session after creating it?
- **`/plan` doesn't do anything** → type `/` alone and look at the menu that pops up —
  find the plan option there. Menus beat memory.
- **The game crashes** → paste the full error message to Claude and add "fix this."
  Reading errors *to* the agent is a legit pro move, not cheating.
- **Challenge taking too many prompts** → stop sending patches. Start a fresh session,
  and write one new prompt that includes everything you've learned from the failures.
- **Wrong folder confusion** → `pwd` before `claude`, always. The agent can only see the
  folder it started in.
