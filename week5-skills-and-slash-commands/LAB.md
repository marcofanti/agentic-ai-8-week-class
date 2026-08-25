# Week 5 — Skills & Slash Commands: Teaching the Agent

## 🔧 Tooling habit (5–10 min)

Before anything else, pull the latest class materials (labs get fixes and updates
between weeks):

```bash
cd ~/Desktop/agentic-ai-8-week-class
git pull
```

This week your "project" is a little unusual: it's your personal skills folder,
`~/.claude/skills`. That folder isn't a git [repo](../GLOSSARY.md), so we'll keep a copy of
everything you write in one — that way your skills have history and live on GitHub like
everything else you build.

```bash
mkdir -p ~/Desktop/projects/my-skills
cd ~/Desktop/projects/my-skills
git init
echo "# My Claude Code skills" > README.md
git add . && git commit -m "chore: start my-skills repo"
git switch -c week5-lab
```

You'll write skills directly in `~/.claude/skills` (so Claude can actually find them), then
**copy them into this repo and commit at the end of the lab** — the exact commands are at
the end of the Challenge section.

## 🎯 Goal

Teach Claude Code two new abilities it remembers forever — written by you, about things
*you* actually do — and know exactly when to use a skill versus CLAUDE.md.

## 📖 Concepts (~15 min)

### A skill is a recipe you only explain once

By now you've noticed something annoying: every time you want Claude to do a task *your
way*, you have to re-explain your way. It's like having a friend who's a great cook but
you have to recite the recipe over the phone every single time.

A **[skill](../GLOSSARY.md)** fixes that. It's a file of instructions — a recipe — that you
write once. Claude loads it automatically whenever it's relevant. You're not reciting the
recipe anymore; you handed your friend the cookbook.

Skills live in folders:

- **Personal skills** (yours, work in every project): `~/.claude/skills/<skill-name>/SKILL.md`
- **Project skills** (shared with a repo): `.claude/skills/<skill-name>/SKILL.md`

A `SKILL.md` has two parts:

1. **Frontmatter** — a small block of `key: value` settings between two `---` lines at the
   very top (this format is called YAML). The two fields you need are `name` and
   `description`.
2. **The body** — the actual instructions, in plain markdown, as long as you like.

### The description is the trigger

Here's the part people get wrong: the `description` isn't decoration. It's **how Claude
decides whether to load your skill.** When you ask for something, Claude scans the
descriptions of every skill it knows and pulls in the ones that match. A description like
"helps with notes" is too vague to trigger reliably; "Turn class notes into a study guide
with flashcards and practice questions — use when asked to study, review, or prep for a
test" tells Claude exactly when this recipe applies.

### CLAUDE.md vs. skills

You met [CLAUDE.md](../GLOSSARY.md) in Week 2. How is a skill different?

| | CLAUDE.md | Skill |
|---|---|---|
| When it's read | **Always** — every session, every message | **On demand** — only when relevant |
| Best for | House rules: "always use uv", "commit messages look like this" | Expertise: a whole procedure for one kind of task |
| Size | Keep it short — it costs [context](../GLOSSARY.md) every turn | Can be long — it only loads when needed |

Rule of thumb: if it applies to *everything*, CLAUDE.md. If it's a *task you do
repeatedly*, skill.

### Slash commands: calling a skill on purpose

Every skill is also a **[slash command](../GLOSSARY.md)**: type `/study-guide` in Claude
Code and the skill loads *right now*, no guessing. Automatic triggering is Claude deciding
the recipe is relevant; the slash command is you deciding.

Two bonus tricks for slash commands: `$ARGUMENTS` in your skill body gets replaced with
whatever you type after the command (`/study-guide chapter 4` → `$ARGUMENTS` becomes
"chapter 4"). And if you add `arguments: [topic]` to the frontmatter, you can use `$topic`
in the body instead. (You may also see older tutorials mention `.claude/commands/` files —
that still works, but skills are the modern way and do everything commands did.)

## 🛠️ Guided exercise (~90 min)

You're building a **`study-guide`** skill: point it at your real class notes, get back a
study guide formatted the way *you* like to study.

### Step 1 — Get some notes to work with (5 min)

