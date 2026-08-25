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

Now grab the class repo — every week's lab and starter files live in it. Clone it onto your
Desktop, right next to `projects`:

```bash
cd ~/Desktop
git clone https://github.com/marcofanti/agentic-ai-8-week-class.git
```

**✓ Verify:** `git --version` prints a version, `gh auth status` says you're logged in, and
`ls ~/Desktop/agentic-ai-8-week-class` lists the week folders.

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

Now set up the `code` command so you can open files and folders in VS Code straight from
the terminal:

1. In VS Code, press `Cmd+Shift+P` to open the Command Palette.
2. Type `shell command`.
3. Select **Shell Command: Install 'code' command in PATH** and press Enter.
4. Enter your Mac password if asked.
5. **Restart your terminal** (quit and reopen) for the change to take effect.

From now on you can type `code somefile.txt` to open a file in VS Code, or `code .` to
open the current folder.

**✓ Verify:** both extensions show "Installed" in the Extensions panel, and running
`code --version` in a fresh terminal prints a version number.

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

**Save both in your password manager** (1Password, Apple Passwords, Bitwarden — whichever
your family uses) as a secure note called "Course API keys". That's the master copy.
You'll copy from it into each project that needs keys.

**How projects use them — the `.env` pattern.** Each project that talks to an API gets its
own `.env` file: a two-line text file holding the keys, which git is told to ignore. Your
Python code loads it at startup. This is how professionals do it, and you'll repeat the
same three moves in every project that needs keys:

1. Create a `.env` file in the project folder (keys copied from your password manager):

   ```
   ANTHROPIC_API_KEY=sk-ant-your-real-key-here
   OPENAI_API_KEY=sk-your-real-key-here
   ```

2. Make sure git ignores it — *before* the first commit:

   ```bash
   echo ".env" >> .gitignore
   ```

3. Load it in Python with the `python-dotenv` package: `uv add python-dotenv`, then at the
   very top of the script:

   ```python
   from dotenv import load_dotenv
   load_dotenv()
   ```

There's a template at [.env.example](.env.example) — projects often ship a file like this:
same shape, fake values, safe to commit. Copy it into a project as `.env` and fill in the
real keys.

> **Why not set the keys globally** (the "add exports to `~/.zshrc`" advice you'll see
> online)? Because Claude Code looks for a global `ANTHROPIC_API_KEY`, and when it finds
> one it switches from your Claude subscription to pay-per-use API billing. Per-project
> `.env` files keep each key exactly where it's needed and nowhere else — which is also
> just better security.

**The rules** (also in the README, because they matter):
- Keys never go in code files, git, chats, screenshots, or to friends.
- `.env` goes into `.gitignore` in every project, every time — before the first commit.
- If a key ever leaks: tell Dad, delete the key in the console, make a new one.

**✓ Verify:** both keys are saved in your password manager, and you can explain to Dad
what a `.env` file is and why git must ignore it. (The real test is next — the smoke test.)

## 8. Smoke test — everything at once (10 min)

This proves the whole chain works: uv → Python → your `.env` → the Anthropic API.

```bash
cd ~/Desktop/projects
uv init hello-agent
cd hello-agent
uv add anthropic python-dotenv
git init
```

Create this project's `.env` — your first one. This opens a new file in VS Code:

```bash
code .env
```

Paste the two key lines from your password manager (the format from step 7), save, close.
Then tell git to ignore it, and prove that it worked:

```bash
echo ".env" >> .gitignore
git check-ignore .env
```

If that prints `.env`, git will never commit your keys. If it prints nothing, stop and fix
`.gitignore` before going on.

Now start `claude` in that folder and ask:

> Write a short main.py that loads my .env file with python-dotenv, then uses the
> anthropic library to ask Claude for a haiku about learning to code, and prints it.

Then run what it wrote:

```bash
uv run main.py
```

**✓ Verify:** a haiku appears in your terminal, and `git check-ignore .env` prints `.env`. 🎉

You're fully set up. Head to [Week 1](../week1-setup-and-first-agent/LAB.md).
