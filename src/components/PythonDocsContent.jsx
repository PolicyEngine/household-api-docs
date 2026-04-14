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
  getPolicyengineMicrosimAlignmentExample,
  getPolicyengineMappingExample,
  getPolicyengineProgramExample,
  getPolicyengineRegionalExample,
  getPolicyengineReleaseBundleExample,
  getPolicyengineWeightingExample,
  getPythonInstallExample,
} from '@/utils/countryDocs';

const HOUSEHOLD_TOPICS = [
  { id: 'impact', label: 'Household impact' },
  { id: 'axes', label: 'Household axes' },
  { id: 'outputs', label: 'Entity outputs' },
  { id: 'reforms', label: 'Household reforms' },
];

const ANALYSIS_TOPICS = [
  { id: 'setup', label: 'Datasets and setup' },
  { id: 'alignment', label: 'Microsim alignment' },
  { id: 'axes', label: 'Entity axes' },
  { id: 'mapping', label: 'Entity mapping' },
  { id: 'weighting', label: 'Weighting' },
  { id: 'aggregates', label: 'Aggregate outputs' },
  { id: 'reforms', label: 'Baseline vs reform' },
  { id: 'programs', label: 'Program analysis' },
  { id: 'regions', label: 'Regions and scoping' },
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

export default function PythonDocsContent({ country }) {
  const isUS = country.id === 'us';
  const [householdTopic, setHouseholdTopic] = useState('impact');
  const [analysisTopic, setAnalysisTopic] = useState('setup');

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
        'The helper returns entity-level outputs directly: person rows, higher-level units like tax units or benefit units, and a single household summary. That makes it easier to move from one-household examples into real analysis code.',
      blocks: [
        {
          title: 'Inspect entity-level results',
          language: 'python',
          code: getPolicyengineHouseholdOutputExample(country),
          output: isUS
            ? '40000.0\n-8841.66015625\n-5781.66015625'
            : '3234.0\n15387.0400390625\n42928.86328125',
        },
      ],
    },
    reforms: {
      title: 'Household-level reform testing uses the same Policy objects',
      body:
        'Even for a single household, reforms are defined with Parameter, ParameterValue, and Policy. The only difference is that you pass the policy into calculate_household_impact() instead of building a second request payload.',
      blocks: [
        {
          title: 'Baseline vs reform for one household',
          language: 'python',
          code: getPolicyengineHouseholdReformExample(country),
          output: isUS ? 'Change in net income: $1,782' : 'Change in net income: £486',
        },
      ],
    },
  };

  const analysisPanels = {
    setup: {
      title: 'Representative datasets are the normal analysis path',
      body:
        'For policy analysis, move to dataset-backed Simulation objects. ensure_datasets() is the standard entry point: it loads cached HDF5 datasets when present and otherwise downloads and prepares them for the selected year.',
      blocks: [
        {
          title: `${country.adjective} dataset-backed simulation`,
          language: 'python',
          code: getPolicyengineDatasetExample(country),
          output: isUS
            ? `   household_net_income  household_tax
0         159616.875000   28905.570312
1          23514.343750       0.000000
2          73911.210938     -10.663874
3          30762.664062    5317.699707
4          70909.531250    7834.121094`
            : `   household_net_income  household_tax
0          -5820.696777    9985.617188
1         250678.156250  187514.578125
2          -2660.014404   26395.324219
3          30904.941406    4731.754395
4          42611.609375   19814.173828`,
        },
      ],
    },
    alignment: {
      title: 'Microsimulation alignment after the policyengine.py restructure',
      body:
        'If you used the old country-package Microsimulation entry point, the conceptual replacement is straightforward: ensure_datasets() still gets representative microdata, but policyengine.py wraps the country model in a cross-country Simulation object and standardises the output surface.',
      blocks: [
        {
          title: 'Old Microsimulation mental model -> new Simulation mental model',
          language: 'python',
          code: getPolicyengineMicrosimAlignmentExample(country),
          output: isUS ? 'us-3.4.0\nMicroDataFrame' : 'uk-3.4.0\nMicroDataFrame',
        },
      ],
    },
    axes: {
      title: 'The old axis idea still exists, but as entity-indexed tables',
      body:
        'Previously the guide taught arrays and shapes directly. The same idea is still here: each variable lives on an entity axis. policyengine.py just makes that explicit through output tables like person, tax_unit, benunit, spm_unit, and household instead of asking users to reason from raw NumPy shapes first.',
      blocks: [
        {
          title: 'Inspect entity axes in the output dataset',
          language: 'python',
          code: getPolicyengineAxisExample(country),
          output: isUS
            ? `{'person': 12060, 'tax_unit': 6744, 'spm_unit': 5140, 'household': 4962}
person variables: ['employment_income', 'ssi', 'medicare_cost']
tax-unit variables: ['income_tax', 'state_income_tax', 'eitc']
household variables: ['household_net_income', 'household_tax']`
            : `{'person': 10820, 'benunit': 5754, 'household': 4478}
person variables: ['employment_income', 'income_tax']
benunit variables: ['universal_credit', 'child_benefit']
household variables: ['household_net_income', 'household_tax']`,
        },
      ],
    },
    mapping: {
      title: 'Entity mapping replaces the old array-and-DataFrame detour',
      body:
        'The old guide spent time on array shapes and map_to behaviour. In policyengine.py, the more durable concept is entity mapping: once a simulation has run, map_to_entity() lets you move results across person, household, tax-unit, SPM-unit, and benunit levels without rebuilding the joins yourself.',
      blocks: [
        {
          title: 'Map outputs between entities',
          language: 'python',
          code: getPolicyengineMappingExample(country),
          output: isUS
            ? `   snap
0   0.0
1   0.0
2   0.0
3   0.0
4   0.0
   household_tax
0   28905.570312
1   28905.570312
2       0.000000
3     -10.663874
4     -10.663874`
            : `   universal_credit
0               0.0
1               0.0
2               0.0
3               0.0
4               0.0
   household_net_income
0          -5820.696777
1         100931.710938
2         100931.710938
3         250678.156250
4         250678.156250`,
        },
      ],
    },
    weighting: {
      title: 'Weights still matter, but MicroSeries carries them for you',
      body:
        'The old guide called this out explicitly, and it is still important. The main difference in policyengine.py is that output columns are MicroSeries, so weighted sums and means stay attached to the data instead of forcing you into a separate notebook pattern right away.',
      blocks: [
        {
          title: 'Weighted sums and means',
          language: 'python',
          code: getPolicyengineWeightingExample(country),
          output: isUS
            ? 'MicroSeries\nWeighted total EITC: $6.8B\nWeighted mean EITC: $311'
            : 'MicroSeries\nWeighted total UC: £17.3bn\nWeighted mean UC: £3,687',
        },
      ],
    },
    aggregates: {
      title: 'Aggregate turns simulation outputs into analysis metrics',
      body:
        'Once a simulation has run, Aggregate is the simplest way to compute totals, means, and filtered metrics without dropping straight into custom pandas code. It is also the safest way to stay correctly weighted when you are working with representative microdata.',
      blocks: [
        {
          title: 'Compute a top-line aggregate',
          language: 'python',
          code: getPolicyengineAggregateExample(country),
          output: isUS ? 'Total EITC: $6.8B' : 'Total universal credit: £17.3bn',
        },
      ],
    },
    reforms: {
      title: 'economic_impact_analysis() is the full comparison workflow',
      body:
        'For baseline-vs-reform work, the package already knows how to assemble decile impacts, programme statistics, poverty, and inequality metrics. Use ChangeAggregate for one number; use economic_impact_analysis() when you want the full policy-analysis bundle.',
      blocks: [
        {
          title: 'Full reform analysis workflow',
          language: 'python',
          code: getPolicyengineEconomicImpactExample(country),
          output: isUS
            ? `                 baseline_simulation_id                  reform_simulation_id       income_variable  decile  baseline_mean  reform_mean  absolute_change  relative_change  count_better_off  count_worse_off  count_no_change
0  ...  household_net_income       1   -3084.370108 -3020.234972        64.135136        -0.072769     110148.088641              0.0     2.053285e+06
        program_name        change      winners       losers
          income_tax -8.188285e+09 1.722058e+07 2.200066e+07
employee_payroll_tax  0.000000e+00 2.200066e+07 2.200066e+07
0.664551854133606 0.6630756855010986`
            : `                 baseline_simulation_id                  reform_simulation_id                  income_variable  decile  baseline_mean  reform_mean  absolute_change  relative_change  count_better_off  count_worse_off  count_no_change
0  ...  equiv_hbai_household_net_income       1    7386.319426  7405.539919        19.220493         0.150233      10544.507993              0.0    134918.362638
    programme_name        change      winners       losers
        income_tax -2.830008e+09 4.424946e+06 9.124488e+06
national_insurance  0.000000e+00 9.124488e+06 9.124488e+06
0.2877410650253296 0.28766512870788574`,
        },
      ],
    },
    programs: {
      title: 'Program-by-program outputs are a first-class result',
      body:
        'The old guide had a dedicated program-analysis track. In policyengine.py that capability sits inside economic_impact_analysis(), which returns a tabular programme or program breakdown you can sort, export, or feed into a chart.',
      blocks: [
        {
          title: 'Inspect program statistics',
          language: 'python',
          code: getPolicyengineProgramExample(country),
          output: isUS
            ? `        program_name        change      winners       losers
          income_tax -8.188285e+09 1.722058e+07 2.200066e+07
employee_payroll_tax  0.000000e+00 2.200066e+07 2.200066e+07
    state_income_tax  0.000000e+00 2.200066e+07 2.200066e+07
                snap  0.000000e+00 0.000000e+00 0.000000e+00
                tanf  0.000000e+00 0.000000e+00 0.000000e+00`
            : `    programme_name        change      winners       losers
        income_tax -2.830008e+09 4.424946e+06 9.124488e+06
national_insurance  0.000000e+00 9.124488e+06 9.124488e+06
               vat  0.000000e+00 4.017530e+06 4.017530e+06
       council_tax  0.000000e+00 4.017530e+06 4.017530e+06
  universal_credit -1.625253e+08 0.000000e+00 5.804354e+05`,
        },
      ],
    },
    regions: {
      title: isUS ? 'Scope the US dataset to states, districts, and places' : 'Scope the UK dataset to countries and smaller regions',
      body: isUS
        ? 'Regional analysis is built into policyengine.py. The working row-filter path on the packaged US dataset uses household geography columns like state_fips, and you can then move on to district and place outputs for more detailed geography.'
        : 'Regional analysis also lives in the package. The simplest working row-filter path on the packaged UK dataset uses region, and the deeper path is weight-replaced simulations for constituencies and local authorities.',
      blocks: [
        {
          title: `${country.adjective} regional analysis`,
          language: 'python',
          code: getPolicyengineRegionalExample(country),
          output: isUS ? 'California EITC: $6.8B' : 'London universal credit: £17.3bn',
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

      <section id="advanced-notes" className="px-6 pb-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border-light bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            References
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            Keep the source-of-truth links and reproducibility boundary visible
          </h2>
          <p className="mt-3 text-sm text-text-secondary">
            policyengine.py now has an explicit reproducibility story: certified runtime bundles, release manifests, and TRACE-oriented provenance export. The practical first step in the guide is checking the bundle attached to the simulation you just ran.
          </p>
          <div className="mt-6">
            <CodeBlock
              code={getPolicyengineReleaseBundleExample()}
              language="python"
              title="Inspect the certified runtime bundle"
              output={isUS
                ? `{'bundle_id': 'us-3.4.0', 'country_id': 'us', 'policyengine_version': '3.4.0', 'model_package': 'policyengine-us', 'model_version': '1.602.0', 'data_package': 'policyengine-us-data', ...}`
                : `{'bundle_id': 'uk-3.4.0', 'country_id': 'uk', 'policyengine_version': '3.4.0', 'model_package': 'policyengine-uk', 'model_version': '2.74.0', 'data_package': 'policyengine-uk-data', ...}`}
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
              title="Certified bundles"
              body="The package pins supported model-plus-data combinations and surfaces that bundle metadata directly from simulations."
            />
            <SummaryCard
              eyebrow="Package docs"
              title="Analysis workflows"
              body="The package repo documents datasets, Simulation, entity mapping, regional scoping, and full economic impact analysis."
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
