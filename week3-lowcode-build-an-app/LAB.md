# Week 3 — Working in a Real Codebase

## 🔧 Tooling habit (5–10 min)

This week you inherit an app instead of starting from scratch. First, copy it into your
own projects folder. Open Terminal, `cd` into this course folder, then:

```bash
cd week3-lowcode-build-an-app
cp -r finance-app ~/projects/finance-app
cd ~/projects/finance-app
```

Now make it a real [repository](../GLOSSARY.md) and start this week's
[branch](../GLOSSARY.md):

```bash
git init
echo "node_modules" > .gitignore
git add -A
git commit -m "chore: import finance-app starter"
git checkout -b week3-lab
```

(The `.gitignore` line tells git to skip the `node_modules` folder — thousands of
installed files that don't belong in your history.)

**At the end of the lab:** commit your work and put it on GitHub:

```bash
git add -A
git commit -m "feat: week 3 lab complete"
gh repo create finance-app --private --source=. --push
```

## 🎯 Goal

Take over a real web app you didn't write — run it, understand it, add a feature, and fix
a bug — without writing the code yourself. You direct; the [agent](../GLOSSARY.md) codes.

## 📖 Concepts (~15 min)

### Real apps are many files — and that's fine

Your Week 1 website was one file. Real apps are dozens or hundreds of files, written by
people who may have left the team years ago. Here's the secret professionals know: **nobody
reads every line.** You learn the *shape* of a codebase — what lives where — and zoom in
only where you need to. And now you have an agent that can explore the whole thing in
seconds and report back. A **codebase** is just that: all the files that make up one app,
usually in one repository.

### A codebase's shape tells you a story

Peek inside `finance-app` and you'll see a pattern you'll meet again and again:

- **`package.json`** — the app's ID card: its name, the libraries it depends on, and the
  commands it knows (like `dev` to run it and `build` to package it).
- **`src/`** — the source code. Inside it:
  - **`pages/`** — one file per screen (login page, dashboard, ...).
  - **`components/`** — reusable building blocks that pages share.
  - **`hooks/`** — reusable *logic* (like "who is logged in?") that pages share.

This app is built with **React** (the most popular library for building web interfaces —
you describe what the screen should look like, React keeps it updated) and
**TypeScript** (JavaScript plus type-checking: a proofreader that catches mistakes like
"you're doing math on something that isn't a number" *before* users ever see them).

You have not written TypeScript or React. That is exactly the point of this week.

### "Low-code": you direct, the agent codes

This week you won't type code. You'll do the parts that are actually hard: deciding *what*
to build, describing it precisely, checking the result in the browser, and steering with
specific feedback. That's what "low-code" means here — and honestly, it's a preview of
what a lot of professional software work is becoming.

## 🛠️ Guided exercise (~90 min)

### Part A — Run the app (15 min)

Install the app's dependencies (the libraries listed in `package.json`), then start it:

```bash
cd ~/projects/finance-app
npm install
```

```bash
npm run dev
```

This starts a **dev server** — a mini web server on your own machine that rebuilds the
app live as files change. Open the address it prints (something like
`http://localhost:5173`) in your browser.

You're looking at **FinanceApp**, a demo banking app. Click **Sign in** and log in with
*any* email and password — seriously, make one up. It works because the "auth" is fake:
there's no real bank and no real backend; the app just saves whoever you typed into your
browser's local storage. (Never do this in a real app — Dad will enjoy telling you why.)

Click around: accounts, transactions tab, the menus. Get a feel for what a *user* sees.
If anything catches your eye as odd — remember it. It'll matter later.

**Leave the dev server running** in this Terminal tab for the whole lab.

### Part B — Get a guided tour (20 min)

Open a **second Terminal tab** (Cmd+T), then:

```bash
cd ~/projects/finance-app
claude
```

Ask for the tour:

> Explain this codebase to me like I'm new here — what does each folder do? Walk me
> through what happens, file by file, from the moment I open the app to the moment I see
> the dashboard.

Read the answer slowly. Then dig into whatever made you curious — for example:

> How does the app know I'm logged in? Show me where that happens and explain it simply.

You just did in five minutes what used to take a new engineer their first week.

### Part C — Add a feature without writing code (35 min)

Look at the dashboard's right-hand **Insights** panel — see the "Vacation Fund" savings
goal card? You're going to add a second goal card, for something *you're* actually saving
for: concert tickets, a trip, a camera, whatever.

First decide, on paper or in your head: the goal's name, the target amount, how much is
"saved" so far. Then tell Claude — with your details filled in:

> Add a second savings-goal card to the dashboard's Insights panel, right below the
> Vacation Fund card. Mine is called "<your goal>", the target is $<amount>, and $<amount>
> is saved so far. Match the existing Vacation Fund card's style and structure exactly,
> including the progress bar and percentage.

When Claude asks permission to edit files, read what it plans to touch. When it's done,
check the browser (the dev server updates automatically). Is the percentage right? Does it
look like it belongs? If anything's off, describe *exactly what you see* and let Claude
fix it. Then save your progress:

```bash
git add -A
git commit -m "feat: add my savings goal card"
```

### Part D — Make it yours (20 min)

The blue color scheme is fine, but it's not *yours*. Design a change — you're the art
director. Pick a new accent color (or a whole vibe: dark mode? pastel? neon?), then
describe it to Claude. Be specific about *where* the color shows up:

> Change the app's color theme. Replace the blue accent everywhere it appears — the logo,
> buttons, links, the active tab — with <your color>. Keep the text readable; adjust any
> backgrounds if the contrast gets bad.

Check every page in the browser, not just the dashboard: home, login, dashboard. Steer
with specifics ("the button text is unreadable on the new color") until you'd proudly show
it to a friend. Then commit:

```bash
git add -A
git commit -m "style: my color theme"
```

## 🚀 Challenge (~30–60 min)

**Something on the dashboard is wrong.** A real user would notice it within the first five
seconds. Your mission: find it, report it, get it fixed.

The skill you're practicing is **bug reporting** — and the rule is: *describe the symptom,
not your guess about the cause.* "The page is broken" is useless. "I expected X, but I see
Y, in this exact spot" is gold — for human engineers and for agents.

1. **Find it.** Log in and look at the dashboard like a customer would. What's the first
   thing a user checks at their bank? Does what you see make sense?
2. **Report it to Claude, symptom only.** Fill in this shape:

   > There's a bug. On the dashboard, in <where exactly>, I expected to see <what a user
   > would expect> but instead I see <exactly what's on the screen, copied precisely>.
   > Find the cause, explain it to me simply, and fix it.

3. **Verify the fix** in the browser. Then make Claude prove it understands:

   > Explain what the bug was, why the code produced exactly what I saw on screen, and
   > why your fix is correct.

4. **Bonus (do this — it's the best part):** ask Claude:

   > Would `npm run build` have caught this bug before any user saw it? Why does
   > `npm run dev` happily run it anyway?

   The answer is a big idea you'll keep meeting: some mistakes can be caught by machines
   *before* the app ever runs.

Commit the fix on its own:

```bash
git add -A
git commit -m "fix: dashboard bug"
```

Then do the end-of-lab push from the Tooling habit section.

## ✅ Show a parent

1. **Demo your feature:** your savings-goal card and your color theme, live in the browser.
2. **Give the tour yourself:** in your own words, what do `package.json`, `src/pages/`,
   `src/components/`, and `src/hooks/` each do?
3. **Tell the bug story:** what did you see, how did you describe it to Claude, what was
   the cause, and why would `npm run build` have caught it?
4. And: what does "low-code" mean, if it doesn't mean "less work"?

## 🆘 If you get stuck

- **`npm install` fails** → read the last few lines of output slowly; then paste the whole
  error into Claude and ask what it means. Most install errors explain themselves.
- **The browser shows nothing** → is the dev server still running in its tab? If you
  closed it, run `npm run dev` again and use the exact address it prints.
- **"Port already in use"** → an old dev server is still alive somewhere. Close other
  Terminal tabs, or ask Claude how to find and stop it.
- **Claude's change didn't do what you wanted** → don't pile on more instructions. Say
  what you see vs. what you expected, one thing at a time. If it's really tangled:
  `git checkout -- .` throws away all uncommitted changes so you can start the step fresh
  (that's why we commit after every part!).
- **Can't find the Challenge bug** → slow down and *read the dashboard like a customer*.
  Compare every number and label to what a real bank would show. Say each one out loud —
  does it make sense?
- **Found it but the fix isn't working** → ask Claude to explain the cause *before*
  fixing, then ask what it changed afterward. Understanding beats speed.
