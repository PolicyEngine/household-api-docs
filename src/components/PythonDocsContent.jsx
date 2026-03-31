'use client';

import { useCallback, useRef, useState } from 'react';
import CodeBlock from './CodeBlock';
import {
  formatHouseholdJson,
  getGenericPythonReformPattern,
  getPythonArrayExample,
  getPythonDataFrameExample,
  getPythonInstallExample,
  getPythonQuickstartExample,
  getPythonTraceExample,
  getUSMicrosimulationGeographyExample,
  getUSMicrosimulationOverviewExample,
  getUSMicrosimulationProgramExample,
  getUSMicrosimulationReformExample,
  getUSMicrosimulationWeightingExample,
  getUSPythonParametricReformExample,
  getUSPythonStructuralReformExample,
} from '@/utils/countryDocs';

const HOUSEHOLD_TOPICS = [
  { id: 'situation', label: 'Situation and calculate' },
  { id: 'arrays', label: 'Arrays and entity levels' },
  { id: 'trace', label: 'Tracing calculations' },
  { id: 'reforms', label: 'Reforms' },
  { id: 'dataframes', label: 'DataFrames and map_to' },
];

const MICROSIM_TOPICS = [
  { id: 'overview', label: 'Datasets and setup' },
  { id: 'weighting', label: 'Weighting' },
  { id: 'reforms', label: 'Baseline vs reform' },
  { id: 'geography', label: 'Geography and time' },
  { id: 'programs', label: 'Program analysis' },
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
    // Small delay so the new content renders before scrolling
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
  const [householdTopic, setHouseholdTopic] = useState('situation');
  const [microsimTopic, setMicrosimTopic] = useState('overview');

  const householdPanels = {
    situation: {
      title: 'Start with a situation, then calculate variables',
      body:
        'Define the entity structure, pass it into Simulation, and calculate the variables you care about for a period. The situation dictionary is the real API surface — most work starts with Simulation(...).calculate(...).',
      blocks: [
        {
          title: `Install ${country.pythonPackage}`,
          language: 'bash',
          code: getPythonInstallExample(country),
        },
        {
          title: 'Minimal household simulation',
          language: 'python',
          code: getPythonQuickstartExample(country),
          output: isUS
            ? 'EITC: 0.00\nHousehold net income: 41,252.64'
            : undefined,
        },
      ],
    },
    arrays: {
      title: 'Understand arrays before moving on',
      body:
        'calculate() returns NumPy arrays, not scalars. Person variables return one value per person, tax-unit or benefit-unit variables return one per unit, and household variables return one per household. Use .sum() when you want the aggregate.',
      blocks: [
        {
          title: 'Entity-level return values',
          language: 'python',
          code: getPythonArrayExample(country),
          output: isUS
            ? `Person-level array: [30000. 20000.     0.     0.]
Person-level shape: (4,)
Length: 4 (one value per person)
Result-level array: [3038.982]
Result-level shape: (1,)
Person total: 50000.0
Result total: 3038.982`
            : undefined,
        },
      ],
    },
    trace: {
      title: 'Trace explains why a result happened',
      body:
        'Trace exposes the dependency tree behind a variable so you can debug and understand the implementation. Indentation shows dependency depth, array shape reveals the entity level of each intermediate variable, and it connects the final result back to upstream policy logic.',
      blocks: [
        {
          title: 'Trace a calculation',
          language: 'python',
          code: getPythonTraceExample(country),
          output: isUS
            ? `  ctc_value<2025, (default)> = [4400.]
    ctc<2025, (default)> = [4400.]
      filer_meets_ctc_identification_requirements<2025, (default)> = [ True]
        is_tax_unit_head_or_spouse<2025, (default)> = [ True  True False False]
        meets_ctc_identification_requirements<2025, (default)> = [ True  True  True  True]
      ctc_maximum_with_arpa_addition<2025, (default)> = [4400.]
        ctc_maximum<2025, (default)> = [4400.]
        ctc_arpa_addition<2025, (default)> = [0.]
      ctc_phase_out<2025, (default)> = [0.]
        adjusted_gross_income<2025, (default)> = [50000.]
        ctc_phase_out_threshold<2025, (default)> = [400000.]
    ctc_phase_in<2025, (default)> = [7125.0005]
      ctc_phase_in_relevant_earnings<2025, (default)> = [7125.0005]
        tax_unit_earned_income<2025, (default)> = [50000.]
      ctc_social_security_tax<2025, (default)> = [3825.]
        employee_social_security_tax<2025, (default)> = [1860. 1240.    0.    0.]
        employee_medicare_tax<2025, (default)> = [435. 290.   0.   0.]
      eitc<2025, (default)> = [3038.982]
      ctc_qualifying_children<2025, (default)> = [2]
        ctc_qualifying_child<2025, (default)> = [False False  True  True]`
            : undefined,
        },
      ],
    },
    reforms: {
      title: 'Parametric and structural reforms',
      body:
        'Parametric reforms change parameter values with Reform.from_dict(...). Structural reforms replace variable logic by updating a variable class. The common path is parametric — use structural only when you need to change how a variable is calculated.',
      blocks: isUS
        ? [
            {
              title: 'Parametric reform',
              language: 'python',
              code: getUSPythonParametricReformExample(),
              output: 'Baseline CTC: 4400.0\nReformed CTC: 6000.0',
            },
            {
              title: 'Structural reform pattern',
              language: 'python',
              code: getUSPythonStructuralReformExample(),
            },
          ]
        : [
            {
              title: 'Reform pattern',
              language: 'python',
              code: getGenericPythonReformPattern(country),
            },
          ],
    },
    dataframes: {
      title: 'calculate_dataframe() is the bridge to analysis work',
      body:
        'Once you move beyond one-off calculations, calculate_dataframe() gives you a tabular output you can inspect, export, and aggregate. Without map_to, PolicyEngine chooses the longest entity needed to represent the variables — use map_to="household" or map_to="person" when you want a predictable row structure.',
      blocks: [
        {
          title: 'DataFrame workflow',
          language: 'python',
          code: getPythonDataFrameExample(country),
          output: isUS
            ? `   employment_income  adjusted_gross_income   income_tax  ctc_value  household_net_income
0            50000.0                50000.0 -5588.981934     4400.0           54290.78125`
            : undefined,
        },
      ],
    },
  };

  const microsimPanels = {
    overview: {
      title: 'Microsimulation is a dataset-backed analysis mode',
      body:
        'Simulation is for one explicit household situation. Microsimulation is for a weighted dataset representing many real households — it introduces weighted microdata, dataset choice, and economy-wide aggregation.',
      blocks: [
        {
          title: 'Microsimulation setup',
          language: 'python',
          code: getUSMicrosimulationOverviewExample(),
        },
      ],
    },
    weighting: {
      title: 'Weighting is the critical concept',
      body:
        'microsim.calculate(...).sum() is weighted automatically. calculate_dataframe(...) is not — multiply by household_weight or person_weight in pandas when working from DataFrames.',
      blocks: [
        {
          title: 'Automatic vs manual weighting',
          language: 'python',
          code: getUSMicrosimulationWeightingExample(),
        },
      ],
    },
    reforms: {
      title: 'Baseline vs reform at aggregate scale',
      body:
        'Same reform pattern as household simulation, but the output is now a weighted national impact. You compare aggregate totals, not just one household result, and can track recipient counts and total net income changes.',
      blocks: [
        {
          title: 'Aggregate reform comparison',
          language: 'python',
          code: getUSMicrosimulationReformExample(),
        },
      ],
    },
    geography: {
      title: 'Geography and time are natural extensions',
      body:
        'Group weighted DataFrames by geography for state-level analysis. Loop over years and compare baseline vs reform totals for 10-year budget windows.',
      blocks: [
        {
          title: 'State and multi-year analysis',
          language: 'python',
          code: getUSMicrosimulationGeographyExample(),
        },
      ],
    },
    programs: {
      title: 'Program analysis often needs person-level data',
      body:
        'Use map_to="person" and weight with person_weight when the question is about people rather than households. This is the pattern for enrollment-style analysis.',
      blocks: [
        {
          title: 'Program participation analysis',
          language: 'python',
          code: getUSMicrosimulationProgramExample(),
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
            PolicyEngine models tax and benefit rules for individual households. Four building blocks
            appear throughout the package:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Entities</h3>
              <p className="mt-2 text-sm text-text-secondary">
                {isUS
                  ? 'Person, tax unit, SPM unit, marital unit, family, and household. Every variable belongs to exactly one entity level.'
                  : 'Person, benefit unit, and household. Every variable belongs to exactly one entity level.'}
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Variables</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Inputs you provide (e.g. <code className="rounded bg-white px-1 py-0.5 text-xs">employment_income</code>)
                or values the model calculates (e.g. <code className="rounded bg-white px-1 py-0.5 text-xs">{isUS ? 'eitc' : 'income_tax'}</code>).
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Parameters</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Policy constants like tax rates, thresholds, and benefit amounts. Reforms work by changing parameter values.
              </p>
            </div>
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-lg font-semibold text-text-primary">Periods</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Every input and output is keyed to a time period — usually a year
                like <code className="rounded bg-white px-1 py-0.5 text-xs">2025</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="household-simulation" className="px-6 pb-10">
        <div className="mx-auto max-w-6xl">
          <TopicSection
            items={HOUSEHOLD_TOPICS}
            selected={householdTopic}
            onChange={setHouseholdTopic}
            panels={householdPanels}
          />
        </div>
      </section>

      <section id="microsimulation" className="px-6 pb-10">
        <div className="mx-auto max-w-6xl">
          {isUS ? (
            <TopicSection
              items={MICROSIM_TOPICS}
              selected={microsimTopic}
              onChange={setMicrosimTopic}
              panels={microsimPanels}
            />
          ) : (
            <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6">
              <h3 className="text-2xl font-semibold text-text-primary">Current notebook material is US-focused</h3>
              <p className="mt-3 text-sm text-text-secondary">
                The educational microsimulation notebook you pointed me to is built around the US
                package and the Enhanced CPS dataset. The concepts still apply here, but the concrete
                dataset and reform examples on this page are currently shown for the US track only.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="advanced-notes" className="px-6 pb-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border-light bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            Advanced notes
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            Keep the references and deeper paths visible
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <SummaryCard
              eyebrow="Model explorer"
              title="Variables and parameters"
              body="Users need a reliable place to look up variable names and parameter paths after the conceptual walkthrough."
            />
            <SummaryCard
              eyebrow="Package source"
              title="Implementation details"
              body="The repository is still the right destination for variable definitions, parameter structure, and source-level debugging."
            />
            <SummaryCard
              eyebrow="Notebook depth"
              title="Keep the raw notebooks too"
              body="The page should absorb the relevant lessons, but the exploratory notebooks are still useful as full worked training material."
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
              href={country.pythonRepoUrl}
              className="inline-flex rounded-lg bg-text-primary px-4 py-2 text-sm font-medium text-white"
            >
              Open {country.pythonPackage}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
