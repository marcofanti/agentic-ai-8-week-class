# Week 4 — Coaching Notes (parent only)

This is the flagship conceptual week. If she gets one thing from the whole course, it's
this: an agent is a while-loop that runs tools when a model asks. Everything else is
detail.

## What success looks like

- `agent.py` runs with `uv run agent.py` and the terminal shows the log lines
  `→ tool: read_file` … `→ tool: calculator` … `→ tool: save_note`, then a plain-text
  answer. `notes.txt` contains the note (17% of 2350 = 399.5).
- She can draw the loop from memory: **think → pick tool → act → observe → repeat**, and
  name the exit condition (the model answers in plain text / `stop_reason` isn't
  `tool_use`).
- She can say, unprompted, that the model never runs code — her loop does — and that
  Claude Code is "the same loop with more and better tools."
- A fourth tool of her own design exists, and she caught Claude using it in the log.
- `mini-agent` repo on GitHub with the `week4-lab` branch pushed.

A complete working version is in `mini_agent_reference.py` (runnable as-is:
`uv add anthropic python-dotenv`, a `.env` with her key, then `uv run mini_agent_reference.py` inside a uv project). Consult
it if her version goes sideways — don't hand it over.

## Before the lab (your prep, ~10 min)

- **Verify her key still works.** Quickest check: re-run the setup smoke test —
  `cd ~/Desktop/projects/hello-agent && uv run main.py` should still print a haiku. If it
  errors, sort out the `.env` (key rotated? line edited?) *before* the lab.
- **Cost check:** this lab is cheap — each full agent run is a handful of small API calls.
  Expect the whole lab, including the challenge and re-runs, to cost **cents** (well under
  a dollar). The spend limits from Week 1 cover any accident.
- Skim the LAB's "three pieces" section so you can ask her to explain them back.

## Where kids typically get stuck

1. **Key not visible to the script** — most common failure, looks like an
   `authentication_error`. It's one of three things: no `.env` in *this* project (each
   project gets its own copy), a typo or stray space in the key line, or `load_dotenv()`
   missing / called after the client is created. `cat .env` and read it slowly.
2. **`python agent.py` instead of `uv run agent.py`** — gives
   `ModuleNotFoundError: anthropic`. The uv-managed environment only activates through
   `uv run`.
3. **Conceptual: "so Claude ran my code?"** — No, and this is *the* teaching moment of
   the week. The model sent back a message that *requested* a tool; her loop executed it.
   Have her point at the exact line in her file where the function actually runs.
4. **Message bookkeeping bugs** — forgetting to append the assistant's response before
   the tool results, or sending a `tool_result` whose `tool_use_id` doesn't match the
   request's `block.id`. The API error messages here are actually decent — have her read
   them slowly.
5. **Claude ignores her challenge tool** — almost always a vague description. The fix is
   writing a better description, which is a genuinely useful lesson: the model chooses
   tools by reading English, not by magic.
6. **Part 1 gets skipped or rushed** — the narration exercise feels silly but it's what
   makes Part 2 click. If she skipped it, ask her to narrate one Claude Code task after
   the build instead.

## Hint escalation (don't jump to answers)

1. "Which of the three pieces is the problem in — the TOOLS list, run_tool, or the loop?"
2. "Print `response.stop_reason` and the whole `response` each lap. What do you actually
   see?"
3. "Paste the error into Claude Code and ask it to explain — not fix — the error."
4. Only then: open `mini_agent_reference.py` together and diff against her version.

## Discussion upgrades (if she's flying)

- **Safety hook:** her `run_tool` executes whatever the model asks. Ask: "what if a tool
  could delete files — would you run it automatically?" Let her invent permission prompts
  herself; she'll basically re-derive Claude Code's design (and Week 1's safety rules).
- **The universal loop:** if she did the OpenAI stretch, put both files side by side —
  different SDK, same skeleton. Agents are an architecture, not a product.
- **Ask her to break it:** give the agent a task no tool can do ("what's the weather?").
  Watch how the model copes — it should say it can't, or improvise. Good preview of
  Week 7's evals ("how do you *know* it behaves well?").
- **Token peek:** `print(response.usage)` inside the loop shows tokens per lap — connects
  the loop to real cost, and to the context-window idea from the glossary.
