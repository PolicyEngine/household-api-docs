// Extract the US example code that /us/python publishes, in page order, from
// src/utils/countryDocs.js, for run_examples.py to run.
//
// usage (from the repository root):
//   bun scripts/python-guide/extract_blocks.mjs src/utils/countryDocs.js <workdir>/blocks.json
//
// Each block's id is the key write_outputs.py gives its output in
// src/utils/pythonGuideUsOutputs.js and the key PythonDocsContent.jsx reads.
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error('usage: bun extract_blocks.mjs <countryDocs.js> <blocks.json>');
  process.exit(2);
}
const docs = await import(pathToFileURL(resolve(src)).href);
const us = docs.getCountryDoc('us');
const order = [
  ['setup.dataset', 'getPolicyengineDatasetExample'],
  ['setup.alignment', 'getPolicyengineMicrosimAlignmentExample'],
  ['outputs.axis', 'getPolicyengineAxisExample'],
  ['outputs.mapping', 'getPolicyengineMappingExample'],
  ['outputs.pandas', 'getPolicyenginePandasExample'],
  ['metrics.weighting', 'getPolicyengineWeightingExample'],
  ['metrics.aggregate', 'getPolicyengineAggregateExample'],
  ['metrics.enrollment', 'getPolicyengineEnrollmentExample'],
  ['reforms.economic_impact', 'getPolicyengineEconomicImpactExample'],
  ['reforms.program', 'getPolicyengineProgramExample'],
  ['regions.regional', 'getPolicyengineRegionalExample'],
  ['visualization.deciles', 'getPolicyengineMicrosimVisualizationExample'],
  ['repro.pin_bundle', 'getPolicyenginePinBundleExample'],
  ['repro.manifests', 'getPolicyengineManifestExample'],
  ['repro.trace_export', 'getPolicyengineTraceExportExample'],
  ['repro.trace_cli', 'getPolicyengineTraceCliExample', 'bash'],
  ['repro.simulation_tro', 'getPolicyengineSimulationTroExample'],
  ['reference.release_bundle', 'getPolicyengineReleaseBundleExample'],
  ['regions.time_series', 'getPolicyengineTimeSeriesExample'],
];
const blocks = order.map(([id, fn, language = 'python']) => {
  if (typeof docs[fn] !== 'function') throw new Error(`missing ${fn}`);
  return { id, fn, language, code: docs[fn](us) };
});
writeFileSync(out, JSON.stringify(blocks, null, 2));
console.log(`wrote ${blocks.length} blocks to ${out}`);
