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

Now grab the class repo — every week's lab and starter files live in it. Clone it onto your
Desktop, right next to `projects` (OneDrive users: `cd ~\OneDrive\Desktop`):

```powershell
cd ~\Desktop
git clone https://github.com/marcofanti/agentic-ai-8-week-class.git
```

**✓ Verify:** `git --version` prints a version, `gh auth status` says you're logged in, and
`ls ~\Desktop\agentic-ai-8-week-class` lists the week folders.

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

**Save both in your password manager** (1Password, Bitwarden, whichever your family uses)
as a secure note called "Course API keys". That's the master copy. You'll copy from it
into each project that needs keys.

**How projects use them — the `.env` pattern.** Each project that talks to an API gets its
own `.env` file: a two-line text file holding the keys, which git is told to ignore. Your
Python code loads it at startup. You'll repeat the same three moves in every project that
needs keys:

1. Create a `.env` file in the project folder (keys copied from your password manager):

   ```
   ANTHROPIC_API_KEY=sk-ant-your-real-key-here
   OPENAI_API_KEY=sk-your-real-key-here
   ```

2. Make sure git ignores it — *before* the first commit:

   ```powershell
   Add-Content .gitignore ".env"
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

> **Why not set the keys globally** (with `setx`, or the "environment variables" advice
> you'll see online)? Because Claude Code looks for a global `ANTHROPIC_API_KEY`, and when
> it finds one it switches from your Claude subscription to pay-per-use API billing.
> Per-project `.env` files keep each key exactly where it's needed and nowhere else —
> which is also just better security.

**The rules** (also in the README, because they matter):
- Keys never go in code files, git, chats, screenshots, or to friends.
- `.env` goes into `.gitignore` in every project, every time — before the first commit.
- If a key ever leaks: tell Dad, delete the key in the console, make a new one.

**✓ Verify:** both keys are saved in your password manager, and you can explain to Dad
what a `.env` file is and why git must ignore it. (The real test is next — the smoke test.)

## 8. Smoke test — everything at once (10 min)

This proves the whole chain works: uv → Python → your `.env` → the Anthropic API.

```powershell
cd ~\Desktop\projects
uv init hello-agent
cd hello-agent
uv add anthropic python-dotenv
git init
```

Create this project's `.env` — your first one. This opens a new file in VS Code:

```powershell
code .env
```

Paste the two key lines from your password manager (the format from step 7), save, close.
Then tell git to ignore it, and prove that it worked:

```powershell
Add-Content .gitignore ".env"
git check-ignore .env
```

If that prints `.env`, git will never commit your keys. If it prints nothing, stop and fix
`.gitignore` before going on.

Now start `claude` in that folder and ask:

> Write a short main.py that loads my .env file with python-dotenv, then uses the
> anthropic library to ask Claude for a haiku about learning to code, and prints it.

Then run what it wrote:

```powershell
uv run main.py
```

**✓ Verify:** a haiku appears in your terminal, and `git check-ignore .env` prints `.env`. 🎉

You're fully set up. Head to [Week 1 (Windows version)](../week1-setup-and-first-agent/LAB_WINDOWS.md).

## Mac → Windows translation table

The labs write commands Mac-style. When you hit one of these, translate:

| The lab says | You type | Why |
|---|---|---|
| `open index.html` | `start index.html` | Opens a file in its default app |
| `open -e somefile` | `notepad somefile` | Opens a file in a text editor |
| `code somefile` | `code somefile` (works as-is) | Opens a file in VS Code |
| `cat .env` | `type .env` | Shows a file's contents |
| `echo ".env" >> .gitignore` | `Add-Content .gitignore ".env"` | Appends a line to a file |
| new Terminal tab: `Cmd+T` | new tab: `Ctrl+Shift+T` | Windows Terminal shortcut |
| `rm -rf folder` | `Remove-Item -Recurse -Force folder` | Deletes a folder (careful!) |
| `command1 && command2` | run them as two separate lines | PowerShell may not know `&&` |
| `brew install thing` | `winget install thing` | The terminal app store |
| `~/Desktop/projects/...` (slashes) | works as-is (or use `\`) | PowerShell accepts both |

Everything else — `git`, `gh`, `uv`, `npm`, `claude`, `cd`, `ls`, `mkdir`, `cp -r` — works
exactly as written.
