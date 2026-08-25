# Week 6 — MCP: Connecting Your Agent to the World

## 🔧 Tooling habit (5–10 min)

Before anything else, pull the latest class materials (labs get fixes and updates
between weeks):

```bash
cd ~/Desktop/agentic-ai-8-week-class
git pull
```

This week you'll work inside your **quiz game** project from Week 2 (if you'd rather use
your Week 4 mini-agent repo, that works too). Start the ritual:

```bash
cd ~/Desktop/projects/quiz-game
git checkout main
git pull
git checkout -b week6-lab
```

Anything you produce this week — code changes, your server proposal — gets committed on
this branch, and you'll push at the end. Same as always. That's why it's a habit.

## 🎯 Goal

Plug a new tool into Claude Code using MCP, use it to do something the agent *couldn't do
reliably before*, and learn how to judge whether a server from the internet deserves to be
plugged in at all.

## 📖 Concepts (~15 min)

### Tools are hands — and today you buy new ones

In Week 4 you learned that an agent is a loop — think → pick a tool → act → observe →
repeat — and that [tools](../GLOSSARY.md) are the agent's *hands*. Claude Code ships with
a starter set: read files, write files, run commands, search the web.

But what about hands nobody built in? Read your calendar. Control a browser. Look up
today's version of a library's documentation. That's what
[MCP](../GLOSSARY.md) — the **Model Context Protocol** — is for.

### MCP is the USB-C port for agents

Before USB existed, every gadget had its own weird plug, and every computer needed a
different adapter for each one. USB fixed that with one standard port: any device, any
computer, one plug.

AI tools had the same problem. Before MCP, connecting an agent to, say, GitHub meant
someone writing custom glue code for *that agent* and *that service* — and again for every
other pair. MCP is the standard plug. An [MCP server](../GLOSSARY.md) is one pluggable
package of tools someone published — "web browsing," "library docs," "read my files in
Google Drive." Any server that speaks MCP works with any agent that speaks MCP. Publish
once, plug in anywhere. That's why standards matter.

### Why this is exactly where the safety rules live

Notice what you're really doing when you add a server: **giving your agent new powers**,
written by a stranger on the internet. A docs-lookup server is harmless. A server that can
read your email or spend money is not something you plug in casually — and a sketchy
server could misuse anything it can touch.

That's why the course [README](../README.md) says: **new MCP servers need Dad's OK
first.** This week you'll practice the skill behind that rule — evaluating whether a tool
deserves your trust. Professionals do this every time they add a dependency.

## 🛠️ Guided exercise (~90 min)

### Part A — What's already plugged in? (10 min)

From your project folder (not inside Claude — this is a regular terminal command):

```bash
claude mcp list
```

Probably empty or close to it. That's your agent's "ports" panel — every server plugged in
shows up here. Remember this command; it's how you always answer "what extra powers does
my agent have right now?"

### Part B — Plug in Context7 (20 min)

We'll add **Context7**, a server that fetches *current* documentation for programming
libraries. Dad has already approved this one (rule 5!) and checked the command below.

Why this server first? Claude's built-in knowledge comes from its training data, which has
a cutoff date — like a textbook printed last year. Libraries keep changing after the book
was printed. Context7 gives the agent a hand that reaches for today's docs instead.

```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

Reading that command: `--transport http` means the server runs on the internet and Claude
talks to it over the web (the other kind, *stdio*, is a program that runs on your own
machine — you may meet one in the challenge). `context7` is just the name you're giving
it, and the URL is where it lives.

One more idea: **scope** — *where* does this plug apply?

- `--scope local` (the default, what you just did): this project only.
- `--scope user`: all your projects.
- `--scope project`: saved to a `.mcp.json` file in the repo, shared with teammates.

Default-to-one-project is a nice safety habit: new powers start small. Now verify:

```bash
claude mcp list
```

You should see `context7` with a ✓ Connected. (Inside Claude, `/mcp` shows the same
thing.) If it shows an error or asks about an API key, pause and grab Dad — that's covered
in his notes.

### Part C — The before/after moment (45 min)

Time to feel the difference. Start Claude in your quiz game project:

```bash
claude
```

**Before** — ask from memory (no tools):

> Without looking anything up, what do you know about printing colored text with the
> Python `rich` library? How confident are you that it's current?

Read the answer. Notice the hedging — "as of my training data..." That's the textbook
talking.

**After** — same question, new hands:

> using context7, look up the current documentation for printing colored and styled text
> with the rich library

Watch the tool calls scroll by — that's your agent using its new hand, one turn of the
same old agent loop. Compare the two answers. Fresh docs vs. year-old memory.

Now make it real:

> Using what you just looked up with context7, add colored output to my quiz game: green
> for correct answers, red for wrong ones, and a styled title screen. Explain your plan
> first, then do it.

Play a round. Then commit:

```bash
git add -A
git commit -m "feat: colored quiz output using rich (docs via context7 MCP)"
```

## 🚀 Challenge (~30–60 min)

**The shopping trip.** Go browse what's out there:

- Official reference servers: <https://github.com/modelcontextprotocol/servers>
- Community mega-list: <https://github.com/punkpeye/awesome-mcp-servers>

Pick **one** server you genuinely want. Not the first one — one that would actually make
your agent better *for you*.

Then write `proposal.md` in your repo — exactly 5 lines:

1. **What it does:**
2. **Who publishes it:**
3. **Why I want it:**
4. **What it gets access to:**
5. **Why I believe it's safe:**

Commit it, then **pitch it to Dad out loud**. He gets to ask questions and say yes or no —
and "no, and here's why" still counts as completing the challenge, because *the pitch is
the exercise*. Evaluating tools is the skill; installing them is just typing.

If approved: install it (Dad checks the command with you), then demo **one real use** —
something your agent genuinely could not do this morning.

Finish the ritual:

```bash
git push -u origin week6-lab
```

## ✅ Show a parent

1. Explain MCP to someone who's never heard of it — your own words, your own version of
   the USB analogy.
2. Run `claude mcp list` and explain what each entry is and what scope means.
3. Demo one thing your agent can do now that it couldn't do last week.

## 🆘 If you get stuck

- **`claude mcp add` errors out** → read the message slowly; then run `claude mcp list`
  to see what state you're in. A server added wrong can be removed with
  `claude mcp remove context7` and added again.
- **`claude mcp list` shows the server but not connected** → check the URL for typos
  (one wrong letter breaks it), and check your internet. Still failing? Dad has notes on
  this exact situation.
- **Claude answers without using Context7** → say the magic words: start your prompt with
  "using context7, ...". If it still doesn't, ask Claude directly: "what MCP tools do you
  have available right now?"
- **Can't pick a challenge server** → flip the question: what's something you do every
  week that your agent can't touch yet? Look for a server near *that*.
- **Your proposal feels thin** → that's information! If you can't fill in "who publishes
  it" or "what it gets access to," you've just discovered why the answer might be no.
