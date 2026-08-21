# Glossary

Plain-language definitions, in alphabetical order. If a lab uses a word you don't know and
it's not here, that's a bug — tell Dad and we'll add it.

**.env file** — A tiny text file of `KEY=value` lines holding a project's secrets, like
API keys. Git is told to ignore it (via `.gitignore`), and your code loads it at startup
with the `python-dotenv` package. Its shareable twin, `.env.example`, has the same shape
with fake values and is safe to commit.

**Agent** — An AI that doesn't just answer questions, but takes *actions* to reach a goal:
reading files, running commands, calling tools, checking its results, and trying again.
Chat AI answers; agentic AI *does*.

**Agent loop** — The cycle every agent runs: think about the goal → pick a tool → use it →
look at what happened → repeat until done. You'll build one yourself in Week 4.

**API (Application Programming Interface)** — A way for programs to talk to each other.
When your Python script asks Claude a question, it's using the Anthropic API.

**API key** — A secret password that identifies *you* to an API and bills *your* account.
Treat it like a debit card number.

**Branch (git)** — A parallel line of work in your project. You make changes on a branch,
and when they're good, they join the main line. Lets you experiment without breaking things.

**Capstone** — A final project that uses everything you learned. Yours is Week 8.

**CLAUDE.md** — A file of standing instructions Claude Code reads every time it starts in
your project. Like a note taped to the fridge: "we do things this way here."

**Commit (git)** — A saved snapshot of your project with a message describing what changed.
Your project's "save points."

**Context / context window** — Everything the AI can "see" right now: your conversation,
files it has read, instructions. It's large but limited — like short-term memory. When it
fills up, older stuff falls out.

**Eval (evaluation)** — A test for AI behavior. You define tasks with known-good answers,
run the AI, and score it. It's how professionals know whether a change made the AI better
or worse. Week 7 is all about this.

**Hook** — An automatic check that runs when the agent does something — for example,
"every time Claude edits a Python file, run the tests." Guardrails that don't rely on
anyone remembering.

**LLM (Large Language Model)** — The kind of AI model that powers Claude, ChatGPT, and
Gemini. It predicts text, and it turns out that's enough to reason, write code, and use
tools.

**LLM-as-judge** — Using one AI model to grade another's answers. Sounds like cheating,
works surprisingly well, used everywhere in industry. You'll do it in Week 7.

**MCP (Model Context Protocol)** — A standard way to plug outside tools and data into an
AI agent. Like a USB port: any tool that speaks MCP works with any agent that speaks MCP.

**MCP server** — One pluggable tool package that speaks MCP — for example "web search" or
"read my calendar."

**Plan mode** — A Claude Code mode where the agent *proposes* what it would do and waits
for your approval before touching anything. Great for big or risky changes.

**Prompt** — What you say to an AI. "Prompting" well — being specific about what you want
and how to judge success — is a real skill, and it's Week 2.

**Repository (repo)** — A project folder tracked by git, with its full history. GitHub
hosts repos online.

**Skill** — A reusable instruction package you write once and Claude loads whenever it's
relevant. Like teaching the agent a recipe it remembers forever. Week 5.

**Slash command** — A shortcut you define, like `/study-guide`, that runs a saved prompt
in Claude Code. Week 5.

**Subagent** — An agent launched by another agent to handle a piece of work — like a boss
delegating to teammates, several of whom can work at the same time.

**TDD (Test-Driven Development)** — Writing the test *before* the code, then writing code
until the test passes. Turns "looks right" into "provably right." Agents are very good at
this loop.

**Terminal** — The text window where you type commands to your computer directly. Feels
old-school, is actually where the power is.

**Token** — The chunks (roughly word-pieces) an LLM reads and writes. API usage is billed
per token, and the context window is measured in tokens.

**Tool (for an agent)** — One specific ability the agent can invoke: read a file, run a
command, search the web. The agent's "hands." You'll write your own tools in Week 4.

**uv** — The fast, modern tool we use for all Python projects: it installs Python,
manages packages, and runs your code. Your three commands: `uv init`, `uv add`, `uv run`.

**Version control** — Keeping the full history of a project so you can see what changed,
when, and why — and undo anything. Git is the version control system everyone uses.
