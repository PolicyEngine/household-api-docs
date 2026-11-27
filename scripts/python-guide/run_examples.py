"""Run the US examples that household-api-docs publishes on /us/python.

Each block's code comes verbatim from blocks.json (extract_blocks.mjs pulls it
from src/utils/countryDocs.js). Python blocks run in order in one shared
namespace, as a reader would run them top to bottom; bash blocks run each
command line with the venv's bin on PATH. The runner captures each block's
stdout (what the page shows) and records its stderr and timing too.

usage: python run_examples.py <workdir>/blocks.json <workdir>/outputs.json [--only id,id] [--skip id,id]

Run it with the Python of a virtual environment that has the policyengine
version the page documents installed with its us and plotting extras, plus
kaleido for the chart; the published outputs came from
`uv pip install "policyengine[us,plotting]==6.20.3" "kaleido==0.2.1"`. The examples run
in the folder that holds outputs.json, so the datasets they download land in
<workdir>/data, outside the repository. write_outputs.py then turns
outputs.json into src/utils/pythonGuideUsOutputs.js.

The runner replaces Plotly's fig.show() with write_image(), so the decile chart lands
in the work folder as us-decile-impacts-chart.png at the size of the chart
the page shipped before (2000 x 1040: 1000 x 520 at scale 2).

Several examples build the same simulation again: the same dataset file and
year, the same model object, and the same policy. The full US run with
policyengine 6.20.3 spent about 38 minutes in its blocks: about 10 building
the baseline, 11 on the economic-impact example, 13 on the decile chart and
4 on the regional example. So the runner wraps Simulation.ensure() to reuse a
finished run when every input field matches one that already ran. It copies
the same three fields ensure()'s own in-memory cache restores
(output_dataset, spm and spm_receipt). Inputs that differ in any field, such
as the regional example's extra_variables or a reform, run on their own. The
runner logs each reuse to stderr and records it on the block, so outputs.json
says which outputs came from a reused run.
"""

import contextlib
import hashlib
import io
import json
import os
import shlex
import subprocess
import sys
import time
import traceback
from pathlib import Path

# The work folder: the folder that holds outputs.json (set in main()).
HERE = Path.cwd()
VENV_BIN = Path(sys.executable).parent


def patch_plotly_show():
    import plotly.graph_objects as go

    def show(self, *args, **kwargs):
        path = HERE / "us-decile-impacts-chart.png"
        self.write_image(str(path), width=1000, height=520, scale=2)
        (HERE / "us-decile-impacts-chart.json").write_text(self.to_json())
        print(f"[runner] wrote {path.name}", file=sys.stderr)

    go.Figure.show = show


REUSE_EVENTS = []


def patch_simulation_reuse():
    from policyengine.core import Simulation

    original_ensure = Simulation.ensure
    finished = {}
    # Fields ensure() fills in, plus per-object identity and timestamps.
    skip_fields = {"id", "created_at", "updated_at", "output_dataset", "spm_receipt"}

    def scrub(value):
        if isinstance(value, dict):
            return {
                k: scrub(v)
                for k, v in value.items()
                if k not in {"id", "created_at", "updated_at"}
            }
        if isinstance(value, list):
            return [scrub(v) for v in value]
        return value

    def describe(name, value):
        if value is None:
            return None
        if name == "dataset":
            return {
                "type": type(value).__name__,
                "filepath": str(Path(value.filepath).resolve()),
                "year": value.year,
            }
        if name == "tax_benefit_model_version":
            # One model object per process: pe.us.model.
            return {"type": type(value).__name__, "object": id(value)}
        if hasattr(value, "model_dump"):
            return scrub(value.model_dump(mode="json"))
        return scrub(value)

    def key_for(simulation):
        parts = {
            name: describe(name, getattr(simulation, name))
            for name in type(simulation).model_fields
            if name not in skip_fields
        }
        return json.dumps(parts, sort_keys=True, default=str)

    def ensure(self):
        try:
            key = key_for(self)
        except Exception as error:  # describe nothing we can't; just run it
            print(f"[runner] no reuse key ({error!r}); running", file=sys.stderr)
            return original_ensure(self)
        prior = finished.get(key)
        if prior is not None:
            self.output_dataset = prior.output_dataset
            self.spm = prior.spm
            self.spm_receipt = (
                prior.spm_receipt.model_copy(deep=True)
                if prior.spm_receipt is not None
                else None
            )
            event = {"reused_run_of": prior.id, "key_sha256": hashlib.sha256(key.encode()).hexdigest()[:16]}
            REUSE_EVENTS.append(event)
            print(f"[runner] reused the finished run of {prior.id}", file=sys.stderr)
            return
        original_ensure(self)
        finished[key] = self

    Simulation.ensure = ensure


def run_python(code, namespace):
    out, err = io.StringIO(), io.StringIO()
    error = None
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
        try:
            exec(compile(code, "<block>", "exec"), namespace)
        except Exception:
            error = traceback.format_exc()
    return out.getvalue(), err.getvalue(), error


def run_bash(code):
    env = dict(os.environ, PATH=f"{VENV_BIN}:{os.environ.get('PATH', '')}")
    commands = [
        line.strip()
        for line in code.splitlines()
        if line.strip() and not line.strip().startswith("#")
    ]
    results = []
    for command in commands:
        proc = subprocess.run(
            shlex.split(command),
            cwd=HERE,
            env=env,
            capture_output=True,
            text=True,
        )
        results.append(
            {
                "command": command,
                "returncode": proc.returncode,
                "stdout": proc.stdout,
                "stderr": proc.stderr,
            }
        )
    return results


def main():
    global HERE
    blocks_path, outputs_path = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
    HERE = outputs_path.parent
    only = skip = set()
    args = sys.argv[3:]
    if "--only" in args:
        only = set(args[args.index("--only") + 1].split(","))
    if "--skip" in args:
        skip = set(args[args.index("--skip") + 1].split(","))
    blocks = json.loads(blocks_path.read_text())
    records = json.loads(outputs_path.read_text()) if outputs_path.exists() else {}

    os.chdir(HERE)
    patch_plotly_show()
    patch_simulation_reuse()
    namespace = {"__name__": "__main__"}
    for block in blocks:
        if (only and block["id"] not in only) or block["id"] in skip:
            continue
        print(f"{time.strftime('%H:%M:%S')} start {block['id']}", flush=True)
        started = time.time()
        REUSE_EVENTS.clear()
        if block["language"] == "bash":
            record = {"commands": run_bash(block["code"])}
            record["error"] = None
        else:
            stdout, stderr, error = run_python(block["code"], namespace)
            record = {"stdout": stdout, "stderr": stderr[-20000:], "error": error}
            record["reused_runs"] = list(REUSE_EVENTS)
        record.update(
            id=block["id"],
            fn=block["fn"],
            code=block["code"],
            seconds=round(time.time() - started, 1),
            finished_at=time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        )
        records[block["id"]] = record
        outputs_path.write_text(json.dumps(records, indent=2))
        status = "ERROR" if record.get("error") else "ok"
        print(
            f"{time.strftime('%H:%M:%S')} {status} {block['id']} "
            f"({record['seconds']} s)",
            flush=True,
        )
        if record.get("error"):
            print(record["error"], flush=True)


if __name__ == "__main__":
    main()
