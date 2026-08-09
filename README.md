# Agentic AI with Claude Code — an 8-Week Course

Welcome, Christina! 👋

Over the next 8 weeks you're going to learn how **AI agents** work — not just how to chat
with an AI, but how to make one *do real work for you*: write programs, explore codebases,
connect to outside tools, and even check its own work. By the end you'll build your own
agent from scratch and run a capstone project you design yourself.

You don't need to be a programmer to start. You *will* be closer to one when you finish.

## How the course works

- **One lab per week**, each takes about 2–4 hours. Do it in one sitting or split it up.
- Each week has its own folder with a `LAB.md` — that's your instruction sheet.
- The `solutions/` folders are **for Dad** (coaching notes and answers). No peeking —
  struggling a little is where the learning happens. If you're truly stuck, the lab has an
  "If you get stuck" section with hints.

## Every lab follows the same shape

| Section | Time | What it is |
|---|---|---|
| 🔧 Tooling habit | 5–10 min | Start a git branch, sync your project, end with a commit — every week, so it becomes automatic |
| 🎯 Goal | 1 min | One sentence: what you'll be able to do afterward |
| 📖 Concepts | ~15 min | The ideas, in plain language |
| 🛠️ Guided exercise | 60–90 min | Step-by-step build |
| 🚀 Challenge | 30–60 min | Open-ended — your creativity required |
| ✅ Show a parent | 5 min | Demo + explain what you learned |
| 🆘 If you get stuck | — | Hints (not answers) |

## The 8 weeks

- [ ] **Week 1 — Setup & your first agent** ([lab](week1-setup-and-first-agent/LAB.md))
      Install everything, learn the terminal basics, and watch an AI agent build you a website.
- [ ] **Week 2 — Prompting, context & steering** ([lab](week2-prompting-and-context/LAB.md))
      Learn why *how you ask* changes everything. Build a Python quiz game.
- [ ] **Week 3 — Working in a real codebase** ([lab](week3-lowcode-build-an-app/LAB.md))
      Take over a real web app you didn't write. Add features without writing code yourself.
- [ ] **Week 4 — How agents actually work** ([lab](week4-how-agents-work/LAB.md))
      Build a mini AI agent from scratch in Python. Seriously. You can do this.
- [ ] **Week 5 — Skills & slash commands** ([lab](week5-skills-and-slash-commands/LAB.md))
      Teach your agent new abilities it remembers forever.
- [ ] **Week 6 — MCP: connecting agents to the world** ([lab](week6-mcp-connecting-tools/LAB.md))
      Plug your agent into outside tools and data — the "USB port" for AI.
- [ ] **Week 7 — Evals: how do you know it's good?** ([lab](week7-evals-and-agent-loops/LAB.md))
      Build a grading system for AI, including having one AI grade another.
- [ ] **Week 8 — Capstone: your own goal-driven agent** ([lab](week8-capstone-goal-driven-agent/LAB.md))
      Design, spec, build, and demo an agent that matters to *you*.

Check the boxes as you finish. Words you don't know are defined in the
[GLOSSARY](GLOSSARY.md).

## Before Week 1

Do the [setup checklist](setup/SETUP.md). It's part of Week 1's lab, so you can also just
start there.

## Safety rules (the serious page)

These aren't optional. AI agents are powerful because they *do things* — which means they
can also do the wrong thing. Professionals follow these rules too.

1. **Permission prompts exist for a reason.** When Claude Code asks "Can I run this
   command?", read it. If you don't understand what a command does, ask Claude to explain
   it *before* approving — that's a totally normal thing to ask.
2. **API keys are secrets.** They're linked to real money. They never go in your code, in
   git, in a chat message, in a screenshot, or to a friend. They live in your `.env` file
   or shell config, nowhere else.
3. **If a key leaks** (you accidentally committed or pasted it): tell Dad, then go to the
   API console and delete/rotate the key. Leaked keys get found by bots in minutes — speed
   matters, embarrassment doesn't.
4. **Spend limits are set** on both API accounts. If something stops working with a
   "quota" or "billing" error, that's the safety net doing its job — talk to Dad.
5. **New MCP servers need Dad's OK first.** They give your agent new powers, and not every
   server on the internet is trustworthy.
6. **Never point an agent at real accounts** (email, banking, school portal) without
   talking it through with Dad first.

## License

This course is dual-licensed:

- **Course content** (labs, notes, glossary, guides) —
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Code** (finance-app, reference scripts) — [MIT](LICENSE-MIT)

See [LICENSE](LICENSE) for details.
