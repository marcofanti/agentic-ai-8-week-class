"""A minimal AI agent, built from scratch — reference implementation for Week 4.

Setup (inside a uv project):
    uv add anthropic
    uv run mini_agent_reference.py

Reads ANTHROPIC_API_KEY from the environment (it's exported in ~/.zshrc).

The whole agent is three pieces:
  A. TOOLS      — a list telling the model what tools exist
  B. run_tool   — plain Python that actually executes a tool
  C. run_agent  — the loop: think -> pick tool -> act -> observe -> repeat
"""

import os
import sys

import anthropic

MODEL = "claude-sonnet-5"

if not os.environ.get("ANTHROPIC_API_KEY"):
    sys.exit(
        "ANTHROPIC_API_KEY is not set. Add it to ~/.zshrc (see setup/SETUP.md step 7), "
        "then open a new terminal and try again."
    )

# --- Piece A: the TOOLS list ------------------------------------------------
# Each tool = a name + a description + a schema for its input.
# The model reads the descriptions to DECIDE when to use each tool.

TOOLS = [
    {
        "name": "calculator",
        "description": (
            "Evaluate a simple math expression like '2350 * 0.17'. "
            "Only numbers and + - * / ( ) are supported."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {"type": "string", "description": "The math to evaluate"}
            },
            "required": ["expression"],
        },
    },
    {
        "name": "read_file",
        "description": "Read a text file from the current folder and return its contents.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "File name, e.g. 'pyproject.toml'"}
            },
            "required": ["path"],
        },
    },
    {
        "name": "save_note",
        "description": "Append one line of text to notes.txt so it's saved for later.",
        "input_schema": {
            "type": "object",
            "properties": {
                "text": {"type": "string", "description": "The note to save"}
            },
            "required": ["text"],
        },
    },
]

# --- Piece B: the code that actually runs -----------------------------------
# The model NEVER runs code itself. It only asks. This function does the work.


def run_tool(name, tool_input):
    """Execute one tool call and return the result as a string."""
    if name == "calculator":
        expression = tool_input["expression"]
        if not set(expression) <= set("0123456789+-*/(). "):
            return "Error: only numbers and + - * / ( ) are allowed."
        try:
            return str(eval(expression))  # safe here: input was filtered to math characters
        except (SyntaxError, ZeroDivisionError) as error:
            return f"Error: {error}"

    if name == "read_file":
        try:
            with open(tool_input["path"], encoding="utf-8") as f:
                return f.read()
        except OSError as error:
            return f"Error: {error}"

    if name == "save_note":
        with open("notes.txt", "a", encoding="utf-8") as f:
            f.write(tool_input["text"] + "\n")
        return "Note saved."

    return f"Error: unknown tool '{name}'"


# --- Piece C: the agent loop ------------------------------------------------


def run_agent(task):
    client = anthropic.Anthropic()  # picks up ANTHROPIC_API_KEY automatically
    messages = [{"role": "user", "content": task}]

    while True:  # think -> pick tool -> act -> observe -> repeat
        response = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            tools=TOOLS,
            messages=messages,
        )

        # Plain-text answer means the model is done. Exit the loop.
        if response.stop_reason != "tool_use":
            for block in response.content:
                if block.type == "text":
                    print("\nClaude:", block.text)
            return

        # The model asked for tools. First, keep its request in the history...
        messages.append({"role": "assistant", "content": response.content})

        # ...then ACT: run each requested tool and collect the results.
        results = []
        for block in response.content:
            if block.type == "tool_use":
                print(f"→ tool: {block.name}  input: {block.input}")
                output = run_tool(block.name, block.input)
                print(f"← result: {output[:80]!r}")
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,  # must match the model's request id
                    "content": output,
                })

        # OBSERVE: send the results back, then loop around and think again.
        messages.append({"role": "user", "content": results})


if __name__ == "__main__":
    run_agent(
        "Read pyproject.toml, then calculate 17% of 2350, "
        "and save both results as a note."
    )
