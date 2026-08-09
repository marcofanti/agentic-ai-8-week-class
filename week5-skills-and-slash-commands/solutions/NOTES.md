# Week 5 — Coaching Notes (parent only)

## What success looks like

- Two working skills under `~/.claude/skills/`: `study-guide` plus a hobby skill, each
  with valid frontmatter (`name`, `description`) and a checklist; the hobby skill has at
  least one "Never do X" rule.
- She demos both trigger paths live: a natural request loads a skill automatically, and
  `/skill-name` invokes the other on demand — in the same fresh session.
- She did at least one iterate loop on `study-guide`: spotted a flaw in the output, edited
  the skill text (not the prompt), re-tested in a fresh session, and can say what changed.
- She can articulate: CLAUDE.md = always-on house rules (costs context every turn, keep
  short); skill = on-demand expertise for a repeated task (loads only when the description
  matches); the description is the trigger.
- `my-skills` repo on GitHub with the skills committed on branch `week5-lab`.

## Before the lab (your prep, ~15 min)

- The single biggest quality lever is **real notes**. Help her get one class's notes into
  a markdown/text file before she starts — a photo-to-text pass or 10 minutes of typing.
  Fake notes make Step 5 (iteration) pointless because she won't care about the flaws.
- Skim her `~/.claude/` folder first: if a stray `skills/` already exists from
  experimenting, know what's in it so a name collision doesn't confuse the test.
- Have a hobby-skill idea conversation queued in case she blanks. The best pick is
  something she already does weekly and has opinions about — opinions become checklist
  items and "never" rules almost verbatim.

## Where kids typically get stuck

1. **YAML frontmatter typos** — two dashes instead of three, a missing closing `---`, or a
   colon inside the description ("Use when: studying") without quotes around the value.
   Symptom: the skill silently doesn't exist or errors oddly. Fix: eyeball the top 5 lines
   of the file, quote the description.
2. **Skill doesn't trigger automatically** — almost always a **too-narrow description**.
   "Makes study guides from bio notes" won't fire on "help me review for my history quiz."
   Coach the formula: what it does + when to use it + the actual words she'd say (study,
   review, test, quiz, flashcards). Don't fix it for her — have her compare her request
   text to her description text and find the missing words herself.
3. **Testing in a stale session** — she edits SKILL.md and re-asks in the same session,
   sees no change, concludes it's broken. Skills load at session start: `/exit`, `claude`,
   retry. Expect to say this more than once; it's the week's reflex to build.
4. **Folder/name mismatch** — folder `study_guide` but expecting `/study-guide`, or the
   file named `skill.md` / `SKILLS.md`. Path must be
   `~/.claude/skills/<skill-name>/SKILL.md`, exactly.
5. **Recipe vs. essay** — a body that's one long paragraph of vibes. Claude follows
   numbered steps and short checklist items far better. If output ignores her intent, the
   fix is usually structure, not more words.
6. **Confusing the two trigger paths** — she may think the slash command is "the skill"
   and automatic loading is magic. Anchor it: description = Claude chooses; slash command
   = she chooses; same recipe either way.

## Hint escalation (don't jump to answers)

1. "Show me the exact top of your SKILL.md and the exact path to it." (Most bugs die here.)
2. "Say your test request out loud, then read your description out loud. Do they share any
   words?"
3. "Did you start a fresh session after editing?"
4. Only then: sit down and drive together — and let *her* type the fix.

## Discussion upgrades (if she's flying)

- **`$ARGUMENTS` in anger**: have her add `$ARGUMENTS` to the study-guide body ("focus
  extra on: $ARGUMENTS") and try `/study-guide photosynthesis` — parameters make commands
  feel like real tools.
- **Project vs. personal**: move a copy of a skill into one of her project repos under
  `.claude/skills/` and discuss why a team would commit skills to a shared repo (everyone's
  agent gets the same training). Connects directly to how professionals use this.
- **Skills all the way down**: point out that the course itself is behaving like a skill
  library — CLAUDE.md from Week 2, skills now, hooks in the glossary. Ask: "what's a task
  Dad does at work every week that would be a skill?" — teaching it back is the test.
- **Seed Week 7**: ask "how would you *prove* the new version of your skill is better than
  the old one, not just different?" She'll hand-wave; that hand-wave is exactly what evals
  (Week 7) replace.
