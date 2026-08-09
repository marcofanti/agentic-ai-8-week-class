# Week 1 — Setup & Your First Agent

## 🔧 Tooling habit (this week: first time!)

This week the "habit" section *is* part of the lab — you'll set up the tools. From Week 2
on, every lab starts with the same 5-minute ritual: make a git branch, sync, and commit at
the end. By Week 8 you won't even think about it. That's the point.

## 🎯 Goal

Get your machine fully set up, and watch an AI agent build and publish a real website for
you — so you *feel* the difference between an AI that talks and an AI that acts.

## 📖 Concepts (~15 min)

### Chat AI vs. agentic AI

You've used ChatGPT or Claude in a browser: you ask, it answers, and then... *you* do all
the work. Copy the code, make the file, run it, hit an error, paste the error back. You're
the hands; the AI is only the brain.

An **agent** has hands. Claude Code can:

- **read** your files to understand your project,
- **write** and edit files itself,
- **run** commands and see the output,
- and — this is the key part — **look at what happened and try again** if it didn't work.

That last step is called the **agent loop**: think → act → observe → repeat. You'll study
it properly in Week 4 and build your own. This week, you just watch it happen.

One more difference that matters: the agent asks **permission** before doing anything
risky. Those permission prompts are your steering wheel — read them.

### What's an API key, and why is it a secret?

Some of our labs make Python programs that talk to Claude directly over the **API** — a
doorway programs use to talk to other programs. The **API key** is what proves the request
comes from *you*, and it's connected to real billing. Which is why the setup treats keys
like a debit card number: environment variables only, never in code, never in git, never
in a chat. (Full rules in the [README](../README.md).)

## 🛠️ Guided exercise (~90 min)

### Part A — Setup (60–75 min)

Work through the entire [setup checklist](../setup/SETUP.md), including the smoke test at
the end. Don't skip the **✓ Verify** steps — the whole course depends on this foundation.

Done? You now have: a terminal you're not scared of, Homebrew, git + your own GitHub
account, uv, Node, VS Code, Claude Code signed in, and two API keys stored safely.

### Part B — Watch an agent work (30 min)

1. Make a project folder and start the agent:

   ```bash
   cd ~/projects
   mkdir my-website
   cd my-website
   claude
   ```

2. Give it this prompt (or your own version — make the site about you):

   > Create a single-file personal website (index.html, everything inline) about me. I'm
   > Christina. Sections: a short intro, my interests, and a "currently learning" section
   > that mentions AI agents. Make it look modern and fun.

3. **Don't just wait — watch.** Notice the things scrolling by: Claude is *using tools* —
   `Write` to create the file, maybe `Read` to check its work. Every one of those lines is
   one turn of the agent loop. When a permission prompt appears, read it before approving.

4. Open the result:

   ```bash
   open index.html
   ```

   Your website, in your browser, and you didn't write a line of HTML.

5. Now put it on GitHub — your first commit. Back in the terminal (type `/exit` to leave
   Claude, or open a second Terminal tab):

   ```bash
   git init
   git add index.html
   git commit -m "feat: my first agent-built website"
   gh repo create my-website --private --source=. --push
   ```

   Go to github.com and look — your code, online, under your name. That repo will still
   be there when you're applying for internships.

## 🚀 Challenge (~30 min)

Back in `claude`, redesign the site **three times**, one prompt each. Ideas:

1. "Make it look like a retro terminal — green text on black."
2. "Redesign it in the style of a fancy magazine."
3. Your call — the weirder the better.

After each redesign, refresh the browser. Then pick your favorite and commit it
(`git add -A && git commit -m "style: final design"` — then `git push`).

**Stretch:** ask Claude *"explain what you changed between the last two versions and
why"* — getting the agent to explain itself is a skill you'll use all course.

## ✅ Show a parent

Demo your website and its GitHub page, then explain, in your own words:

1. What's the difference between chatting with Claude in a browser and Claude Code?
2. What is the agent loop? (think → ? → ? → repeat)
3. Where do your API keys live, and name two places they must **never** go.

## 🆘 If you get stuck

- **A setup ✓ Verify step fails** → re-run the install command for that step and read the
  output slowly; most failures print the fix. Still stuck? That's a Dad question — setup
  problems are normal and not your fault.
- **`claude` isn't found** → close the Terminal window and open a new one (installs only
  appear in new windows), then try again.
- **The website looks broken** → tell Claude exactly *what you see*: "the heading overlaps
  the picture" beats "it's broken." Specific observations are how you steer an agent.
- **Permission prompt you don't understand** → ask Claude "explain what this command does
  and why you need it" before approving. It will happily explain.
