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
  getPolicyengineHouseholdReleaseBundleExample,
  getPolicyengineHouseholdReformExample,
  getPolicyengineHouseholdVariationExample,
  getPolicyengineEnrollmentExample,
  getPolicyengineMicrosimAlignmentExample,
  getPolicyengineMappingExample,
  getPolicyenginePandasExample,
  getPolicyengineProgramExample,
  getPolicyengineRegionalExample,
  getPolicyengineReleaseBundleExample,
  getPolicyengineTimeSeriesExample,
  getPolicyengineWeightingExample,
  getPythonInstallExample,
} from '@/utils/countryDocs';

const HOUSEHOLD_TOPICS = [
  { id: 'impact', label: 'Household impact' },
  { id: 'axes', label: 'Household axes' },
  { id: 'outputs', label: 'Entity outputs' },
  { id: 'variation', label: 'Variation grids' },
  { id: 'reforms', label: 'Household reforms' },
  { id: 'reproducibility', label: 'Certified bundles' },
];

const ANALYSIS_TOPICS = [
  { id: 'setup', label: 'Datasets and setup' },
  { id: 'outputs', label: 'Entity outputs' },
  { id: 'metrics', label: 'Weights and totals' },
  { id: 'reforms', label: 'Baseline vs reform' },
  { id: 'regions', label: 'Regions and budgets' },
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
    reforms: {
      title: 'Household-level reform testing uses the same Policy objects',
      body:
        'Even for a single household, reforms are defined with Parameter, ParameterValue, and Policy. The only difference is that you pass the policy into calculate_household_impact() instead of building a second request payload. The older structural variable-override pattern still exists in the underlying country model packages, but the wrapper-level guide stays on the supported Policy path.',
      blocks: [
        {
          title: 'Baseline vs reform for one household',
          language: 'python',
          code: getPolicyengineHouseholdReformExample(country),
          output: isUS ? 'Change in net income: $1,782' : 'Change in net income: £486',
        },
      ],
    },
    reproducibility: {
      title: 'Certified runtime metadata lives on Simulation, even for one-household work',
      body:
        'The convenience household helper does not expose release metadata directly. When you need a certified bundle for a one-household analysis, run the same case through a one-row Simulation and inspect its release_bundle. That gives household work the same reproducibility boundary as microsimulation.',
      blocks: [
        {
          title: 'Get a certified bundle for a single-household simulation',
          language: 'python',
          code: getPolicyengineHouseholdReleaseBundleExample(country),
          output: isUS ? 'us-3.4.0\n1.602.0\n41352.14' : 'uk-3.4.0\n2.74.0\n25414.73',
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
            ? `{'person': 12060, 'tax_unit': 6744, 'spm_unit': 5140, 'household': 4962}
person variables: ['employment_income', 'ssi', 'medicare_cost']
tax-unit variables: ['income_tax', 'state_income_tax', 'eitc']
household variables: ['household_net_income', 'household_tax']`
            : `{'person': 10820, 'benunit': 5754, 'household': 4478}
person variables: ['employment_income', 'income_tax']
benunit variables: ['universal_credit', 'child_benefit']
household variables: ['household_net_income', 'household_tax']`,
        },
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
        {
          title: 'Work with tabular outputs and plain pandas',
          language: 'python',
          code: getPolicyenginePandasExample(country),
          output: isUS
            ? `         weight  household_net_income  household_weight
0      0.000000         167260.375000          0.000000
1  35545.347656          31364.105469      35545.347656
2      0.000000          22297.158203          0.000000
3      0.000000         144667.875000          0.000000
4      0.000000         159616.875000          0.000000
MicroSeries mean: $112,921
Plain pandas mean (unweighted): $20,929,322
Manual pandas mean: $112,921`
            : `       weight  household_net_income  household_weight
0  733.899475          22410.880859        733.899475
1  190.415878          31034.648438        190.415878
2  256.588104         104790.132812        256.588104
3   28.005545          37484.750000         28.005545
4  369.855591          47159.039062        369.855591
MicroSeries mean: £53,837
Plain pandas mean (unweighted): £64,855
Manual pandas mean: £53,837`,
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
            ? 'MicroSeries\nWeighted total EITC: $6.8B\nWeighted mean EITC: $311'
            : 'MicroSeries\nWeighted total UC: £17.3bn\nWeighted mean UC: £3,687',
        },
        {
          title: 'Compute a top-line aggregate',
          language: 'python',
          code: getPolicyengineAggregateExample(country),
          output: isUS ? 'Total EITC: $6.8B' : 'Total universal credit: £17.3bn',
        },
        {
          title: 'Person-level program enrollment',
          language: 'python',
          code: getPolicyengineEnrollmentExample(country),
          output: isUS
            ? `SNAP recipients: 54,240,120
Children in SNAP units: 15,311,027
         snap  is_child  person_weight
0    0.000000     False       0.000000
1    0.000000     False       0.000000
2    0.000000      True       0.000000
3    0.000000      True       0.000000
4  287.683167     False   35545.347656`
            : `People with UC entitlement: 13,521,395
Children with UC entitlement: 5,835,700
   universal_credit  is_child  person_weight
0          0.000000     False     733.899475
1        217.089844      True     190.415878
2        217.089844      True     190.415878
3        217.089844     False     190.415878
4        217.089844     False     190.415878`,
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
      title: isUS ? 'Regional analysis and budget windows live in the same workflow' : 'Regional analysis and budget windows live in the same workflow',
      body: isUS
        ? 'Regional analysis is built into policyengine.py. The working row-filter path on the packaged US dataset uses household geography columns like state_fips, and the time side is still just multiple dataset years plus a loop over those years.'
        : 'Regional analysis also lives in the package. The simplest working row-filter path on the packaged UK dataset uses region, and the time side is still just multiple dataset years plus a loop over those years.',
      blocks: [
        {
          title: `${country.adjective} regional analysis`,
          language: 'python',
          code: getPolicyengineRegionalExample(country),
          output: isUS ? 'California EITC: $6.8B' : 'London universal credit: £17.3bn',
        },
        {
          title: 'Multi-year reform analysis',
          language: 'python',
          code: getPolicyengineTimeSeriesExample(country),
          output: isUS ? '2026: $106.8B\n2027: $106.4B' : '2026: £20.8bn\n2027: £21.2bn',
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
            policyengine.py now has an explicit reproducibility story: certified runtime bundles, release manifests, and TRACE-oriented provenance export. The practical first step in the guide is checking the bundle attached to the simulation you just ran. The older country-package computation-log tracer is not exposed on this wrapper, so the guide keeps traceability at the certified-bundle boundary instead of showing a non-working trace cell.
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
