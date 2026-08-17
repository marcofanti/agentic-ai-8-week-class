# Week 3 — Coaching Notes (parent only)

## What success looks like

- `~/Desktop/projects/finance-app` exists as her own git repo, pushed to GitHub, with commits on
  a `week3-lab` branch: import, feature, style, and fix (≥4 commits).
- The app runs; her savings-goal card shows in the Insights panel with a correct
  percentage; her color theme is applied across pages.
- She found the dashboard bug **by observation**, reported it as a symptom ("I see $NaN
  where the total balance should be"), and can retell: what she saw → how she reported it
  → what the cause was → why `npm run build` would have caught it.
- She can say what `package.json`, `src/pages/`, `src/components/`, and `src/hooks/` are
  for, in her own words.

## The planted bug (read before the lab)

This is deliberate. Do not fix it, and don't let her see this file.

- **File:** `src/pages/Dashboard.tsx`, line 67
- **Planted:** `const totalBalance = DEMO_ACCOUNTS.reduce((sum, a) => sum + a.balance);`
- **Correct:** `const totalBalance = DEMO_ACCOUNTS.reduce((sum, a) => sum + a.balance, 0);`
- **Symptom:** the "Total Balance" in the dashboard's blue welcome banner renders as
  **"$NaN"**. Everything else on the page is fine. (Real total: $124,589.25.)
- **Why:** `reduce` without an initial value uses the *first array element* — a whole
  account object, not a number — as the starting accumulator. Object + number produces
  garbage, and the currency formatter turns garbage into `NaN`.
- **The teaching moment:** `npm run dev` runs the buggy code happily (Vite doesn't
  type-check while serving), but `npm run build` runs the TypeScript compiler (`tsc -b`)
  and **fails** on this line. That's the Challenge bonus question: machines can catch
  whole categories of mistakes before any user sees them. This seeds Week 7 (evals,
  automated checking).

**Heads-up:** while adding the savings-goal card in Part C, Claude may notice and offer to
fix the bug on its own (it's editing the same file). If that happens, don't fight it —
pivot: have her ask Claude what it found and why, then still do the Challenge's step 3–4
(explain the cause; the `npm run build` question). The reporting skill can be practiced on
any visual nitpick from her styling round. If you want to preserve the hunt, suggest she
tell Claude "only make the change I asked for; don't fix anything else" — itself a good
steering lesson.

## Before the lab (your prep, ~15 min)

- Verify Node works on her machine: `node --version` (anything ≥18 is fine).
- Optionally dry-run yourself: copy the app somewhere, `npm install && npm run dev`,
  log in with a fake email, and look at the $NaN so you know exactly what she's hunting.
- Know the layout: `pages/` (HomePage, LoginPage, SignupPage, Dashboard, etc.),
  `hooks/useAuth.tsx` (mock auth via localStorage), `components/ErrorBoundary.tsx`.
- Enjoyable sidebar you should be ready for: the lab pokes at "any password logs you in —
  never do this for real." The mock auth stores `{name, email}` in localStorage and never
  checks the password. Good 5-minute chat about why real auth needs a server.

## Where kids typically get stuck

1. **Copying the app** — the course folder path has spaces; if she free-hands the `cp`
   command it'll fail. The lab has her `cd` into the week folder first; keep her on rails.
2. **Two terminals** — the dev server must keep running in one tab while `claude` runs in
   another. If the browser goes dead, the dev server tab got closed or Ctrl+C'd.
3. **Committing `node_modules`** — the lab creates `.gitignore` *before* `npm install`.
   If `git status` ever shows thousands of files, the `.gitignore` step got skipped.
4. **Vague steering in Part C/D** — she says "it looks weird" and Claude flails. Push her
   to the formula: *where*, *expected*, *actual*. This is the week's core skill.
5. **The bug hunt** — she may stare past the $NaN because the page "looks professional."
   See hint escalation below. She should NOT hunt by reading code; the lab wants her
   hunting in the browser like a user.
6. **Guessing causes instead of reporting symptoms** — "I think the database is broken"
   (there is no database). Redirect: report only what's on the screen; let the agent find
   the cause.

## Hint escalation (don't jump to answers)

For the bug hunt, in order:

1. "What's the first number you'd check at a real bank?"
2. "Read the blue banner at the top out loud, word for word."
3. "Is $NaN an amount of money?" (Only if she's truly stalled — this basically hands it
   over.)

Never reveal the file, the line, or that it's a missing `0` — finding *that* is Claude's
job, and watching the agent trace symptom → cause is the payoff.

For everything else, same ladder as Week 1: read the error aloud → paste it into Claude
and ask for an explanation → sit down and drive together.

## Discussion upgrades (if she's flying)

- **`git diff`** after Part C: show her exactly what lines Claude changed for her feature.
  Reinforces that agent work is inspectable, not magic.
- **Break it on purpose:** after the fix, have her ask Claude to run `npm run build`, then
  temporarily remove the `, 0` again and run it once more to *see* the type error message.
  Machines catching bugs, live.
- **NaN rabbit hole:** "what is NaN and how does adding an object to a number produce it?"
  A genuinely fun JavaScript story.
- **Stretch feature:** the "Payments" and "Insights" tabs in the nav do nothing. Have her
  spec one as a real feature request (what should it show? where does the data come from?)
  and let Claude build it. Specifying a feature precisely is the Week 8 capstone muscle.
- **Ask her:** "the app said 'Member FDIC' and took any password. What's the difference
  between looking trustworthy and being trustworthy?" — seeds the security thinking the
  course returns to in Weeks 6–7.
