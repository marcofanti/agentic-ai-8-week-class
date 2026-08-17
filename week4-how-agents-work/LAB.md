# Week 4 — How Agents Actually Work: Build One From Scratch

## 🔧 Tooling habit (5–10 min)

New week, new project, same ritual. In your terminal:

```bash
cd ~/Desktop/projects
uv init mini-agent
cd mini-agent
git init
git add -A
git commit -m "chore: new project from uv init"
git switch -c week4-lab
```

You'll do your work on the `week4-lab` branch. At the **end** of the lab, come back and run:

```bash
git add -A
git commit -m "feat: my first agent built from scratch"
gh repo create mini-agent --private --source=. --push
git push -u origin week4-lab
```

## 🎯 Goal

Build a working AI [agent](../GLOSSARY.md) in about 60 lines of Python — and in doing so,
understand exactly what Claude Code is doing every time you use it. After today, agents
stop being magic and start being a loop you could write yourself. Because you did.

## 📖 Concepts (~15 min)

### The agent loop

You met this idea in Week 1: think → act → observe → repeat. Here's the full picture of the
[agent loop](../GLOSSARY.md):

```
        ┌─────────────────────────────────┐
        │                                 │
        ▼                                 │
   ┌─────────┐    ┌───────────┐    ┌──────────┐
   │  THINK  │───▶│ PICK TOOL │───▶│   ACT    │
   │ (model) │    │  (model)  │    │(your code│
   └─────────┘    └───────────┘    │ runs it!)│
        ▲                          └──────────┘
        │         ┌───────────┐         │
        └─────────│  OBSERVE  │◀────────┘
                  │ (result → │
                  │   model)  │
                  └───────────┘

   ...repeat until the model answers in plain text. Done.
```

Every agent — Claude Code, the fancy ones at AI companies, the one you build today — is
this loop. The differences are just *which tools* and *how good the model is*.

### Tools are the agent's hands

A [tool](../GLOSSARY.md) is three things: a **name**, a **description** (so the model knows
when to use it), and a **Python function** that does the work. That's it. "Read a file" is
a tool. "Search the web" is a tool. Today you'll write three of your own.

### The big secret: the model never runs code

This is the part most people get wrong. Claude does not reach into your computer. When
Claude "uses a tool," what actually happens is:

1. The [API](../GLOSSARY.md) sends back a message that says, in effect, *"please run the
   tool called `calculator` with input `2350 * 0.17` and tell me what you get."*
2. **Your Python program** — your ordinary, boring while-loop — runs the function.
3. Your program sends the result back to the model as the next message.

The model *asks*. Your loop *does*. That's also why permission prompts are possible: the
loop can just... decline to run something.

### Subagents, in one paragraph

Claude Code has one more trick: it can launch copies of itself as
[subagents](../GLOSSARY.md) — each one is its own agent loop, and several can run at the
same time, like a boss delegating to teammates. Same loop, just nested. Nothing new to
learn; it's loops all the way down.

## 🛠️ Guided exercise (~90 min)

### Part 1 — Watch the loop with new eyes (~15 min)

Start Claude Code inside your project:

```bash
cd ~/Desktop/projects/mini-agent
claude
```

Give it a multi-step task:

> Count the lines in every file in this project and write the results into a summary.md
> file, sorted from largest to smallest.

**Your job is to narrate.** Say out loud (yes, really) what each scrolling tool call is:
"that's a *pick tool* — it chose Bash... that's the *act*... now it's *observing* the
output... it's thinking again... new tool call..." Every line you see is one lap around
the loop diagram above. When it finishes with a plain-text answer — that's the loop
exiting. Then type `/exit`.

### Part 2 — Build your own agent (~75 min)

You're going to build `agent.py` with three tools: a **calculator**, a **read_file** tool,
and a **save_note** tool that appends to `notes.txt`. Claude Code can help you type it,
but *you* need to understand every piece — so read this architecture walk-through first.

**Step 1 — install the SDK** (the official Python library for talking to Claude):

```bash
uv add anthropic
```

**Step 2 — understand the three pieces.** Your whole agent is:

**Piece A: the `TOOLS` list.** A plain Python list describing your three tools so the
model knows they exist. Each entry looks like this:

```python
TOOLS = [
    {
        "name": "calculator",
        "description": "Evaluate a simple math expression like '2350 * 0.17'.",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {"type": "string", "description": "The math to evaluate"}
            },
            "required": ["expression"],
        },
    },
    # ...then read_file and save_note, same shape
]
```