Use real notes from a real class — the lab works better when you actually care about the
output. Export/copy them into a plain text or markdown file, e.g.
`~/Desktop/projects/my-skills/notes.md`. No digital notes? Spend 10 minutes typing up one chapter's
worth from a paper notebook. (Don't skip this — a skill tested on fake notes is a fake test.)

### Step 2 — Create the skill (15 min)

```bash
mkdir -p ~/.claude/skills/study-guide
```

Open the new file in VS Code:

```bash
code ~/.claude/skills/study-guide/SKILL.md
```

Now write it yourself — that's the whole point — but here's a full working example to
model yours on. **Change the body to match how YOU study**: if flashcards don't work for
you, replace them; if your teacher loves diagram questions, add those.

```markdown
---
name: study-guide
description: Turn a file of class notes into a study guide with a summary, flashcards, and likely test questions. Use when asked to study, review, prep for a test or quiz, or make flashcards from notes.
---

# Study Guide Maker

The user will point you at a notes file. Turn it into a study guide with these sections,
in this exact order:

1. **Big picture** — a plain-language summary of the main ideas, max 10 sentences.
2. **Flashcards** — 12 question/answer pairs formatted as `Q:` and `A:` lines. Mix easy
   recall questions with a few "why/how" questions.
3. **Likely test questions** — 5 harder questions a teacher would actually ask, with
   short model answers.
4. **Watch out** — the 3 things from these notes people most often forget or mix up.

## Checklist — do ALL of these, every time

- [ ] Read the entire notes file before writing anything
- [ ] Keep every fact traceable to the notes — no outside facts unless clearly labeled "(extra context)"
- [ ] If the notes look incomplete or contradictory, say so at the top instead of guessing
- [ ] Bold the key terms the first time each appears
- [ ] Save the result as `study-guide.md` next to the notes file
```

The description follows the winning formula: **what it does + when to use it**, with the
actual words a person would say ("study", "test", "quiz", "flashcards").

### Step 3 — Test the automatic trigger (15 min)

Skills are loaded when a session starts, so you always test in a **fresh session**:

```bash
cd ~/Desktop/projects/my-skills
claude
```

Then ask naturally — *don't* name the skill. Say something a real you would say:

> Help me study for my bio test using notes.md

Watch the output: you should see Claude load your `study-guide` skill before working. If
it triggered — congratulations, you just taught an AI something permanent. Read the study
guide it produced carefully.

### Step 4 — Test the slash command (5 min)

Type `/exit`, run `claude` again, and this time invoke it deliberately:

> /study-guide use notes.md

Same recipe, but this time *you* chose it. Both paths should give you the same format.

### Step 5 — Iterate: skills are living documents (30 min)

Now find the flaw. Read the study guide as a picky customer. Something will be off — the
flashcards too easy, the summary too long, a section you'd never use. Then:

1. Edit `~/.claude/skills/study-guide/SKILL.md` to fix it. Be specific: don't add "make it
   better," add "flashcard answers must be one sentence max."
2. `/exit` and start a fresh `claude` session (edits don't apply to a running session).
3. Run the same test again and compare.

Do at least one full loop of this. Professionals do this constantly — a skill is never
"done," it's "good enough for now, improved when it annoys you."

## 🚀 Challenge (~30–60 min)

Build a **second skill for a hobby of yours**. Ideas (or invent your own):

- `playlist-notes` — writes liner notes / vibe descriptions for a playlist you describe
- `workout-planner` — builds a week's workout plan following your rules
- `beta-reader` — reviews a story chapter against your personal quality checklist
- `essay-brainstormer` — helps brainstorm college-essay angles without writing it for you

Requirements:

1. Frontmatter with a trigger-worthy `description` (what + when + real trigger words).
2. A **checklist** the agent must follow every time.
3. At least one **"Never do X"** rule (e.g. "Never rewrite the user's sentences — only
   comment on them").
4. **Prove both skills work in one session**: start a fresh `claude`, trigger one
   automatically with a natural request, then invoke the other with its slash command.

**Finish with the tooling habit** — copy your skills into the repo and push:

```bash
cd ~/Desktop/projects/my-skills
cp -R ~/.claude/skills/study-guide .
cp -R ~/.claude/skills/<your-second-skill-name> .
git add . && git commit -m "feat: study-guide and hobby skill"
gh repo create my-skills --private --source=. --push
```

(If you improve a skill later — and you will — copy it over again and commit. That's your
skill history building up.)

## ✅ Show a parent

Demo, live:

1. A fresh session where a *natural request* triggers one skill automatically.
2. The other skill invoked as a slash command.

Then explain, in your own words:

3. What's the difference between putting instructions in CLAUDE.md and putting them in a
   skill? When would you choose each?
4. What part of SKILL.md decides whether the skill loads automatically?

## 🆘 If you get stuck

- **Claude acts like the skill doesn't exist** → skills load at session start. `/exit`,
  run `claude` again, try again.
- **Still not triggering automatically** → the description is the trigger. Does it contain
  the actual words you used in your request? Compare your request to your description and
  close the gap.
- **`/study-guide` says unknown command** → check the folder path character by character:
  `~/.claude/skills/study-guide/SKILL.md` — the file must be named exactly `SKILL.md`, in
  a folder named exactly like the command.
- **Weird error mentioning YAML or frontmatter** → look at the top of the file: exactly
  three dashes on their own line, settings, three dashes again. If your description
  contains a colon, wrap the whole description in "double quotes".
- **The output ignores parts of your checklist** → make the checklist items short,
  concrete, and numbered — vague items get skipped by AIs and humans alike.
- **Not sure your skill is even loading** → ask Claude directly: "which skills do you have
  available right now?" — agents can describe their own toolbox.
