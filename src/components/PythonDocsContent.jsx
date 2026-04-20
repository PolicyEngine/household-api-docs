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
  getPolicyenginePandasExample,
  getPolicyenginePinBundleExample,
  getPolicyengineProgramExample,
  getPolicyengineProgrammaticSituationExample,
  getPolicyengineRegionalExample,
  getPolicyengineReleaseBundleExample,
  getPolicyengineStructuralReformExample,
  getPolicyengineTimeSeriesExample,
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
];

const ANALYSIS_TOPICS = [
  { id: 'setup', label: 'Datasets and setup' },
  { id: 'outputs', label: 'Entity outputs' },
  { id: 'metrics', label: 'Weights and totals' },
  { id: 'reforms', label: 'Baseline vs reform' },
  { id: 'regions', label: 'Regions and budgets' },
  { id: 'visualization', label: 'Visualization' },
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
        </div>
        <div className="mt-6">
          {panel.blocks.map((block) => (
            <CodeBlock
              key={block.title}
              code={block.code}
              language={block.language}
              title={block.title}
              output={block.output}
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
      title: 'Start with calculate_household_impact()',
      body:
        'For one explicit family or household, policyengine.py exposes a typed input model plus a convenience helper. This is the closest package-level replacement for the old household-style Python guide, but it now lives inside the unified policyengine package.',
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
            ? 'Net income: $51,248\nEITC: $5,442\nSNAP: $3,205'
            : 'Net income: £43,088\nChild benefit: £2,329\nUniversal credit: £15,387',
        },
      ],
    },
    axes: {
      title: 'The axis idea still applies in one-household calculations',
      body:
        'The old guide taught this as array axes. In policyengine.py, the same idea appears as entity collections on the result: person-level outputs come back once per person, tax-unit or benunit outputs come back once per unit, and household outputs come back once for the household summary.',
      blocks: [
        {
          title: 'Inspect household-level entity axes',
          language: 'python',
          code: getPolicyengineHouseholdAxisExample(country),
          output: isUS
            ? 'person axis: 4\ntax_unit axis: 1\nspm_unit axis: 1\nhousehold axis: 1\n40000.0\n5441.66015625\n51248.12890625'
            : 'person axis: 4\nbenunit axis: 1\nhousehold axis: 1\n30000.0\n15387.0400390625\n42928.86328125',
        },
      ],
    },
    outputs: {
      title: 'Read outputs by entity, not by a nested request payload',
      body:
        'The helper returns entity-level outputs directly: person rows, higher-level units like tax units or benefit units, and a single household summary. The map_to_entity method follows three rules so you can move values between levels without hand-written joins.',
      blocks: [
        {
          title: 'Inspect entity-level results',
          language: 'python',
          code: getPolicyengineHouseholdOutputExample(country),
          output: isUS
            ? '50000.0\n3820.0\n8647.859375'
            : '3486.0\n295.138671796875\n25255.69140625',
        },
        {
          title: 'map_to_entity aggregation rules',
          language: 'python',
          code: getPolicyengineMapToAggregationExample(country),
          output: isUS
            ? `         weight        snap
0      0.000000    0.000000
1  94409.679688  287.683167
2      0.000000  287.683167
3      0.000000    0.000000
4      0.000000    0.000000
         weight  household_income_decile
0      0.000000                        8
1      0.000000                        8
2      0.000000                        8
3      0.000000                        8
4  94409.679688                        2
0    167260.375000
1     31364.105469
2     22297.158203
3    144380.109375
4    159616.875000
Name: household_net_income, dtype: float32`
            : `       weight  universal_credit
0  808.091309          0.000000
1  166.748154        942.416016
2  467.949768          0.000000
3  181.570221          0.000000
4  515.411926          0.000000
       weight  household_income_decile
0  808.091309                        2
1  166.748154                        1
2  166.748154                        1
3  166.748154                        1
4  166.748154                        1
0     22410.880859
1     30880.449219
2    102359.851562
3     37223.136719
4     35031.476562
Name: household_net_income, dtype: float32`,
        },
      ],
    },
    variation: {
      title: 'The old household axes idea becomes a small custom dataset in policyengine.py',
      body:
        'The notebook taught varying household inputs with axes. In policyengine.py, the equivalent supported path is to build a tiny custom dataset with one row per scenario and run a single Simulation across that grid. That gives you the same earnings-variation teaching pattern without relying on the old country-package axes API.',
      blocks: [
        {
          title: 'Vary one household template across employment-income levels',
          language: 'python',
          code: getPolicyengineHouseholdVariationExample(country),
          output: isUS
            ? ` employment_income  household_net_income        eitc        snap
                 0          23577.558594    0.000000 5999.688965
             20000          43291.523438 7316.000000 3122.389160
             40000          44639.250000 3912.703857    0.000000
             60000          54158.671875    0.000000    0.000000
             80000          67369.710938    0.000000    0.000000`
            : ` employment_income  hbai_household_net_income  universal_credit  child_benefit
                 0               25323.000000      22993.726562     2329.27417
             10000               35323.000000      22993.726562     2329.27417
             20000               39734.507812      19485.638672     2329.27417
             30000               42974.511719      15525.639648     2329.27417
             40000               46214.511719      11565.639648     2329.27417`,
        },
      ],
    },
    programmatic: {
      title: 'Build household inputs programmatically',
      body:
        'USHouseholdInput and UKHouseholdInput are plain pydantic models, so you can generate them from a function or a loop instead of hand-writing each case. This is the package-level replacement for the notebook pattern that dynamically added children to a situation dictionary.',
      blocks: [
        {
          title: `Sweep ${isUS ? 'CTC' : 'child benefit'} over family size`,
          language: 'python',
          code: getPolicyengineProgrammaticSituationExample(country),
          output: isUS
            ? '0 children: CTC = $0\n2 children: CTC = $4,400\n4 children: CTC = $8,800'
            : '0 children: child benefit = £0\n2 children: child benefit = £2,329\n4 children: child benefit = £4,185',
        },
      ],
    },
    reforms: {
      title: 'Household-level reform testing uses the same Policy objects',
      body:
        'Even for a single household, reforms are defined with Parameter, ParameterValue, and Policy. For parameter-level changes this is the supported path and gives you the same certified bundle you get from baseline runs. For reforms that change how a variable is calculated, drop to the country package - that path works, but it lives outside the policyengine.py reproducibility boundary, so you have to pin the country package version yourself.',
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
          output: isUS ? '[5400.]' : '[3082.9263]',
        },
      ],
    },
    trace: {
      title: 'Tracing calculations: drop to the country package',
      body:
        'The policyengine.py wrapper does not expose print_computation_log. When you need a step-by-step dependency tree - for debugging unexpected values, teaching, or writing up how a variable is built - run the same situation through the country package directly. The tracer prints one line per variable: name, period, branch, and the computed array.',
      blocks: [
        {
          title: `Trace a ${isUS ? 'EITC' : 'Universal Credit'} calculation`,
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
    eitc_reduction<2026, (default)> = [2995.74]
      filer_adjusted_earnings<2026, (default)> = [50000.]
      adjusted_gross_income<2026, (default)> = [50000.]
      eitc_phase_out_start<2026, (default)> = [10840.]
      eitc_phase_out_rate<2026, (default)> = [0.0765]`
            : `  universal_credit<2026, (default)> = [0.]
    would_claim_uc<2026, (default)> = [ True]
    universal_credit_pre_benefit_cap<2026, (default)> = [0.]
      would_claim_uc<2026, (default)> = [ True]
      uc_maximum_amount<2026, (default)> = [4912.1187]
      uc_income_reduction<2026, (default)> = [4912.1187]
    benefit_cap_reduction<2026, (default)> = [0.]`,
        },
      ],
    },
  };

  const analysisPanels = {
    setup: {
      title: 'Representative datasets replace the old Microsimulation entry point',
      body:
        'For policy analysis, move to dataset-backed Simulation objects. ensure_datasets() is the standard entry point: it loads cached HDF5 datasets when present and otherwise downloads and prepares them for the selected year. If you used the old country-package Microsimulation entry point, the conceptual replacement is straightforward: the data step is still there, but policyengine.py wraps it in a cross-country Simulation object and standardises the output surface.',
      blocks: [
        {
          title: `${country.adjective} dataset-backed simulation`,
          language: 'python',
          code: getPolicyengineDatasetExample(country),
          output: isUS
            ? `         weight  household_net_income  household_tax
0      0.000000         167260.375000   44651.078125
1  94409.679688          31364.105469    -732.710266
2      0.000000          22297.158203       0.000000
3      0.000000         144380.109375   33226.578125
4      0.000000         159616.875000   28905.570312`
            : `       weight  household_net_income  household_tax
0  808.091309          22410.880859    3274.553223
1  166.748154          30880.449219    4701.234863
2  467.949768         102359.851562   74587.593750
3  181.570221          37223.136719    5545.671875
4  515.411926          35031.476562    5471.306641`,
        },
        {
          title: 'Old Microsimulation mental model -> new Simulation mental model',
          language: 'python',
          code: getPolicyengineMicrosimAlignmentExample(country),
          output: isUS ? 'us-3.4.0\nMicroDataFrame' : 'uk-3.4.0\nMicroDataFrame',
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
            ? `         weight        snap
0      0.000000    0.000000
1  94409.679688  287.683167
2      0.000000  287.683167
3      0.000000    0.000000
4      0.000000    0.000000
         weight  household_tax
0      0.000000   44651.078125
1      0.000000   44651.078125
2      0.000000   44651.078125
3      0.000000   44651.078125
4  94409.679688    -732.710266`
            : `       weight  universal_credit
0  808.091309          0.000000
1  166.748154        942.416016
2  467.949768          0.000000
3  181.570221          0.000000
4  515.411926          0.000000
       weight  household_net_income
0  808.091309          22410.880859
1  166.748154          30880.449219
2  166.748154          30880.449219
3  166.748154          30880.449219
4  166.748154          30880.449219`,
        },
        {
          title: 'Work with tabular outputs and plain pandas',
          language: 'python',
          code: getPolicyenginePandasExample(country),
          output: isUS
            ? `         weight  household_net_income  household_weight
0      0.000000         167260.375000          0.000000
1  94409.679688          31364.105469      94409.679688
2      0.000000          22297.158203          0.000000
3      0.000000         144380.109375          0.000000
4      0.000000         159616.875000          0.000000
MicroSeries mean: $197,263
Plain pandas mean (unweighted): $21,769,616
Manual pandas mean: $197,263`
            : `       weight  household_net_income  household_weight
0  808.091309          22410.880859        808.091309
1  166.748154          30880.449219        166.748154
2  467.949768         102359.851562        467.949768
3  181.570221          37223.136719        181.570221
4  515.411926          35031.476562        515.411926
MicroSeries mean: £54,192
Plain pandas mean (unweighted): £68,602
Manual pandas mean: £54,192`,
        },
      ],
    },
    metrics: {
      title: 'MicroSeries, Aggregate, and person-level counts handle the weighted analysis layer',
      body:
        'The old guide called weighting out explicitly, and it is still the critical concept. In policyengine.py, output columns are MicroSeries, so weighted sums and means stay attached to the data. When you want one top-line result instead of direct series work, Aggregate is the cleanest path, and person-level enrollment questions are just weighted counts on the person table.',
      blocks: [
        {
          title: 'Weighted sums and means',
          language: 'python',
          code: getPolicyengineWeightingExample(country),
          output: isUS
            ? 'MicroSeries\nWeighted total EITC: $62.1B\nWeighted mean EITC: $318'
            : 'MicroSeries\nWeighted total UC: £96.4bn\nWeighted mean UC: £2,705',
        },
        {
          title: 'Compute a top-line aggregate',
          language: 'python',
          code: getPolicyengineAggregateExample(country),
          output: isUS ? 'Total EITC: $62.1B' : 'Total universal credit: £96.4bn',
        },
        {
          title: 'Person-level program enrollment',
          language: 'python',
          code: getPolicyengineEnrollmentExample(country),
          output: isUS
            ? `SNAP recipients: 51,220,852
Children in SNAP units: 15,733,092
         snap  is_child  person_weight
0    0.000000     False       0.000000
1    0.000000     False       0.000000
2    0.000000      True       0.000000
3    0.000000      True       0.000000
4  287.683167     False   94409.679688`
            : `People with UC entitlement: 15,928,831
Children with UC entitlement: 6,780,346
   universal_credit  is_child  person_weight
0          0.000000     False     808.091309
1        942.416016      True     166.748154
2        942.416016      True     166.748154
3        942.416016     False     166.748154
4        942.416016     False     166.748154`,
        },
      ],
    },
    reforms: {
      title: 'economic_impact_analysis() is the full reform-analysis workflow',
      body:
        'For baseline-vs-reform work, the package already knows how to assemble decile impacts, programme statistics, poverty, and inequality metrics. Use Aggregate for one number; use economic_impact_analysis() when you want the full policy-analysis bundle, including program-by-program breakdowns.',
      blocks: [
        {
          title: 'Full reform analysis workflow',
          language: 'python',
          code: getPolicyengineEconomicImpactExample(country),
          output: isUS
            ? ` decile  baseline_mean  reform_mean  absolute_change
      1   -1545.980994 -1392.893084       153.087910
      2   25980.639399 26141.205521       160.566122
      3   40797.105949 41380.591286       583.485337
      4   56389.368009 57032.937899       643.569890
      5   74434.627376 75518.311739      1083.684363
        program_name        change      winners       losers
          income_tax -1.080405e+11 1.391090e+08 1.947908e+08
employee_payroll_tax  0.000000e+00 1.950783e+08 1.950783e+08
    state_income_tax -2.546925e+09 1.897764e+08 1.934048e+08
                snap  0.000000e+00 0.000000e+00 0.000000e+00
                tanf  0.000000e+00 0.000000e+00 0.000000e+00
baseline Gini: 0.7624, reform Gini: 0.7606`
            : ` decile  baseline_mean  reform_mean  absolute_change
      1   11507.088124 11541.186333        34.098209
      2   19578.513452 19789.152719       210.639267
      3   25359.336285 25634.716091       275.379806
      4   30034.256800 30436.598293       402.341493
      5   34874.719465 35306.487355       431.767890
    programme_name        change      winners       losers
        income_tax -2.148292e+10 3.175206e+07 7.120972e+07
national_insurance  0.000000e+00 7.120972e+07 7.120972e+07
               vat  0.000000e+00 3.197526e+07 3.197526e+07
       council_tax  0.000000e+00 3.197526e+07 3.197526e+07
  universal_credit -7.943472e+08 0.000000e+00 2.890717e+06
baseline Gini: 0.3089, reform Gini: 0.3088`,
        },
        {
          title: 'Inspect program statistics',
          language: 'python',
          code: getPolicyengineProgramExample(country),
          output: isUS
            ? `        program_name        change      winners       losers
          income_tax -1.080405e+11 1.391090e+08 1.947908e+08
employee_payroll_tax  0.000000e+00 1.950783e+08 1.950783e+08
    state_income_tax -2.546925e+09 1.897764e+08 1.934048e+08
                snap  0.000000e+00 0.000000e+00 0.000000e+00
                tanf  0.000000e+00 0.000000e+00 0.000000e+00`
            : `    programme_name        change      winners       losers
        income_tax -2.148292e+10 3.175206e+07 7.120972e+07
national_insurance  0.000000e+00 7.120972e+07 7.120972e+07
               vat  0.000000e+00 3.197526e+07 3.197526e+07
       council_tax  0.000000e+00 3.197526e+07 3.197526e+07
  universal_credit -7.943472e+08 0.000000e+00 2.890717e+06`,
        },
      ],
    },
    regions: {
      title: 'Regional analysis and budget windows live in the same workflow',
      body: isUS
        ? 'Regional analysis is built into policyengine.py. The working row-filter path on the packaged US dataset uses household geography columns like state_fips, and the time side is just multiple dataset years plus a loop. Budget scoring typically runs over a 10-year window to match CBO and JCT conventions.'
        : 'Regional analysis also lives in the package. The simplest working row-filter path on the packaged UK dataset uses region, and the time side is just multiple dataset years plus a loop. The packaged enhanced FRS is uprated through 2030, which matches the OBR five-year forecast horizon.',
      blocks: [
        {
          title: `${country.adjective} regional analysis`,
          language: 'python',
          code: getPolicyengineRegionalExample(country),
          output: isUS ? 'California EITC: $10.6B' : 'London universal credit: £15.8bn',
        },
        {
          title: isUS ? '10-year budget window with CAGR' : 'Five-year OBR-style window with CAGR',
          language: 'python',
          code: getPolicyengineTimeSeriesExample(country),
          output: isUS
            ? `2026: $110.6B
2027: $110.2B
2028: $110.0B
2029: $113.5B
2030: $117.8B
2031: $117.0B
2032: $116.1B
2033: $114.9B
2034: $113.5B
2035: $112.7B
10-year total: $1,136.4B
CAGR: 0.21%`
            : `2026: £20.5bn
2027: £21.0bn
2028: £21.5bn
2029: £21.8bn
2030: £22.2bn
5-year total: £107.1bn
CAGR: 2.06%`,
        },
      ],
    },
    visualization: {
      title: 'Publication-ready charts with Plotly',
      body:
        'Plotly is bundled with policyengine.py and is the same charting layer policyengine.org uses. For one-off analysis, you can drop a variation grid or aggregate table straight into go.Figure and get an interactive chart. For PolicyEngine-branded output, the country model packages expose format_fig, which applies the same typography and colour palette you see on the main site.',
      blocks: [
        {
          title: 'Chart a household variation grid',
          language: 'python',
          code: getPolicyengineVisualizationExample(country),
          output:
            'Plotly figure opens in the browser (interactive). Replace fig.show() with fig.write_image("chart.png") to save a static version, or fig.write_html("chart.html") to embed it in a dashboard.',
        },
      ],
    },
  };

  const reproPanels = {
    bundle: {
      title: 'Pin the bundle and save it next to every output',
      body:
        'The user-facing reproducibility boundary in policyengine.py is the certified runtime bundle. It pins a policyengine.py version to an exact country model version AND an exact certified data artifact. Anything an analysis depends on that is not in the bundle is out of scope. The practical workflow is two lines: pin policyengine.py in requirements, and write simulation.release_bundle to disk alongside the results you publish.',
      blocks: [
        {
          title: 'Pin the release and capture the bundle',
          language: 'python',
          code: getPolicyenginePinBundleExample(country),
          output: isUS
            ? `bundle_id: us-3.4.0
country: us
model: policyengine-us 1.602.0
data: policyengine-us-data 1.73.0
dataset: ./data/enhanced_cps_2024_year_2026.h5`
            : `bundle_id: uk-3.4.0
country: uk
model: policyengine-uk 2.74.0
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
            ? `runtime bundle: us-3.4.0
certified dataset: enhanced_cps_2024
certified model version: 1.602.0
data build_id: policyengine-us-data-1.73.0
compatibility basis: exact_build_model_version
data manifest unavailable: Could not find the data release manifest on Hugging Face for policyengine/policyengine-us-data@1.73.0.`
            : `runtime bundle: uk-3.4.0
certified dataset: enhanced_frs_2023_24
certified model version: 2.74.0
data build_id: policyengine-uk-data-1.40.4
compatibility basis: exact_build_model_version
data manifest unavailable: Could not fetch the data release manifest from Hugging Face. If this country uses a private data repo, set HUGGING_FACE_TOKEN.`,
        },
      ],
    },
    trace: {
      title: 'TRACE export for papers, audits, and cross-tool provenance',
      body:
        'TRACE (Transparent Reporting And Citation Exchange) is a JSON-LD standard for describing analytical artifacts. policyengine.py ships a TRO builder that wraps the runtime bundle and the data build manifest into a single TRACE-compatible document plus a composition fingerprint over the artifacts in scope. Use this when you need to cite a run in a paper or submit provenance to an audit - the internal manifests remain authoritative, TRACE is the export surface.',
      blocks: [
        {
          title: 'Emit a TRACE TRO alongside your results',
          language: 'python',
          code: getPolicyengineTraceExportExample(country),
          output: isUS
            ? `data manifest unavailable: Could not find the data release manifest on Hugging Face for policyengine/policyengine-us-data@1.73.0.
wrote runtime-only bundle to outputs/release_bundle.json
country: us`
            : `data manifest unavailable: Could not fetch the data release manifest from Hugging Face. If this country uses a private data repo, set HUGGING_FACE_TOKEN.
wrote runtime-only bundle to outputs/release_bundle.json
country: uk`,
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
              <h3 className="text-lg font-semibold text-text-primary">Household inputs</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Use <code className="rounded bg-white px-1 py-0.5 text-xs">{isUS ? 'USHouseholdInput' : 'UKHouseholdInput'}</code>{' '}
                with <code className="rounded bg-white px-1 py-0.5 text-xs">calculate_household_impact()</code>{' '}
                when the question is about one explicit household.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Datasets</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Use <code className="rounded bg-white px-1 py-0.5 text-xs">ensure_datasets()</code>{' '}
                to load representative microdata for national or regional analysis.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Simulations</h3>
              <p className="mt-2 text-sm text-text-secondary">
                <code className="rounded bg-white px-1 py-0.5 text-xs">Simulation</code>{' '}
                applies a country model version to data and produces entity-level outputs you can inspect or aggregate.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Policies and outputs</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Reforms live in <code className="rounded bg-white px-1 py-0.5 text-xs">Policy</code>{' '}
                objects, while <code className="rounded bg-white px-1 py-0.5 text-xs">Aggregate</code>{' '}
                and <code className="rounded bg-white px-1 py-0.5 text-xs">economic_impact_analysis()</code>{' '}
                turn results into analysis.
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
        <div className="mx-auto max-w-6xl rounded-3xl border border-border-light bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            Reproducibility
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            Certified bundles, explicit compatibility, and TRACE export
          </h2>
          <p className="mt-3 text-sm text-text-secondary">
            Reproducibility in policyengine.py is a contract, not a convention. A published release pins a country model version to an exact certified data artifact, and the package refuses to mix a model with data it was not certified against. The three steps below are how you put that contract to work in an analysis.
          </p>

          <div className="mt-6">
            <TopicSection
              items={REPRODUCIBILITY_TOPICS}
              selected={reproTopic}
              onChange={setReproTopic}
              panels={reproPanels}
            />
          </div>
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
                ? `{'bundle_id': 'us-3.4.0', 'country_id': 'us', 'policyengine_version': '3.4.0', 'model_package': 'policyengine-us', 'model_version': '1.602.0', 'data_package': 'policyengine-us-data', 'data_version': '1.73.0', 'default_dataset': 'enhanced_cps_2024', 'certified_data_build_id': 'policyengine-us-data-1.73.0', 'compatibility_basis': 'exact_build_model_version', ...}`
                : `{'bundle_id': 'uk-3.4.0', 'country_id': 'uk', 'policyengine_version': '3.4.0', 'model_package': 'policyengine-uk', 'model_version': '2.74.0', 'data_package': 'policyengine-uk-data', 'data_version': '1.40.4', 'default_dataset': 'enhanced_frs_2023_24', 'certified_data_build_id': 'policyengine-uk-data-1.40.4', 'compatibility_basis': 'exact_build_model_version', ...}`}
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
