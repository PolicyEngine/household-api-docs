'use client';

import { useCallback, useRef, useState } from 'react';
import CodeBlock from './CodeBlock';
import {
  getPolicyengineAggregateExample,
  getPolicyengineAxisExample,
  getPolicyengineDatasetExample,
  getPolicyengineEconomicImpactExample,
  getPolicyengineHouseholdAxisExample,
  getPolicyengineHouseholdImpactExample,
  getPolicyengineHouseholdOutputExample,
  getPolicyengineHouseholdReformExample,
  getPolicyengineHouseholdVariationExample,
  getPolicyengineEnrollmentExample,
  getPolicyengineManifestExample,
  getPolicyengineMapToAggregationExample,
  getPolicyengineMicrosimAlignmentExample,
  getPolicyengineMappingExample,
  getPolicyengineMicrosimVisualizationExample,
  getPolicyenginePandasExample,
  getPolicyenginePinBundleExample,
  getPolicyengineProgramExample,
  getPolicyengineProgrammaticSituationExample,
  getPolicyengineRegionalExample,
  getPolicyengineReleaseBundleExample,
  getPolicyengineSimulationTroExample,
  getPolicyengineStructuralReformExample,
  getPolicyengineTimeSeriesExample,
  getPolicyengineTraceCliExample,
  getPolicyengineTraceExample,
  getPolicyengineTraceExportExample,
  getPolicyengineVisualizationExample,
  getPolicyengineWeightingExample,
  getPythonInstallExample,
} from '@/utils/countryDocs';

const HOUSEHOLD_TOPICS = [
  { id: 'impact', label: 'Household impact' },
  { id: 'axes', label: 'Household axes' },
  { id: 'outputs', label: 'Entity outputs' },
  { id: 'variation', label: 'Variation grids' },
  { id: 'programmatic', label: 'Building situations' },
  { id: 'reforms', label: 'Household reforms' },
  { id: 'trace', label: 'Tracing calculations' },
  { id: 'chart', label: 'Charting a household' },
];

const ANALYSIS_TOPICS = [
  { id: 'setup', label: 'Datasets and setup' },
  { id: 'outputs', label: 'Entity outputs' },
  { id: 'metrics', label: 'Weights and totals' },
  { id: 'reforms', label: 'Baseline vs reform' },
  { id: 'regions', label: 'Regions and budgets' },
  { id: 'visualization', label: 'Decile impact chart' },
];

const REPRODUCIBILITY_TOPICS = [
  { id: 'bundle', label: 'Pin the bundle' },
  { id: 'manifests', label: 'Two-manifest architecture' },
  { id: 'trace', label: 'TRACE export' },
];

const US_ENTITY_ROWS = [
  { entity: 'person', scope: 'Individual', examples: 'employment_income, age, is_disabled' },
  { entity: 'marital_unit', scope: 'Married couple or single adult', examples: 'joint return grouping' },
  { entity: 'tax_unit', scope: 'Tax filing unit', examples: 'income_tax, ctc_value, eitc' },
  { entity: 'spm_unit', scope: 'SPM poverty unit', examples: 'snap, housing_assistance' },
  { entity: 'family', scope: 'Related-by-blood grouping', examples: 'family-level programmes' },
  { entity: 'household', scope: 'All people at one address', examples: 'household_net_income, state_fips, rent' },
];

const UK_ENTITY_ROWS = [
  { entity: 'person', scope: 'Individual', examples: 'employment_income, age, is_disabled_for_benefits' },
  { entity: 'benunit', scope: 'Benefit unit (adult(s) + dependent children)', examples: 'universal_credit, child_benefit' },
  { entity: 'household', scope: 'All people at one address', examples: 'household_net_income, region, council_tax' },
];

const PARAMETER_ROWS = [
  {
    kind: 'Single value',
    example: 'gov.irs.credits.ctc.amount.base[0].amount',
    description: 'A scalar amount, rate, or threshold. Set a new value for a date range.',
  },
  {
    kind: 'List',
    example: 'gov.irs.credits.refundable',
    description: 'A list of values, often names of variables that qualify for a rule.',
  },
  {
    kind: 'Scale',
    example: 'gov.hmrc.income_tax.rates',
    description: 'Graduated thresholds and rates. Access via .thresholds, .rates, .amounts.',
  },
  {
    kind: 'Breakdown',
    example: 'gov.irs.credits.ctc.phase_out.threshold.JOINT',
    description: 'Parameter broken down by an enum (filing status, age band, region).',
  },
];

