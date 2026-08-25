# Week 8 — Capstone: Your Own Goal-Driven Agent

This is the week everything was building toward. No new tools, no new concepts to memorize
— just you, everything you've learned, and a project *you* choose. This lab is different
from the others: it's spread across the whole week, like a real software project. Ready?

## 🔧 Tooling habit (5–10 min)

Before anything else, pull the latest class materials (labs get fixes and updates
between weeks):

```bash
cd ~/Desktop/agentic-ai-8-week-class
git pull
```

One last time — and this week the habit *is* the method. Create the capstone repo now:

```bash
cd ~/Desktop/projects
uv init capstone
cd capstone
git add -A
git commit -m "chore: capstone project start"
gh repo create capstone --private --source=. --push
```

(If your capstone extends `finance-app` instead, work in `~/Desktop/projects/finance-app` and skip
the `uv init` — everything else still applies.)

New rule for a multi-day project: **one branch per work session, one commit (at least) at
the end of every session.** Before each session:

```bash
git switch main && git pull
git switch -c session-1   # then session-2, session-3...
```

After each session:

```bash
git add -A
git commit -m "feat: <what this session actually got working>"
git push -u origin session-1
```

That way every day starts clean and every day's progress is saved. This is exactly how
professionals run week-long projects.

## 🎯 Goal

Design, spec, build, and demo an [agent](../GLOSSARY.md) that pursues a real goal you care
about — using every skill from the last seven weeks — and prove it works with your own
[evals](../GLOSSARY.md).

## 📖 Concepts (~15 min)

### Tasks vs. goals

Everything you've asked an agent for so far was mostly a *task*: "write a file," "add a
card to the dashboard," "fix this bug." A task has a clear finish line built in.

