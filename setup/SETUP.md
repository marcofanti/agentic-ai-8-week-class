# Setup — Getting Your Mac Ready

> On a Windows PC? Use [SETUP_WINDOWS.md](SETUP_WINDOWS.md) instead. Same steps, Windows
> commands.

Work through this top to bottom. Every step ends with a **✓ Verify** command — run it and
make sure you see what's expected before moving on. If a verify step fails, stop and fix it
(or ask for help) before continuing. Total time: roughly 60–90 minutes.

> Copy-paste tip: commands appear in boxes like this:
> ```bash
> echo "hello"
> ```
> Copy the whole line, paste into Terminal, press Enter.

## 0. Terminal basics (10 min)

Open **Terminal** (press `Cmd+Space`, type "Terminal", Enter). This window talks directly
to your Mac. You only need five commands to start:

| Command | What it does | Example |
|---|---|---|
| `pwd` | "Where am I?" — prints current folder | `pwd` |
| `ls` | Lists what's in the current folder | `ls` |
| `cd` | Moves into a folder | `cd Documents` |
| `cd ..` | Moves up one folder | `cd ..` |
| `mkdir` | Makes a new folder | `mkdir projects` |

Practice: make a `projects` folder on your Desktop — you'll keep all course work there.

```bash
cd ~/Desktop
mkdir -p projects
```

**✓ Verify:** `ls ~/Desktop` shows `projects` in the list (and you can see the folder on
your actual Desktop).

## 1. Homebrew (10 min)

Homebrew is the app store for terminal tools. Everything else installs through it.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It will ask for your Mac password (typing shows nothing — that's normal) and at the end it
may print "Next steps" commands starting with `echo` and `eval` — **run those too**.

**✓ Verify:** `brew --version` prints a version number.

## 2. Git + GitHub account (15 min)

Git tracks every version of your work. GitHub stores it online under *your* name — this is
the start of a portfolio you'll have for years.

```bash
brew install git
git config --global user.name "Christina Fanti"
git config --global user.email "YOUR_EMAIL_HERE"
git config --global init.defaultBranch main
```

Then create your GitHub account at [github.com/signup](https://github.com/signup) using
the same email. Install GitHub's command-line tool and log in (choose HTTPS, log in via
browser):

```bash
brew install gh
gh auth login
```

**✓ Verify:** `git --version` prints a version, and `gh auth status` says you're logged in.

## 3. uv — our Python toolkit (10 min)

`uv` manages everything Python: installing Python itself, creating projects, adding
packages, running code. It replaces about four older tools. You'll use it every single week.

```bash
brew install uv
```

The three commands to remember:

| Command | What it does |
|---|---|
| `uv init myproject` | Creates a new Python project folder |
| `uv add requests` | Adds a package to the project |
| `uv run main.py` | Runs your code (sets up everything automatically) |

Two-minute test drive:

```bash
cd ~/Desktop/projects
uv init uv-test
cd uv-test
uv run main.py
```

**✓ Verify:** it prints `Hello from uv-test!`. (You can delete the folder after:
`cd ~/Desktop/projects && rm -rf uv-test`)

## 4. Node.js (5 min)

Some weeks use web apps, which run on Node.

```bash
brew install node
```

**✓ Verify:** `node --version` prints a version (v22 or higher).

## 5. VS Code + extensions (10 min)

VS Code is the editor where you'll read code and see what Claude is doing.

```bash
brew install --cask visual-studio-code
```

Open VS Code, then install two extensions (click the blocks icon in the left sidebar,
search by name):

1. **Claude Code** (by Anthropic)
2. **Python** (by Microsoft)

**✓ Verify:** both extensions show "Installed" in the Extensions panel.

## 6. Claude Code (10 min)

The star of the show — the AI agent that lives in your terminal.

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Then start it and sign in when prompted (use the Claude account credentials Dad set up
for you):

```bash
claude
```

**✓ Verify:** inside Claude Code, type "hi, what folder are we in?" and it answers.
Type `/exit` to leave.

## 7. API keys — your secrets (15 min)

⚠️ **Do this step with Dad.** API keys are linked to real billing accounts.

You'll create two keys:

1. **Anthropic key** — [console.anthropic.com](https://console.anthropic.com) →
   API Keys → Create Key. (Dad: set a monthly spend limit under Billing first.)
2. **OpenAI key** — [platform.openai.com](https://platform.openai.com) →
   API Keys → Create new secret key. (Dad: set a monthly budget under Limits first.)

Store them in your shell config so every project can use them. Open the file:

```bash
open -e ~/.zshrc
```

Add these two lines at the bottom (paste your real keys between the quotes), save, close:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
```

Then reload:

```bash
source ~/.zshrc
```

**The rules** (also in the README, because they matter):
- Keys never go in code files, git, chats, screenshots, or to friends.
- If one ever leaks: tell Dad, delete the key in the console, make a new one.

**✓ Verify:** `echo $ANTHROPIC_API_KEY | cut -c1-10` prints the first 10 characters of
your key (`sk-ant-...`), and the same works for `$OPENAI_API_KEY`.

## 8. Smoke test — everything at once (5 min)

This proves the whole chain works: uv → Python → the Anthropic API → your key.

```bash
cd ~/Desktop/projects
uv init hello-agent
cd hello-agent
uv add anthropic
```

Now start `claude` in that folder and ask:

> Write a short main.py that uses the anthropic library to ask Claude for a haiku about
> learning to code, and prints it. Use the ANTHROPIC_API_KEY from the environment.

Then run what it wrote:

```bash
uv run main.py
```

**✓ Verify:** a haiku appears in your terminal. 🎉

You're fully set up. Head to [Week 1](../week1-setup-and-first-agent/LAB.md).
