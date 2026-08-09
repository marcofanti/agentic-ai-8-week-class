"""Week 7 reference eval harness (parent answer key — not for copying wholesale).

Runs each task in evals/tasks.json through a mini agent (Anthropic API with
calculator + read_file tools), scores "exact" tasks in plain Python, sends
"judged" tasks to an OpenAI judge, and prints a scoreboard.

Run from the mini-agent project root (needs `uv add anthropic openai` done once,
and ANTHROPIC_API_KEY + OPENAI_API_KEY in the environment):

    uv run eval_harness_reference.py
"""

import json
import os
import sys
from pathlib import Path

import anthropic
import openai

for key in ("ANTHROPIC_API_KEY", "OPENAI_API_KEY"):
    if not os.environ.get(key):
        sys.exit(
            f"{key} is not set. Add it to ~/.zshrc (see setup/SETUP.md step 7), "
            "then open a new terminal and try again."
        )

AGENT_MODEL = "claude-sonnet-5"
JUDGE_MODEL = "gpt-5-mini"  # Model names change! If this errors, ask Claude
                            # for the current cheapest OpenAI model.

SYSTEM_PROMPT = (
    "You are a helpful assistant with tools. Use the calculator for any "
    "arithmetic instead of computing in your head. Answer briefly and directly."
)

TOOLS = [
    {
        "name": "calculator",
        "description": "Evaluate an arithmetic expression, e.g. '2350 * 0.17'.",
        "input_schema": {
            "type": "object",
            "properties": {"expression": {"type": "string"}},
            "required": ["expression"],
        },
    },
    {
        "name": "read_file",
        "description": "Read a text file in this project and return its contents.",
        "input_schema": {
            "type": "object",
            "properties": {"path": {"type": "string"}},
            "required": ["path"],
        },
    },
]

# Used only when evals/tasks.json doesn't exist yet, so the harness always runs.
FALLBACK_TASKS = [
    {"id": "percent-1", "type": "exact",
     "question": "What is 17% of 2350?", "expected_contains": "399.5"},
    {"id": "add-1", "type": "exact",
     "question": "What is 1234 + 8766?", "expected_contains": "10000"},
    {"id": "summary-1", "type": "judged",
     "question": "Read pyproject.toml and summarize it in one sentence.",
     "criteria": "One sentence that accurately describes what the file declares."},
    {"id": "explain-1", "type": "judged",
     "question": "In two sentences, what does the calculator tool do?",
     "criteria": "At most two sentences, accurately describes evaluating arithmetic."},
]


def run_tool(name: str, tool_input: dict) -> str:
    """Execute one tool call and return the result (or an error message)."""
    if name == "calculator":
        expression = tool_input["expression"]
        if not set(expression) <= set("0123456789.+-*/() %"):
            return f"Error: unsupported characters in {expression!r}"
        try:
            return str(eval(expression, {"__builtins__": {}}, {}))  # safe: chars vetted
        except Exception as error:
            return f"Error: {error}"
    if name == "read_file":
        target = Path(tool_input["path"]).resolve()
        if not target.is_relative_to(Path.cwd()):
            return "Error: can only read files inside this project"
        try:
            return target.read_text()[:5000]
        except OSError as error:
            return f"Error: {error}"
    return f"Error: unknown tool {name!r}"


def run_agent(client: anthropic.Anthropic, question: str) -> str:
    """The Week 4 mini-agent loop: think -> tool -> observe -> repeat."""
    messages = [{"role": "user", "content": question}]
    for _ in range(10):  # safety cap on loop turns
        response = client.messages.create(
            model=AGENT_MODEL, max_tokens=1024, system=SYSTEM_PROMPT,
            tools=TOOLS, messages=messages,
        )
        if response.stop_reason != "tool_use":
            return "".join(b.text for b in response.content if b.type == "text")
        messages.append({"role": "assistant", "content": response.content})
        results = [
            {"type": "tool_result", "tool_use_id": block.id,
             "content": run_tool(block.name, block.input)}
            for block in response.content if block.type == "tool_use"
        ]
        messages.append({"role": "user", "content": results})
    return "Error: agent hit the 10-turn limit"


def judge_answer(client: openai.OpenAI, task: dict, answer: str) -> tuple[bool, str]:
    """Ask the judge model for a strict PASS/FAIL verdict plus a reason."""
    prompt = (
        "You are a strict grader. Grade the ANSWER against the CRITERIA.\n"
        "Reply with exactly PASS or FAIL on the first line, "
        "then a one-sentence reason on the second line.\n\n"
        f"QUESTION: {task['question']}\nCRITERIA: {task['criteria']}\n"
        f"ANSWER: {answer}"
    )
    reply = client.chat.completions.create(
        model=JUDGE_MODEL, messages=[{"role": "user", "content": prompt}],
    )
    lines = (reply.choices[0].message.content or "").strip().splitlines() or ["FAIL (judge gave no reply)"]
    verdict = lines[0].strip().upper()
    reason = lines[1].strip() if len(lines) > 1 else "(no reason given)"
    return verdict.startswith("PASS"), reason


def main() -> None:
    tasks_file = Path("evals/tasks.json")
    if tasks_file.exists():
        tasks = json.loads(tasks_file.read_text())
    else:
        print("evals/tasks.json not found — using the 4 built-in sample tasks.\n")
        tasks = FALLBACK_TASKS

    agent = anthropic.Anthropic()
    judge = openai.OpenAI()
    passed = 0

    for task in tasks:
        answer = run_agent(agent, task["question"])
        if task["type"] == "exact":
            ok = task["expected_contains"] in answer
            reason = f"expected {task['expected_contains']!r} in answer"
        else:
            ok, reason = judge_answer(judge, task, answer)
        passed += ok
        mark = "✓" if ok else "✗"
        print(f"  {mark} {task['id']}" + ("" if ok else f"  — {reason}"))
        if not ok:
            print(f"      agent said: {answer[:120]!r}")

    print(f"\nScore: {passed}/{len(tasks)}")


if __name__ == "__main__":
    main()