A **goal** is bigger and fuzzier: "help me study 30 minutes a day," "help me compare
colleges." There's no single file to write. To pursue a goal, an agent has to run the loop
you built in Week 4, but one level up: **plan → break the goal into steps → execute a step
→ verify it worked → adjust the plan → repeat.** That top part — turning a fuzzy goal into
concrete, checkable steps — is called **goal decomposition**, and it's the skill that
separates "AI that chats" from "AI that gets things done." You've been watching Claude
Code do it all course (that's what [plan mode](../GLOSSARY.md) shows you). This week you
design an agent around it on purpose.

### Your evals ARE the finish line

Here's the trap with goals: without a way to measure success, a goal is just a wish. "Help
me study" — did it? How would you know? That's why Week 7 comes right before Week 8. The
3–5 evals you'll write in your spec *are* the definition of "done." Not "it seems to
work," not "the demo went okay" — your evals pass, or the capstone isn't finished. Write
them before you build, and building becomes a matter of turning red into green.

### Agency vs. autonomy — you must choose

One more design decision, and it's yours to make deliberately: **how much should your
agent do without checking in?** An agent that asks permission for every step is safe but
exhausting. An agent that runs fully on its own is powerful but can go confidently in the
wrong direction — you've seen both this course. There's no universally right answer; there
is a right answer *for your project*. A study buddy quizzing you should just run. An agent
touching your finance-app's data, or publishing anything, should stop and ask. Your spec
template has a line for this — fill it in on purpose, not by accident.

## 🛠️ Guided exercise

### Part A — Write the spec (~60 min, before any building)

Professionals don't start typing on day one of a project — they write a short **spec** and
get it reviewed. That's your first session. Pick **ONE** capstone from this menu:

1. **Study-Buddy Agent** — for a real class you're taking right now. It ingests your
   actual notes, quizzes you on them, and tracks your weak topics in a file so it gets
   smarter about *you* over time. Draws on: your Week 5 study-guide skill, Week 2
   CLAUDE.md, Week 7 evals. The most personal option — you'll actually use it.

2. **College-Search Research Agent** — you give it your criteria (size, majors, location,
   cost...), it researches schools and produces a comparison report you'd genuinely show
   Mom and Dad. Draws on: [subagents](../GLOSSARY.md) doing parallel research,
   [MCP](../GLOSSARY.md) tools from Week 6, Week 2 prompting precision.

3. **Hobby App with an agentic feature** — an app about anything you love, your design,
   with one hard requirement: it must contain at least one real [agent
   loop](../GLOSSARY.md) (plan → act → verify → adjust), not just a single AI call.
   Draws on: Week 3 app-building, Week 4 agent loops. The most creative freedom — which
   also makes it the easiest one to overscope.

4. **Finance-App upgrade** — extend your Week 3 app with an AI feature, like a
   spending-insights agent that reads the transactions and explains where the money goes.
   Draws on: Weeks 3, 4, and 7. ⚠️ **Honest warning: this is the hardest option** —
   you're wiring an agent into an existing codebase. Pick it only if Week 3 felt easy.

Chosen? Now copy [`AGENT_SPEC_TEMPLATE.md`](AGENT_SPEC_TEMPLATE.md) into your capstone
repo as `SPEC.md` and fill in every section — goal, tools, skills, the scope fence, your
evals, the demo script, and a session plan. The template explains each part. Two rules:

- **Write it yourself.** Claude can *review* your spec ("what's unclear or risky about
  this spec?") but the decisions are yours — that's the whole point.
- **Dad signs off before you build.** This is a real **design review**: walk him through
  the spec, answer his questions, adjust, get the sign-off line signed. Every serious team
  works this way, and it will save you from the #1 capstone killer: too big a scope.

Commit the signed spec: `git add SPEC.md && git commit -m "docs: capstone spec, approved"`.

### Part B — Build it (3–4 sessions across the week)

Run each session the same way:

1. **Branch + goal.** New branch (Tooling habit above), then say out loud — or write at
   the top of a `JOURNAL.md` — one sentence: "by the end of this session, X works."
   Sessions with a goal finish; sessions without one wander.
2. **Plan mode first.** Start `claude`, describe the session goal, and make it propose a
   plan *before* touching files — exactly like Week 2. Read the plan. Push back.
3. **Build with everything you've got.** Your Week 5 skills and slash commands if they
   fit; MCP servers from Week 6 where they genuinely help (research, docs — remember
   Context7); your CLAUDE.md doing the standing-instructions work.
4. **Evals are the finish line.** As soon as a feature exists, run the relevant eval from
   your spec — Week 7 style, LLM-as-judge included if that's what your spec says. Red
   means the session isn't done, or the scope was too big (see 🆘).
5. **Commit and push.** Even if it's half-done — "wip:" commits are allowed mid-week.

**When to let Claude run vs. when to steer:** let it run on things you can verify cheaply
(code you'll immediately test, formatting, boilerplate). Steer closely — plan mode,
small steps, read the diffs — on anything touching your data files, your existing app, or
design decisions you named in the spec. If you notice it drifting from the spec, press
`Esc` and redirect. The spec outranks the agent. It outranks *you*, too, until you
consciously decide to change it — and if you do, update `SPEC.md` and tell Dad.

## 🚀 Challenge

The challenge this week *is the build*: **make every success measure in your spec pass.**
That's the bar. When (not if) you get there, pick **one** stretch:

- **One stretch feature** — something from your "does NOT do" list that you now have time
  to promote into scope. One. Update the spec first.
- **Package it for a stranger.** Write a `README.md` so good that someone who has never
  met you could clone the repo and run your agent: what it is, what it needs (including
  which API keys, *never* the keys themselves), exact setup commands, one example of it
  working. Then test it honestly: have Dad follow it letter by letter on a fresh terminal.

## ✅ Show a parent

This one's bigger than usual — it's **demo day**. Schedule 20 minutes with the family.

1. **The demo (10 min).** Follow the demo script from your spec — don't wing it. Show the
   agent pursuing its goal live, show one eval running and passing, and narrate what the
   agent is deciding as it works. If something breaks live, debug it out loud — that's
   more impressive than a demo that works.
2. **The retro (written, then shared).** Every real project ends with a retrospective.
   Write yours in `RETRO.md` — honest answers, full sentences:
   - What worked better than expected?
   - What would you do differently if you started over?
   - What surprised you about how agents behave?
   - What do you want to build next?
   Commit it. It's the last file of the course.

---

Christina — look at what just happened. Eight weeks ago you were installing a terminal and
learning what `cd` does. Since then you've shipped a website, built a quiz game and taught
Claude your house rules, taken over a codebase you'd never seen, **built an agent from
scratch in Python**, packaged your own skills, plugged agents into the outside world with
MCP, built an eval harness with one AI grading another — and now you've specced, built,
evaluated, and demoed a goal-driven agent of your own design. That sequence — *spec it,
build it, prove it works* — is the actual job. Most adults working in software today can't
do what you just did with agents. This isn't the end of a course; it's the beginning of
whatever you decide to build next. Congratulations. 🎓

## 🆘 If you get stuck

- **The golden rule of capstones: scope down, don't give up.** Behind schedule mid-week?
  Don't push harder on everything — cut something. Move a feature to the "does NOT do"
  list, shrink an eval, make the data smaller (3 schools, not 10; one chapter of notes,
  not the whole semester). A small agent that *works and passes its evals* beats a big one
  that almost does, every single time. Cutting scope is a pro move, not a failure — update
  `SPEC.md` and keep going.
- **Can't pick from the menu** → which one would you still use in a month? Pick that.
  Still tied? Option 1 is the safest great choice.
- **Spec is taking forever** → you're probably writing implementation details. The spec
  says *what* and *how you'll know*; the *how* belongs to the build sessions. Sixty
  minutes, then design review, done.
- **A session went sideways and the code is a mess** → this is why sessions live on
  branches. `git switch main`, start a fresh branch, and re-attempt with a smaller session
  goal and a fresh Claude session. Nothing is lost; the messy branch is still there.
- **Your evals keep failing** → is it the agent, or the eval? Read the failing output like
  a Week 3 bug report: expected vs. actually saw. Sometimes the eval is wrong — fixing an
  eval is legal, *lowering the bar to sneak past it* is lying to yourself.
- **Claude keeps doing more than you asked** → back to plan mode, smaller steps, and
  remind it of the scope fence: paste the "does NOT do" list from your spec into the
  conversation. Better yet, put it in CLAUDE.md.
- **Truly, completely stuck** → that's what the design reviewer is for. Show Dad your
  session goal, what you tried, and the exact error or output. Asking for help with
  specifics is a professional skill — you've been practicing it for eight weeks.