function TopicSidebar({ items, selected, onChange }) {
  return (
    <aside className="self-start rounded-2xl border border-border-light bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] md:sticky md:top-[calc(var(--pe-spacing-header)+1.5rem)]">
      <div className="space-y-2">
        {items.map((item, index) => {
          const isActive = item.id === selected;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                isActive
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-border-light bg-bg-secondary text-text-primary hover:bg-primary-50'
              }`}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  isActive ? 'bg-primary-700 text-white' : 'bg-white text-primary-700'
                }`}
              >
                {index + 1}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function SummaryCard({ eyebrow, title, body }) {
  return (
    <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">{eyebrow}</div>
      <h3 className="mt-2 text-xl font-semibold text-text-primary">{title}</h3>
      <p className="mt-3 text-sm text-text-secondary">{body}</p>
    </div>
  );
}

function TopicSection({
  items,
  selected,
  onChange,
  panels,
}) {
  const panel = panels[selected];
  const selectedIndex = items.findIndex((item) => item.id === selected);
  const nextItem = selectedIndex >= 0 ? items[selectedIndex + 1] : null;
  const contentRef = useRef(null);

  const handleChange = useCallback((id) => {
    onChange(id);
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [onChange]);

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
      <TopicSidebar
        items={items}
        selected={selected}
        onChange={handleChange}
      />

      <div ref={contentRef} className="scroll-mt-20 rounded-2xl border border-border-light bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
          <h3 className="text-2xl font-semibold text-text-primary">{panel.title}</h3>
          <p className="mt-3 text-sm text-text-secondary">{panel.body}</p>
          {panel.reference && (
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-4">
              {panel.reference.map(({ term, definition }) => (
                <div key={term} className="contents">
                  <dt className="font-mono text-xs text-text-primary sm:pt-0.5">{term}</dt>
                  <dd className="text-text-secondary">{definition}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div className="mt-6">
          {panel.blocks.map((block) => (
            <CodeBlock
              key={block.title}
              code={block.code}
              language={block.language}
              title={block.title}
              output={block.output}
              outputImage={block.outputImage}
              outputImageAlt={block.outputImageAlt}
            />
          ))}
        </div>

        {nextItem && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-primary-50 p-4">
            <div className="text-sm text-text-secondary">
              Next step: {nextItem.label}
            </div>
            <button
              type="button"
              onClick={() => handleChange(nextItem.id)}
              className="inline-flex rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              Continue to {nextItem.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-6 pb-4">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-text-primary">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-3xl text-sm text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}

function ReferenceTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="sticky top-0 border-b border-border-light bg-bg-secondary px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-b border-border-light px-4 py-3 text-text-primary"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PythonDocsContent({ country }) {
  const isUS = country.id === 'us';
  const [householdTopic, setHouseholdTopic] = useState('impact');
  const [analysisTopic, setAnalysisTopic] = useState('setup');
  const [reproTopic, setReproTopic] = useState('bundle');

  const entityRows = (isUS ? US_ENTITY_ROWS : UK_ENTITY_ROWS).map((row) => [
    <code key="entity" className="rounded bg-bg-secondary px-1.5 py-0.5 text-xs">{row.entity}</code>,
    row.scope,
    <code key="examples" className="text-xs text-text-secondary">{row.examples}</code>,
  ]);

  const householdPanels = {
    impact: {
      title: `Start with pe.${country.id}.calculate_household()`,
      body:
        'For one explicit family or household, call calculate_household with plain Python dicts. No wrapper class, no situation dictionary - keyword args for people and each entity, plus a year. The result is a typed object with one attribute per entity section.',
      blocks: [
        {
          title: `Install ${country.pythonGuidePackage} for ${country.adjective}`,
          language: 'bash',
          code: getPythonInstallExample(country),
        },
        {
          title: `${country.adjective} household impact`,
          language: 'python',
          code: getPolicyengineHouseholdImpactExample(country),
          output: isUS
            ? 'Net income: $51,261\nEITC: $5,454\nSNAP: $3,205'
            : 'Net income: £43,338\nChild benefit: £2,328\nUniversal credit: £15,639',
        },
      ],
    },
    axes: {
      title: 'Entity axes are sections on the result',
      body:
        'The result has one attribute per entity. Person-level sections are lists (one entry per person). Group entities (tax_unit, benunit, household) are single objects - no list indexing needed since a calculate_household call models one of each.',
      blocks: [
        {
          title: 'Inspect household-level entity axes',
          language: 'python',
          code: getPolicyengineHouseholdAxisExample(country),
          output: isUS
            ? 'person axis: 4\ntax_unit axis: 1\nspm_unit axis: 1\nhousehold axis: 1\n40000.0\n5454.2958984375\n51260.765625'
            : 'person axis: 4\nbenunit axis: 1\nhousehold axis: 1\n30000.0\n15638.638671875\n43179.34375',
        },
      ],
    },
    outputs: {
      title: 'Attribute access replaces the dict-access payload',
      body:
        'Outputs come back as a typed result with attribute access: result.person[0].age, result.tax_unit.income_tax, result.household.household_net_income. Unknown variables raise with a suggested fix; misplaced inputs raise with entity hints.',
      blocks: [
        {
          title: 'Inspect entity-level results',
          language: 'python',
          code: getPolicyengineHouseholdOutputExample(country),
          output: isUS
            ? '50000.0\n3820.0\n9297.859375'
            : '3486.0\n457.47265625\n25418.0234375',
        },
        {
          title: 'map_to_entity aggregation rules',
          language: 'python',
          code: getPolicyengineMapToAggregationExample(country),
          output: isUS
            ? `         weight         snap
0      0.000000     0.000000
1  94409.679688  6588.717773
2      0.000000  2169.539795
3      0.000000     0.000000
4      0.000000     0.000000
         weight  household_income_decile
0      0.000000                        8
1      0.000000                        8
2      0.000000                        8
3      0.000000                        8
4  94409.679688                        1
0    162787.765625
1     13163.706055
2     14824.270508
3    144380.109375
4    157499.937500
Name: household_net_income, dtype: float32`
            : `       weight  universal_credit
0  808.091309               0.0
1  166.748154               0.0
2  467.949768               0.0
3  181.570221               0.0
4  515.411926               0.0
       weight  household_income_decile
0  808.091309                        3
1  166.748154                        1
2  166.748154                        1
3  166.748154                        1
4  166.748154                        1
0     22852.031250
1     29921.960938
2    102740.921875
3     33344.003906
4     34987.277344
Name: household_net_income, dtype: float32`,
        },
      ],
    },
    variation: {
      title: 'Variation is just a loop over calculate_household',
      body:
        'v4 makes variation trivial: loop over input values, call calculate_household each time, collect the entity fields you care about into a DataFrame. No custom datasets, no axes configuration, no entity-id plumbing.',
      blocks: [
        {
          title: 'Vary one household template across employment-income levels',
          language: 'python',
          code: getPolicyengineHouseholdVariationExample(country),
          output: isUS
            ? ` employment_income  household_net_income        eitc        snap
                 0          23577.558594    0.000000 5999.688965
             20000          43031.523438 7316.000000 3122.389160
             40000          44129.781250 3923.233887    0.000000
             60000          53378.671875    0.000000    0.000000
             80000          66329.710938    0.000000    0.000000`
            : ` employment_income  hbai_household_net_income  universal_credit  child_benefit
                 0               25323.000000      22994.845703    2328.155273
             10000               33527.589844      21199.433594    2328.155273
             20000               37091.406250      16843.654297    2328.155273
             30000               40331.406250      12883.655273    2328.155273
             40000               43571.406250       8923.654297    2328.155273`,
        },
      ],
    },
    programmatic: {
      title: 'Build household inputs programmatically',
      body:
        'The calculate_household kwargs are plain Python dicts and lists, so you can build them from a function or loop. This is the v4 equivalent of dynamically constructing situation dictionaries.',
      blocks: [
        {
          title: `Sweep ${isUS ? 'CTC' : 'child benefit'} over family size`,
          language: 'python',
          code: getPolicyengineProgrammaticSituationExample(country),
          output: isUS
            ? '0 children: CTC = $0\n2 children: CTC = $4,400\n4 children: CTC = $8,800'
            : '0 children: child benefit = £0\n2 children: child benefit = £2,328\n4 children: child benefit = £4,183',
        },
      ],
    },
    reforms: {
      title: 'Reforms are plain dicts: {parameter_path: value}',
      body:
        'Parametric reforms are the supported path in v4. Pass a dict of parameter-path → value as reform= for calculate_household, or policy= for a Simulation - exact same shape. Scale parameters use bracket indexing ("gov.x.rate[0]"). For structural reforms (formula swaps), drop to the country package\'s Microsimulation - that path lives outside the policyengine.py reproducibility boundary, so pin the country package version yourself.',
      blocks: [
        {
          title: 'Baseline vs reform for one household (parameter-level)',
          language: 'python',
          code: getPolicyengineHouseholdReformExample(country),
          output: isUS ? 'Change in net income: $1,782' : 'Change in net income: £486',
        },
        {
          title: 'Structural reform escape hatch (country package)',
          language: 'python',
          code: getPolicyengineStructuralReformExample(country),
          output: isUS
            ? 'Baseline EITC: $62.3B\nReform EITC: $0.0B'
            : 'Baseline UC: £82.2bn\nReform UC: £0.0bn',
        },
      ],
    },
    trace: {
      title: 'Tracing calculations: drop to the country package',
      body:
        'Reach for trace when a variable came out differently than you expected and the short explanation is "because of some other variable" - the tracer walks the dependency tree down to the input leaves. policyengine.py does not expose the tracer; run the same situation through the country package\'s Simulation, set sim.trace = True before calculating, then print the computation log. Each line has the same shape:',
      reference: [
        {
          term: 'variable<period, branch> = [array]',
          definition:
            'variable name / year / simulation branch / computed values, one per entity. Indentation is dependency depth - the most indented lines are the inputs (not computations) that the variable ultimately depends on.',
        },
        {
          term: '(default)',
          definition:
            'The active simulation branch. Stays (default) on baseline runs. Under a reform, calculations that touched the reform show up on a non-default branch, which is how you compare baseline vs. reform trees side by side.',
        },
        {
          term: 'max_depth=N',
          definition:
            'Caps how far down the tree the log prints. max_depth=1 shows only the top-level inputs; max_depth=None prints the full tree. Start shallow and widen when a specific subtree looks wrong.',
        },
      ],
      blocks: [
        {
          title: `Trace ${isUS ? 'EITC' : 'Universal Credit'} for one household`,
          language: 'python',
          code: getPolicyengineTraceExample(country),
          output: isUS
            ? `  eitc<2026, (default)> = [0.]
    eitc_eligible<2026, (default)> = [ True]
      eitc_investment_income_eligible<2026, (default)> = [ True]
      eitc_demographic_eligible<2026, (default)> = [ True]
      filer_meets_eitc_identification_requirements<2026, (default)> = [ True]
    takes_up_eitc<2026, (default)> = [ True]
    eitc_maximum<2026, (default)> = [664.]
      eitc_child_count<2026, (default)> = [0]
    eitc_phased_in<2026, (default)> = [664.]
      eitc_maximum<2026, (default)> = [664.]
      eitc_phase_in_rate<2026, (default)> = [0.0765]
      filer_adjusted_earnings<2026, (default)> = [50000.]
    eitc_reduction<2026, (default)> = [2994.21]
      filer_adjusted_earnings<2026, (default)> = [50000.]
      adjusted_gross_income<2026, (default)> = [50000.]
      eitc_phase_out_start<2026, (default)> = [10860.]
      eitc_phase_out_rate<2026, (default)> = [0.0765]
    tax_unit_is_required_to_file<2026, (default)> = [ True]
      ...
    ...`
            : `  universal_credit<2026, (default)> = [0.]
    would_claim_uc<2026, (default)> = [ True]
    universal_credit_pre_benefit_cap<2026, (default)> = [0.]
      would_claim_uc<2026, (default)> = [ True]
      uc_maximum_amount<2026, (default)> = [5079.1323]
      uc_income_reduction<2026, (default)> = [5079.1323]
    benefit_cap_reduction<2026, (default)> = [0.]
      child_benefit<2026, (default)> = [0.]
      ...`,
        },
      ],
    },
    chart: {
      title: 'Chart a household across earnings',
      body:
        'Once you have a variation grid, dropping it into Plotly produces the sort of marginal-tax / budget-set chart used to teach how a program behaves across the earnings range. This example plots household net income and one benefit on the same axes.',
      blocks: [
        {
          title: isUS
            ? 'Household net income and EITC by employment income'
            : 'Household net income and universal credit by employment income',
          language: 'python',
          code: getPolicyengineVisualizationExample(country),
          outputImage: isUS
            ? '/python-guide/us-variation-chart.png'
            : '/python-guide/uk-variation-chart.png',
          outputImageAlt: isUS
            ? 'US household net income and EITC by employment income'
            : 'UK household net income and universal credit by employment income',
        },
      ],
    },
  };

  const analysisPanels = {
    setup: {
      title: 'Representative datasets replace the old Microsimulation entry point',
      body:
        `For population analysis, move to dataset-backed Simulation objects. pe.${country.id}.ensure_datasets() is the entry point: it loads cached HDF5 datasets when present and otherwise downloads and uprates them. Simulation.ensure() is the new canonical run method - it loads a cached result if available, otherwise runs and caches. pe.${country.id}.model supplies the pinned TaxBenefitModelVersion.`,
      blocks: [
        {
          title: `${country.adjective} dataset-backed simulation`,
          language: 'python',
          code: getPolicyengineDatasetExample(country),
          output: isUS
            ? `         weight  household_net_income  household_tax
0      0.000000         162787.765625   49123.687500
1  94409.679688          13163.706055   -1462.839600
2      0.000000          14824.270508       0.000000
3      0.000000         144380.109375   33226.578125
4      0.000000         157499.937500   31022.513672`
            : `       weight  household_net_income  household_tax
0  808.091309          22852.031250    3373.469727
1  166.748154          29921.960938    4778.160645
2  467.949768         102740.921875   74814.242188
3  181.570221          33344.003906    5540.328613
4  515.411926          34987.277344    5446.388184`,
        },
        {
          title: 'Old Microsimulation mental model -> new Simulation mental model',
          language: 'python',
          code: getPolicyengineMicrosimAlignmentExample(country),
          output: isUS ? 'us-4.0.0\nMicroDataFrame' : 'uk-4.0.0\nMicroDataFrame',
        },
      ],
    },
    outputs: {
      title: 'Entity outputs combine the old axis, map_to, and DataFrame ideas',
      body:
        'Previously the guide split this across array shapes, map_to behaviour, and calculate_dataframe(). In policyengine.py, those ideas collapse into one entity-output surface: variables live on entity-indexed tables, you can map between entities directly, and the tabular data is already attached as MicroDataFrame objects.',
      blocks: [
        {
          title: 'Inspect entity axes in the output dataset',
          language: 'python',
          code: getPolicyengineAxisExample(country),
          output: isUS
            ? `{'person': 101384, 'tax_unit': 56658, 'spm_unit': 43134, 'household': 41314}
person variables: ['employment_income', 'ssi', 'medicare_cost']
tax-unit variables: ['income_tax', 'state_income_tax', 'eitc']
household variables: ['household_net_income', 'household_tax']`
            : `{'person': 115710, 'benunit': 61898, 'household': 53508}
person variables: ['employment_income', 'income_tax']
benunit variables: ['universal_credit', 'child_benefit']
household variables: ['household_net_income', 'household_tax']`,
        },
        {
          title: 'Map outputs between entities',
          language: 'python',
          code: getPolicyengineMappingExample(country),
          output: isUS
            ? `         weight         snap
0      0.000000     0.000000
1  94409.679688  6588.717773
2      0.000000  2169.539795
3      0.000000     0.000000
4      0.000000     0.000000
         weight  household_tax
0      0.000000     49123.6875
1      0.000000     49123.6875
2      0.000000     49123.6875
3      0.000000     49123.6875
4  94409.679688     -1462.8396`
            : `       weight  universal_credit
0  808.091309               0.0
1  166.748154               0.0
2  467.949768               0.0
3  181.570221               0.0
4  515.411926               0.0
       weight  household_net_income
0  808.091309          22852.031250
1  166.748154          29921.960938
2  166.748154          29921.960938
3  166.748154          29921.960938
4  166.748154          29921.960938`,
        },
        {
          title: 'Work with tabular outputs and plain pandas',
          language: 'python',
          code: getPolicyenginePandasExample(country),
          output: isUS
            ? `         weight  household_net_income  household_weight
0      0.000000         162787.765625          0.000000
1  94409.679688          13163.706055      94409.679688
2      0.000000          14824.270508          0.000000
3      0.000000         144380.109375          0.000000
4      0.000000         157499.937500          0.000000
MicroSeries mean: $190,730
Plain pandas mean (unweighted): $20,883,836
Manual pandas mean: $190,730`
            : `       weight  household_net_income  household_weight
0  808.091309          22852.031250        808.091309
1  166.748154          29921.960938        166.748154
2  467.949768         102740.921875        467.949768
3  181.570221          33344.003906        181.570221
4  515.411926          34987.277344        515.411926
MicroSeries mean: £53,816
Plain pandas mean (unweighted): £67,797
Manual pandas mean: £53,816`,
        },
      ],
    },
    metrics: {
      title: 'Aggregate, ChangeAggregate, and MicroSeries handle the weighted analysis layer',
      body:
        'Output columns are MicroSeries, so weighted sums and means stay attached to the data. Aggregate is the cleanest path for one top-line number; ChangeAggregate does the baseline-vs-reform version. Person-level enrollment questions are just weighted counts on the person table.',
      blocks: [
        {
          title: 'Weighted sums and means',
          language: 'python',
          code: getPolicyengineWeightingExample(country),
          output: isUS
            ? 'MicroSeries\nWeighted total EITC: $62.3B\nWeighted mean EITC: $319'
            : 'MicroSeries\nWeighted total UC: £82.2bn\nWeighted mean UC: £2,305',
        },
        {
          title: 'Compute a top-line aggregate',
          language: 'python',
          code: getPolicyengineAggregateExample(country),
          output: isUS ? 'Total EITC: $62.3B' : 'Total universal credit: £82.2bn',
        },
        {
          title: 'Person-level program enrollment',
          language: 'python',
          code: getPolicyengineEnrollmentExample(country),
          output: isUS
            ? `SNAP recipients: 61,687,344
Children in SNAP units: 15,868,462
          snap  is_child  person_weight
0     0.000000     False       0.000000
1     0.000000     False       0.000000
2     0.000000      True       0.000000
3     0.000000      True       0.000000
4  6588.717773     False   94409.679688`
            : `People with UC entitlement: 13,366,974
Children with UC entitlement: 5,890,033
   universal_credit  is_child  person_weight
0               0.0     False     808.091309
1               0.0      True     166.748154
2               0.0      True     166.748154
3               0.0     False     166.748154
4               0.0     False     166.748154`,
        },
      ],
    },
    reforms: {
      title: `pe.${country.id}.economic_impact_analysis() is the full reform-analysis workflow`,
      body:
        `For baseline-vs-reform work, the package assembles decile impacts, ${country.id === 'us' ? 'program' : 'programme'} statistics, poverty, and inequality metrics in one call. Use ChangeAggregate for one number; use economic_impact_analysis for the full policy-analysis bundle.`,
      blocks: [
        {
          title: 'Full reform analysis workflow',
          language: 'python',
          code: getPolicyengineEconomicImpactExample(country),
          output: isUS
            ? ` decile  baseline_mean  reform_mean  absolute_change
      1   -9249.685951 -9070.988891       178.697060
      2   17137.479529 17164.445664        26.966135
      3   31090.281789 31403.339569       313.057780
      4   49172.217449 49846.434791       674.217342
      5   69417.956212 70476.013552      1058.057340
        program_name        change      winners       losers
          income_tax -1.012413e+11 1.403724e+08 1.947391e+08
employee_payroll_tax  0.000000e+00 1.950783e+08 1.950783e+08
                snap  0.000000e+00 0.000000e+00 0.000000e+00
                eitc  0.000000e+00 0.000000e+00 0.000000e+00
                 ctc  0.000000e+00 0.000000e+00 0.000000e+00
baseline Gini: 0.7840, reform Gini: 0.7823`
            : ` decile  baseline_mean  reform_mean  absolute_change
      1    9846.328747  9872.733765        26.405018
      2   18724.772391 18941.946284       217.173892
      3   24407.138287 24685.500516       278.362228
      4   29346.524286 29728.469358       381.945071
      5   34227.475778 34687.093572       459.617794
      program_name        change      winners       losers
        income_tax -2.177037e+10 3.116015e+07 7.120972e+07
national_insurance  0.000000e+00 7.120972e+07 7.120972e+07
               vat  0.000000e+00 3.197526e+07 3.197526e+07
       council_tax  0.000000e+00 3.197526e+07 3.197526e+07
  universal_credit -6.150505e+08 0.000000e+00 2.326434e+06
baseline Gini: 0.3170, reform Gini: 0.3167`,
        },
        {
          title: 'Inspect program statistics',
          language: 'python',
          code: getPolicyengineProgramExample(country),
          output: isUS
            ? `        program_name        change      winners       losers
          income_tax -1.012413e+11 1.403724e+08 1.947391e+08
employee_payroll_tax  0.000000e+00 1.950783e+08 1.950783e+08
                snap  0.000000e+00 0.000000e+00 0.000000e+00
                eitc  0.000000e+00 0.000000e+00 0.000000e+00
                 ctc  0.000000e+00 0.000000e+00 0.000000e+00`
            : `      program_name        change      winners       losers
        income_tax -2.177037e+10 3.116015e+07 7.120972e+07
national_insurance  0.000000e+00 7.120972e+07 7.120972e+07
               vat  0.000000e+00 3.197526e+07 3.197526e+07
       council_tax  0.000000e+00 3.197526e+07 3.197526e+07
  universal_credit -6.150505e+08 0.000000e+00 2.326434e+06`,
        },
      ],
    },
    regions: {
      title: 'Regional analysis and budget windows live in the same workflow',
      body: isUS
        ? 'In v4, regional breakdowns are just filter_variable + filter_variable_eq on any Aggregate or ChangeAggregate. state_code is an Enum variable on every household. Budget scoring typically runs over a 10-year window to match CBO and JCT conventions - use ChangeAggregate inside a year loop.'
        : 'In v4, regional breakdowns are just filter_variable + filter_variable_eq on any Aggregate or ChangeAggregate. region is an Enum variable on every UK household. The packaged enhanced FRS is uprated through 2030, matching the OBR five-year forecast horizon.',
      blocks: [
        {
          title: `${country.adjective} regional analysis`,
          language: 'python',
          code: getPolicyengineRegionalExample(country),
          output: isUS ? 'California EITC: $10.6B' : 'London universal credit: £13.5bn',
        },
        {
          title: isUS ? '10-year budget window with CAGR' : 'Five-year OBR-style window with CAGR',
          language: 'python',
          code: getPolicyengineTimeSeriesExample(country),
          output: isUS
            ? `# A 10-year US run takes ~30 minutes and is memory-heavy; on a laptop with
# less than 16 GB of RAM, downsample to cps_small_2024 or shorten the window.
# Indicative shape (exact numbers depend on dataset version):
2026: ~$100B
2035: ~$115B
10-year total: ~$1,100B
CAGR: ~0.2% - 1.5%`
            : `2026: £21.1bn
2027: £21.7bn
2028: £22.3bn
2029: £22.9bn
2030: £23.5bn
5-year total: £111.5bn
CAGR: 2.68%`,
        },
      ],
    },
    visualization: {
      title: 'Chart the distributional impact',
      body:
        'Once a baseline and reform simulation are in hand, decile-level outputs go straight into Plotly. The bar chart below is the mean change in household net income by income decile - the standard distributional visualisation for policy analysis.',
      blocks: [
        {
          title: 'Decile impact chart (mean change in household net income)',
          language: 'python',
          code: getPolicyengineMicrosimVisualizationExample(country),
          outputImage: isUS
            ? '/python-guide/us-decile-impacts-chart.png'
            : '/python-guide/uk-decile-impacts-chart.png',
          outputImageAlt: isUS
            ? 'US mean change in household net income by income decile under the reform'
            : 'UK mean change in household net income by income decile under the reform',
        },
      ],
    },
  };

  const reproPanels = {
    bundle: {
      title: 'Pin the bundle and save it next to every output',
      body:
        'The user-facing reproducibility boundary in policyengine.py is the certified runtime bundle. It pins a policyengine.py version to an exact country-model version AND an exact certified data artifact. v4 adds a hard certification check at import time: the installed country package must match the bundled manifest. The practical workflow: pin policyengine in requirements, and write simulation.release_bundle to disk alongside the results you publish.',
      blocks: [
        {
          title: 'Pin the release and capture the bundle',
          language: 'python',
          code: getPolicyenginePinBundleExample(country),
          output: isUS
            ? `bundle_id: us-4.0.0
country: us
model: policyengine-us 1.653.3
data: policyengine-us-data 1.73.0
dataset: ./data/enhanced_cps_2024_year_2026.h5`
            : `bundle_id: uk-4.0.0
country: uk
model: policyengine-uk 2.88.0
data: policyengine-uk-data 1.40.4
dataset: ./data/enhanced_frs_2023_24_year_2026.h5`,
        },
      ],
    },
    manifests: {
      title: 'Two manifest layers: data build and certified runtime',
      body:
        'policyengine.py separates two responsibilities. The data build manifest is owned by the country *-data repo and records how the artifact bytes were produced (raw inputs, calibration targets, model version used in the build). The certified runtime bundle is owned by policyengine.py and records which model + data pair are supported together at runtime. The certification check is explicit: a model version may reuse an existing data artifact only if its data_build_fingerprint matches the one the data was built against. Mismatches are a hard failure, not a warning.',
      blocks: [
        {
          title: 'Load and verify both manifests',
          language: 'python',
          code: getPolicyengineManifestExample(country),
          output: isUS
            ? `runtime bundle: us-4.0.0
certified dataset: enhanced_cps_2024
certified model version: 1.653.3
data build_id: policyengine-us-data-1.73.0
compatibility basis: matching_data_build_fingerprint
data manifest unavailable: No data release manifest was published for this data package.`
            : `runtime bundle: uk-4.0.0
certified dataset: enhanced_frs_2023_24
certified model version: 2.88.0
data build_id: policyengine-uk-data-1.40.4
compatibility basis: matching_data_build_fingerprint
data manifest unavailable: No data release manifest was published for this data package.`,
        },
      ],
    },
    trace: {
      title: 'Cite a specific PolicyEngine run',
      body:
        'TRACE (Transparent Research And Citation Exchange) is a JSON-LD standard for describing analytical artifacts. For PolicyEngine, the primary citation surface is a run you executed on policyengine.org: the webapp signs the simulation on our infrastructure, produces a TRO URL, and a paper that cites that URL is durable even if the researcher never installs the Python package. This section covers both that webapp-run path (the one most users want) and the Python / CLI path for researchers running policyengine.py locally who want to emit their own TRO. Every content hash is computed over the canonical JSON serialization used by policyengine.provenance.trace.canonical_json_bytes, so any third-party verifier can reproduce the hashes exactly.',
      reference: [
        {
          term: 'Bundle TRO',
          definition:
            'Composition pins 4 artifacts by sha256 - the bundle manifest, the data release manifest, the certified dataset, and the country model wheel (resolved from PyPI when not in the bundled manifest). Use to cite the model + data pair itself.',
        },
        {
          term: 'Simulation TRO',
          definition:
            'Composition pins 3 artifacts by sha256 - the bundle TRO, the reform JSON, and the results JSON. Records pe:bundleFingerprint and an optional pe:bundleTroUrl anchor so verifiers can cross-check the bundle bytes at a canonical location. Use to cite one specific run.',
        },
        {
          term: 'pe:* namespace',
          definition:
            'PolicyEngine-specific metadata on the Performance node: pe:certifiedForModelVersion, pe:compatibilityBasis (exact_build_model_version | matching_data_build_fingerprint | legacy_compatible_model_package), pe:builtWithModelVersion, pe:dataBuildId, pe:certifiedBy. pe:emittedIn is "local" or "github-actions"; CI runs additionally carry pe:ciRunUrl, pe:ciGitSha, pe:ciGitRef.',
        },
        {
          term: 'TROv vocabulary',
          definition:
            'The standards-based core (https://w3id.org/trace/trov/0.1#) - TransparentResearchObject, ArtifactComposition, CompositionFingerprint, ArtifactArrangement, TransparentResearchPerformance. PolicyEngine-specific fields live under the pe: namespace so SHACL validation against the TROv shapes is unaffected.',
        },
      ],
      blocks: [
        {
          title: 'Primary citation path: policyengine.org runs, institutionally signed',
          language: 'text',
          code: `Every simulation executed on policyengine.org produces a
Transparent Research Object (TRO) that our infrastructure signs on
your behalf. The result page exposes a "Cite this result" action that
downloads the JSON-LD TRO and a durable permalink.

Why this is the primary surface:
  - PolicyEngine runs the simulation on pinned software and pinned
    calibrated microdata that live on our infrastructure. A reviewer
    who cannot re-run the simulation locally (for instance, because
    the underlying UK microdata is UKDS-licensed and cannot be
    redistributed) still has a verifiable chain of evidence.
  - The institutional signature says "PolicyEngine ran this with
    these pinned versions, these inputs, and these outputs." The
    reader does not have to trust the researcher's laptop.
  - Software and data versions are captured at the point of
    execution, so the citation stays interpretable after future
    PolicyEngine releases.

What to cite in a paper:
  - Citation URL: the permalink returned alongside the "Cite this
    result" download.
  - Verification: a reader can run
      policyengine trace-tro-validate <downloaded-file>.jsonld
    to confirm the SHA-256 hashes in the TRO match the linked
    artifacts.`,
          output: `(Webapp integration is currently in progress - see policyengine-api#3485 and policyengine-app#2830. In the meantime, the Python / CLI emitters below produce the same kind of TRO from a local policyengine.py install.)`,
        },
        {
          title: 'Secondary: emit a bundle TRO from Python yourself',
          language: 'python',
          code: getPolicyengineTraceExportExample(country),
          output: isUS
            ? `data manifest unavailable: No data release manifest was published for this data package.
wrote runtime-only bundle to outputs/release_bundle.json
country: us`
            : `data manifest unavailable: No data release manifest was published for this data package.
wrote runtime-only bundle to outputs/release_bundle.json
country: uk`,
        },
        {
          title: 'Secondary: CLI one-liners',
          language: 'bash',
          code: getPolicyengineTraceCliExample(country),
          output: isUS
            ? `# policyengine release-manifest us  (first 5 lines)
{
  "bundle_id": "us-4.0.0",
  "certification": {
    "built_with_model_git_sha": null,
    "built_with_model_version": "1.647.0",
    ...

# policyengine trace-tro us --out us.trace.tro.jsonld
# (fails today because the policyengine-us-data release manifest is not yet
# published to HF for version 1.73.0; from CI with a published manifest the
# command writes a ~6KB JSON-LD file.)
policyengine.provenance.manifest.DataReleaseManifestUnavailableError:
  No data release manifest was published for this data package.

# policyengine trace-tro-validate us.trace.tro.jsonld  (against a TRO
# generated in CI or from the bundled release_manifests/us.trace.tro.jsonld)
ok: us.trace.tro.jsonld`
            : `# policyengine release-manifest uk  (first 5 lines)
{
  "bundle_id": "uk-4.0.0",
  "certification": {
    "built_with_model_git_sha": null,
    "built_with_model_version": "2.88.0",
    ...

# policyengine trace-tro uk --out uk.trace.tro.jsonld
# (fails today because the policyengine-uk-data release manifest is private
# and not yet published; set HUGGING_FACE_TOKEN or rely on CI-generated TROs.)
policyengine.provenance.manifest.DataReleaseManifestUnavailableError:
  Could not fetch the data release manifest from Hugging Face. If this
  country uses a private data repo, set HUGGING_FACE_TOKEN.

# policyengine trace-tro-validate uk.trace.tro.jsonld
ok: uk.trace.tro.jsonld`,
        },
        {
          title: 'Chain a simulation TRO onto a bundle TRO',
          language: 'python',
          code: getPolicyengineSimulationTroExample(country),
          output: isUS
            ? `bundle fingerprint: 9bec29b98c8189fe ...
policyengine version: 4.0.0
wrote simulation TRO`
            : `# UK requires a published / CI-generated bundle TRO first
# (the bundled manifest omits the dataset sha256 for the private repo).
bundle fingerprint: <bundle sha256 prefix> ...
policyengine version: 4.0.0
wrote simulation TRO`,
        },
      ],
    },
  };

  return (
    <>
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border-light bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            Core concepts
          </p>
          <p className="mt-3 text-lg text-text-secondary">
            The Python guide now follows the unified <code className="rounded bg-bg-secondary px-1.5 py-0.5 text-base">{country.pythonGuidePackage}</code>{' '}
            package. Four concepts show up throughout the workflow:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Household calculator</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Call <code className="rounded bg-white px-1 py-0.5 text-xs">pe.{country.id}.calculate_household(...)</code>{' '}
                with plain Python dicts; the typed result exposes every variable in the model.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Datasets</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Use <code className="rounded bg-white px-1 py-0.5 text-xs">pe.{country.id}.ensure_datasets()</code>{' '}
                to load representative microdata, then feed it into <code className="rounded bg-white px-1 py-0.5 text-xs">Simulation</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Reforms as dicts</h3>
              <p className="mt-2 text-sm text-text-secondary">
                A reform is a <code className="rounded bg-white px-1 py-0.5 text-xs">{`{"param.path": value}`}</code>{' '}
                dict. Same shape for <code className="rounded bg-white px-1 py-0.5 text-xs">reform=</code>{' '}
                (household) and <code className="rounded bg-white px-1 py-0.5 text-xs">policy=</code>{' '}
                (microsim).
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Outputs</h3>
              <p className="mt-2 text-sm text-text-secondary">
                <code className="rounded bg-white px-1 py-0.5 text-xs">Aggregate</code>,{' '}
                <code className="rounded bg-white px-1 py-0.5 text-xs">ChangeAggregate</code>, and{' '}
                <code className="rounded bg-white px-1 py-0.5 text-xs">pe.{country.id}.economic_impact_analysis()</code>{' '}
                turn simulations into analysis.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{country.adjective} entity hierarchy</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Outputs come back at the entity level where a variable is defined. Everything else is a mapping operation.
              </p>
              <div className="mt-3 overflow-hidden rounded-2xl border border-border-light">
                <ReferenceTable
                  columns={['Entity', 'Scope', 'Example variables']}
                  rows={entityRows}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Parameter types</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Every reform target is a parameter. Knowing which shape a parameter has tells you how to reference it in a <code className="rounded bg-bg-secondary px-1 py-0.5 text-xs">Policy</code>.
              </p>
              <div className="mt-3 space-y-3">
                {PARAMETER_ROWS.map((row) => (
                  <div
                    key={row.kind}
                    className="rounded-2xl border border-border-light bg-bg-secondary p-4"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-sm font-semibold text-text-primary">{row.kind}</span>
                      <code className="break-all rounded bg-white px-1.5 py-0.5 text-xs text-text-secondary">
                        {row.example}
                      </code>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">{row.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="household-analysis" className="px-6 pb-10">
        <SectionHeader
          eyebrow="Simulation"
          title="Household-level analysis"
          subtitle={`Per-household calculations with pe.${country.id}.calculate_household: reforms, variation grids, programmatic builders, tracing, and charts.`}
        />
        <div className="mx-auto max-w-6xl">
          <TopicSection
            items={HOUSEHOLD_TOPICS}
            selected={householdTopic}
            onChange={setHouseholdTopic}
            panels={householdPanels}
          />
        </div>
      </section>

      <section id="microsimulation-analysis" className="px-6 pb-10">
        <SectionHeader
          eyebrow="Microsimulation"
          title="Population-level analysis"
          subtitle="Aggregate estimates over calibrated microdata: weighted totals, baseline-vs-reform impacts, regional slices, and distributional charts."
        />
        <div className="mx-auto max-w-6xl">
          <TopicSection
            items={ANALYSIS_TOPICS}
            selected={analysisTopic}
            onChange={setAnalysisTopic}
            panels={analysisPanels}
          />
        </div>
      </section>

      <section id="reproducibility" className="px-6 pb-10">
        <SectionHeader
          eyebrow="Reproducibility"
          title="Pin, verify, export"
          subtitle="A policyengine.py release pins a country model to an exact certified data artifact and refuses to mix a model with data it was not certified against. Pin the bundle in requirements, verify the two manifest layers, and emit a TRACE TRO for citations."
        />
        <div className="mx-auto max-w-6xl">
          <TopicSection
            items={REPRODUCIBILITY_TOPICS}
            selected={reproTopic}
            onChange={setReproTopic}
            panels={reproPanels}
          />
        </div>
      </section>

      <section id="advanced-notes" className="px-6 pb-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border-light bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            References
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            Where to go after the walkthrough
          </h2>
          <p className="mt-3 text-sm text-text-secondary">
            The model explorer, the policyengine.py repo, and the release-bundle docs are the three sources of truth. Use the quick-reference block below to check the bundle attached to any simulation you have already run.
          </p>
          <div className="mt-6">
            <CodeBlock
              code={getPolicyengineReleaseBundleExample()}
              language="python"
              title="Inspect the certified runtime bundle"
              output={isUS
                ? `{'bundle_id': 'us-4.0.0', 'country_id': 'us', 'policyengine_version': '4.0.0', 'model_package': 'policyengine-us', 'model_version': '1.653.3', 'data_package': 'policyengine-us-data', 'data_version': '1.73.0', 'default_dataset': 'enhanced_cps_2024', 'certified_data_build_id': 'policyengine-us-data-1.73.0', 'compatibility_basis': 'matching_data_build_fingerprint', ...}`
                : `{'bundle_id': 'uk-4.0.0', 'country_id': 'uk', 'policyengine_version': '4.0.0', 'model_package': 'policyengine-uk', 'model_version': '2.88.0', 'data_package': 'policyengine-uk-data', 'data_version': '1.40.4', 'default_dataset': 'enhanced_frs_2023_24', 'certified_data_build_id': 'policyengine-uk-data-1.40.4', 'compatibility_basis': 'matching_data_build_fingerprint', ...}`}
            />
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <SummaryCard
              eyebrow="Model explorer"
              title="Variables and parameters"
              body="Use the model explorer after the walkthrough when you need exact variable names or parameter paths."
            />
            <SummaryCard
              eyebrow="Reproducibility"
              title="Release bundles"
              body="The release-bundles doc describes the two-manifest layer, the fingerprint compatibility rule, and artifact states."
            />
            <SummaryCard
              eyebrow="Examples"
              title="Working scripts"
              body="The checked-in examples in policyengine.py are the best place to look when you need a longer end-to-end pattern or paper-style reproduction."
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={country.modelParametersUrl}
              className="inline-flex rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white"
            >
              Explore variables and parameters
            </a>
            <a
              href={country.pythonGuideRepoUrl}
              className="inline-flex rounded-lg bg-text-primary px-4 py-2 text-sm font-medium text-white"
            >
              Open {country.pythonGuidePackage}
            </a>
            <a
              href={country.pythonGuideReleaseBundlesUrl}
              className="inline-flex rounded-lg border border-border-light px-4 py-2 text-sm font-medium text-text-primary"
            >
              Open release-bundle docs
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