The description matters — it's how the model *decides* when to use the tool.

**Piece B: a `run_tool` function.** Ordinary Python: "if the name is `calculator`, do the
math; if it's `read_file`, open the file; if it's `save_note`, append a line to
`notes.txt`." This is the only place code actually executes.

**Piece C: the loop itself.** The heart of the whole lab:

```python
while True:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        tools=TOOLS,
        messages=messages,
    )
    if response.stop_reason != "tool_use":
        break                      # plain-text answer → we're done
    messages.append({"role": "assistant", "content": response.content})
    # ...run each requested tool, print "→ tool: <name>",
    # ...send back the results as tool_result blocks
```

`stop_reason == "tool_use"` is the model raising its hand: *"I want a tool."* Your loop
runs it, appends the result, and goes around again.

**Step 3 — build it with Claude Code.** Start `claude` and give it this:

> Help me write agent.py — a minimal AI agent using the anthropic Python SDK and the
> model claude-sonnet-5. It needs: a TOOLS list with three tools (calculator: evaluate a
> simple math expression; read_file: return a file's text; save_note: append a line to
> notes.txt), a run_tool function that executes them, and a while-loop that calls
> client.messages.create with tools=TOOLS, handles stop_reason == "tool_use", sends back
> tool_result blocks, and stops when the answer is plain text. Print a log line like
> "→ tool: calculator" every time a tool runs, so I can watch the loop. No classes —
> keep it simple, under about 100 lines. Explain each section to me as you write it.

Read what it writes. If any piece doesn't match the three pieces above, ask why.

**Step 4 — the test drive.** Put a task at the bottom of `agent.py` (or ask Claude to):

> Read pyproject.toml, then calculate 17% of 2350, and save both results as a note.

Then run it:

```bash
uv run agent.py
```

Now watch your terminal:

```
→ tool: read_file
→ tool: calculator
→ tool: save_note
```

That's it. That's the whole magic trick — and it's *your* loop printing those lines.
Check `notes.txt`. The note is there because *your* function wrote it, exactly when the
model asked. This is the moment the magic dies and the understanding starts.

**One more thing:** this loop shape isn't a Claude thing. Point the same three pieces at
OpenAI's API (you have that key too) and it works the same way — different function names,
same loop. The agent loop is universal. **Stretch, if curious:** ask Claude to make an
`agent_openai.py` version and compare them side by side.

## 🚀 Challenge (~30–60 min)

Design and add a **fourth tool** — your choice. Ideas: a dice roller, a word counter, a
"look up a fact" tool that searches a little facts file you write. You'll need to touch
all three pieces: add it to `TOOLS`, handle it in `run_tool`, and then **prove Claude
actually uses it** — run a task where your new tool is the only sensible choice, and catch
its name in the log lines. If Claude ignores your tool, improve the description (that's
real prompt engineering).

**Stretch:** give it a task needing all four tools in one run.

## ✅ Show a parent

1. Run your agent live and narrate the log lines as they appear.
2. Whiteboard (paper is fine) the agent loop **from memory** — all four steps and the
   exit condition.
3. Answer this: *what do your ~60 lines and Claude Code have in common, and what's
   different?* (Hint: same loop. Claude Code just has more and better tools.)
4. Explain: when your agent "used the calculator," what actually ran the Python?

Then do the commit + push from the Tooling habit section.

## 🆘 If you get stuck

- **`ANTHROPIC_API_KEY` / authentication error** → your key isn't visible to the script.
  Run `echo $ANTHROPIC_API_KEY` (Windows: `echo $env:ANTHROPIC_API_KEY`) — if it prints
  nothing, open a new terminal window (Mac: or `source ~/.zshrc`) and try again.
- **`ModuleNotFoundError: anthropic`** → you probably ran `python agent.py`. Always
  `uv run agent.py` — uv knows about the package, plain python doesn't.
- **The loop never ends** → add a counter and stop after ~10 laps, then print
  `response.stop_reason` each lap and look at what's happening. Debugging an agent =
  reading its loop.
- **Claude never calls your tool** → the model chooses based on *descriptions*. Read
  yours like a stranger: could you tell when to use it? Make it specific.
- **`tool_use_id` errors** → every `tool_result` you send back must carry the exact `id`
  from the model's `tool_use` block — check you're copying `block.id` across.
- **Weird output but no crash** → print the whole `response` object one lap at a time and
  read it. Seeing the raw messages is half the point of this week.
