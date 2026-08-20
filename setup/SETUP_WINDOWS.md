# Setup — Getting Your Windows PC Ready

> On a Mac? Use [SETUP.md](SETUP.md) instead. Same steps, Mac commands.

Work through this top to bottom. Every step ends with a **✓ Verify** command — run it and
make sure you see what's expected before moving on. If a verify step fails, stop and fix it
(or ask for help) before continuing. Total time: roughly 60–90 minutes.

> Copy-paste tip: commands appear in boxes like this:
> ```powershell
> echo "hello"
> ```
> Copy the whole line, paste into the terminal (right-click or `Ctrl+V`), press Enter.

One thing to know up front: the weekly labs show commands in Mac style, but almost every
command in this course (`git`, `gh`, `uv`, `claude`, `npm`) is **identical on Windows**.
The few that differ are in the [translation table](#mac--windows-translation-table) at the
bottom of this page — glance at it now, come back whenever a lab command looks Mac-flavored.

## 0. Terminal basics (10 min)

Open **Windows Terminal** (press the Windows key, type "Terminal", Enter). On Windows 11
it's built in; on Windows 10, install "Windows Terminal" from the Microsoft Store first.
It runs **PowerShell** — the window that talks directly to your PC. You only need five
commands to start:

| Command | What it does | Example |
|---|---|---|
| `pwd` | "Where am I?" — prints current folder | `pwd` |
| `ls` | Lists what's in the current folder | `ls` |
| `cd` | Moves into a folder | `cd Documents` |
| `cd ..` | Moves up one folder | `cd ..` |
| `mkdir` | Makes a new folder | `mkdir projects` |

(Yes — those are the same five commands Mac users learn. PowerShell speaks them too.)

Practice: make a `projects` folder on your Desktop — you'll keep all course work there.

```powershell
cd ~\Desktop
mkdir projects
```

> If `cd ~\Desktop` says the path doesn't exist, OneDrive has probably moved your Desktop:
> use `cd ~\OneDrive\Desktop` instead — and do the same everywhere the course says
> `~\Desktop\projects`.

**✓ Verify:** `ls ~\Desktop` shows `projects` in the list (and you can see the folder on
your actual Desktop).

## 1. winget (5 min)

`winget` is the app store for terminal tools — it's Windows' answer to Homebrew, and it
comes built into Windows. Everything else installs through it. The first time you use it,
it may ask you to accept source agreements — press `Y`.

**✓ Verify:** `winget --version` prints a version number. (If it doesn't, install
"App Installer" from the Microsoft Store, open a new terminal, and try again.)

## 2. Git + GitHub account (15 min)

Git tracks every version of your work. GitHub stores it online under *your* name — this is
the start of a portfolio you'll have for years.

```powershell
winget install --id Git.Git -e
winget install --id GitHub.cli -e
```

**Now close the terminal and open a new one** — freshly installed tools only appear in new
windows. Then:

```powershell
git config --global user.name "Christina Fanti"
git config --global user.email "YOUR_EMAIL_HERE"
git config --global init.defaultBranch main
```

Then create your GitHub account at [github.com/signup](https://github.com/signup) using
the same email, and log in with GitHub's command-line tool (choose HTTPS, log in via
browser):

```powershell
gh auth login
```

**✓ Verify:** `git --version` prints a version, and `gh auth status` says you're logged in.

## 3. uv — our Python toolkit (10 min)

`uv` manages everything Python: installing Python itself, creating projects, adding
packages, running code. It replaces about four older tools. You'll use it every single week.

```powershell
winget install --id astral-sh.uv -e
```

Open a new terminal window again, then remember the three commands:

| Command | What it does |
|---|---|
| `uv init myproject` | Creates a new Python project folder |
| `uv add requests` | Adds a package to the project |
| `uv run main.py` | Runs your code (sets up everything automatically) |

Two-minute test drive:

```powershell
cd ~\Desktop\projects
uv init uv-test
cd uv-test
uv run main.py
```

**✓ Verify:** it prints `Hello from uv-test!`. (You can delete the folder after:
`cd ~\Desktop\projects` then `Remove-Item -Recurse -Force uv-test`)

## 4. Node.js (5 min)

Some weeks use web apps, which run on Node.

```powershell
winget install --id OpenJS.NodeJS.LTS -e
```

**✓ Verify:** in a new terminal window, `node --version` prints a version (v22 or higher).

## 5. VS Code + extensions (10 min)

VS Code is the editor where you'll read code and see what Claude is doing.

```powershell
winget install --id Microsoft.VisualStudioCode -e
```

Open VS Code, then install two extensions (click the blocks icon in the left sidebar,
search by name):

1. **Claude Code** (by Anthropic)
2. **Python** (by Microsoft)

**✓ Verify:** both extensions show "Installed" in the Extensions panel.

## 6. Claude Code (10 min)

The star of the show — the AI agent that lives in your terminal.

```powershell
irm https://claude.ai/install.ps1 | iex
```

Then, in a new terminal window, start it and sign in when prompted (use the Claude
account credentials Dad set up for you):

```powershell
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

Store them as **user environment variables** so every project can use them. In the
terminal (paste your real keys between the quotes):

```powershell
setx ANTHROPIC_API_KEY "sk-ant-..."
setx OPENAI_API_KEY "sk-..."
```

`setx` saves the variable for *future* terminal windows only — so close the terminal and
open a new one before the verify step.

**The rules** (also in the README, because they matter):
- Keys never go in code files, git, chats, screenshots, or to friends.
- If one ever leaks: tell Dad, delete the key in the console, make a new one.

**✓ Verify:** `$env:ANTHROPIC_API_KEY.Substring(0,10)` prints the first 10 characters of
your key (`sk-ant-...`), and the same works for `$env:OPENAI_API_KEY`.

## 8. Smoke test — everything at once (5 min)

This proves the whole chain works: uv → Python → the Anthropic API → your key.

```powershell
cd ~\Desktop\projects
uv init hello-agent
cd hello-agent
uv add anthropic
```

Now start `claude` in that folder and ask:

> Write a short main.py that uses the anthropic library to ask Claude for a haiku about
> learning to code, and prints it. Use the ANTHROPIC_API_KEY from the environment.

Then run what it wrote:

```powershell
uv run main.py
```

**✓ Verify:** a haiku appears in your terminal. 🎉

You're fully set up. Head to [Week 1 (Windows version)](../week1-setup-and-first-agent/LAB_WINDOWS.md).

## Mac → Windows translation table

The labs write commands Mac-style. When you hit one of these, translate:

| The lab says | You type | Why |
|---|---|---|
| `open index.html` | `start index.html` | Opens a file in its default app |
| `open -e somefile` | `notepad somefile` | Opens a file in a text editor |
| `code somefile` | `code somefile` (works as-is) | Opens a file in VS Code |
| `source ~/.zshrc` | close terminal, open a new one | Reloads environment variables |
| `echo $ANTHROPIC_API_KEY` | `echo $env:ANTHROPIC_API_KEY` | Prints an environment variable |
| add lines to `~/.zshrc` | `setx NAME "value"`, then new terminal | Sets an environment variable |
| new Terminal tab: `Cmd+T` | new tab: `Ctrl+Shift+T` | Windows Terminal shortcut |
| `rm -rf folder` | `Remove-Item -Recurse -Force folder` | Deletes a folder (careful!) |
| `command1 && command2` | run them as two separate lines | PowerShell may not know `&&` |
| `brew install thing` | `winget install thing` | The terminal app store |
| `~/Desktop/projects/...` (slashes) | works as-is (or use `\`) | PowerShell accepts both |

Everything else — `git`, `gh`, `uv`, `npm`, `claude`, `cd`, `ls`, `mkdir`, `cp -r` — works
exactly as written.
