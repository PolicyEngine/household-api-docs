"""Write src/utils/pythonGuideUsOutputs.js from runs of the /us/python examples.

usage (from the repository root, with the Python that ran the examples):
  python scripts/python-guide/write_outputs.py <workdir>/outputs.json [more outputs.json ...]

run_examples.py writes one outputs.json per run. When you pass several, a
later file's record for a block replaces an earlier one's. The module this
writes holds, for each block, exactly what the block printed:

- A Python block contributes its stdout. A block that raised, or printed
  nothing, gets no entry, and the page shows no output for it.
- A bash block contributes each command's stdout under a "# <command>" line,
  cut to its first five lines when longer (the header then says so). A block
  with any command that exited non-zero gets no entry.
- The decile chart: when the run that recorded visualization.deciles left
  us-decile-impacts-chart.png in its work folder, the chart goes to
  public/python-guide/ and the module names it.

The writer refuses to write anything when an output it would publish matches
the names of the US dataset Microcosm replaced or Microcosm's pre-August name
(RETIRED_NAMES below, the pattern PolicyEngine/ai-inequality checks pages
for). Change the example instead of trimming its output.
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
MODULE = REPO / "src/utils/pythonGuideUsOutputs.js"
CHART_NAME = "us-decile-impacts-chart.png"
CHART_PUBLIC = REPO / "public/python-guide" / CHART_NAME
CHART_URL = f"/python-guide/{CHART_NAME}"
BASH_MAX_LINES = 5

RETIRED_NAMES = re.compile(
    r"populace|enhanced[\s_-]*(?:cps|current[\s_-]*population[\s_-]*survey)"
    r"|\be[\s_-]?cps\b|policyengine[\s_-]*us[\s_-]*data",
    re.IGNORECASE,
)


def python_output(record):
    if record.get("error"):
        return None, "raised"
    text = (record.get("stdout") or "").rstrip("\n")
    if not text.strip():
        return None, "printed nothing"
    return text, None


def bash_output(record):
    commands = record.get("commands") or []
    if not commands:
        return None, "ran no commands"
    failed = [c["command"] for c in commands if c["returncode"] != 0]
    if failed:
        return None, f"exited non-zero: {failed[0]}"
    sections = []
    for command in commands:
        lines = command["stdout"].rstrip("\n").splitlines()
        if not lines:
            sections.append(f"# {command['command']}  (prints nothing)")
        elif len(lines) > BASH_MAX_LINES:
            sections.append(
                "\n".join(
                    [f"# {command['command']}  (first {BASH_MAX_LINES} lines)"]
                    + lines[:BASH_MAX_LINES]
                    + ["..."]
                )
            )
        else:
            sections.append("\n".join([f"# {command['command']}"] + lines))
    return "\n\n".join(sections), None


def package_versions(python):
    code = (
        "import importlib.metadata as m;"
        "print(m.version('policyengine'), m.version('policyengine-us'))"
    )
    out = subprocess.run(
        [python, "-c", code], capture_output=True, text=True, check=True
    ).stdout.split()
    return {"policyengine": out[0], "policyengineUs": out[1]}


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("outputs", nargs="+", type=Path)
    parser.add_argument(
        "--python",
        default=sys.executable,
        help="the Python that ran the examples (default: this one)",
    )
    args = parser.parse_args()

    records, folders, order = {}, {}, []
    for path in args.outputs:
        path = path.resolve()
        blocks = path.parent / "blocks.json"
        if blocks.exists():
            for block in json.loads(blocks.read_text()):
                if block["id"] not in order:
                    order.append(block["id"])
        for block_id, record in json.loads(path.read_text()).items():
            records[block_id] = record
            folders[block_id] = path.parent
            if block_id not in order:
                order.append(block_id)

    outputs, skipped = {}, {}
    for block_id in order:
        record = records.get(block_id)
        if record is None:
            skipped[block_id] = "did not run"
            continue
        text, reason = (bash_output if "commands" in record else python_output)(record)
        if text is None:
            skipped[block_id] = reason
        else:
            outputs[block_id] = text

    leaks = {k: RETIRED_NAMES.search(v).group(0) for k, v in outputs.items() if RETIRED_NAMES.search(v)}
    if leaks:
        for block_id, match in leaks.items():
            print(f"refusing: {block_id} prints {match!r}", file=sys.stderr)
        sys.exit(1)

    images = {}
    deciles = records.get("visualization.deciles")
    if deciles is not None and not deciles.get("error"):
        chart = folders["visualization.deciles"] / CHART_NAME
        if chart.exists():
            shutil.copyfile(chart, CHART_PUBLIC)
            images["visualization.deciles"] = CHART_URL
    if "visualization.deciles" in outputs and not images:
        skipped["visualization.deciles (chart)"] = "left no chart"

    finished = max(
        (r["finished_at"] for k, r in records.items() if k in outputs or k in images),
        default=None,
    )
    run = {**package_versions(args.python), "lastBlockFinishedAt": finished}

    def js(value):
        return json.dumps(value, indent=2, ensure_ascii=False)

    MODULE.write_text(
        "// Generated by scripts/python-guide/write_outputs.py; do not edit by hand.\n"
        "// What each US example on /us/python printed when run_examples.py ran it\n"
        f"// with policyengine {run['policyengine']} and policyengine-us {run['policyengineUs']}.\n"
        "// A block with no entry raised, printed nothing, or didn't run, and the\n"
        "// page shows no output for it.\n\n"
        f"export const PYTHON_GUIDE_US_RUN = {js(run)};\n\n"
        f"export const PYTHON_GUIDE_US_OUTPUTS = {js(outputs)};\n\n"
        f"export const PYTHON_GUIDE_US_IMAGES = {js(images)};\n"
    )
    print(f"wrote {len(outputs)} outputs and {len(images)} chart(s) to {MODULE.relative_to(REPO)}")
    for block_id, reason in skipped.items():
        print(f"no output for {block_id}: {reason}")


if __name__ == "__main__":
    main()
