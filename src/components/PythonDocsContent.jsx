'use client';

import { useState } from 'react';
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

function TopicSidebar({ items, selected, onChange, title, description }) {
  return (
    <aside className="self-start rounded-2xl border border-border-light bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] lg:sticky lg:top-[calc(var(--pe-spacing-header)+1.5rem)]">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">{title}</div>
      <p className="mt-2 text-sm text-text-secondary">{description}</p>
      <div className="mt-5 space-y-2">
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
  sidebarTitle,
  sidebarDescription,
}) {
  const panel = panels[selected];
  const selectedIndex = items.findIndex((item) => item.id === selected);
  const nextItem = selectedIndex >= 0 ? items[selectedIndex + 1] : null;

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[260px,minmax(0,1fr)]">
      <TopicSidebar
        items={items}
        selected={selected}
        onChange={onChange}
        title={sidebarTitle}
        description={sidebarDescription}
      />

      <div className="rounded-2xl border border-border-light bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
              <h3 className="text-2xl font-semibold text-text-primary">{panel.title}</h3>
              <p className="mt-3 text-sm text-text-secondary">{panel.body}</p>
            </div>
            {panel.side}
          </div>
          <div>
            {panel.blocks.map((block) => (
              <CodeBlock
                key={block.title}
                code={block.code}
                language={block.language}
                title={block.title}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-primary-50 p-4">
          <div className="text-sm text-text-secondary">
            {nextItem
              ? `Next step: ${nextItem.label}`
              : 'You reached the end of this sequence.'}
          </div>
          {nextItem ? (
            <button
              type="button"
              onClick={() => onChange(nextItem.id)}
              className="inline-flex rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              Continue to {nextItem.label}
            </button>
          ) : null}
        </div>
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
        'This is the core package workflow from the household simulation notebook. Define the entity structure, pass it into Simulation, and calculate the variables you care about for a period.',
      side: (
        <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
          <h3 className="text-lg font-semibold text-text-primary">What to teach first</h3>
          <div className="mt-4 space-y-2 text-sm text-text-secondary">
            <div className="rounded-lg bg-white px-3 py-2">Install name and import path are different.</div>
            <div className="rounded-lg bg-white px-3 py-2">The situation object is the real API surface.</div>
            <div className="rounded-lg bg-white px-3 py-2">Most work starts with `Simulation(...).calculate(...)`.</div>
          </div>
        </div>
      ),
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
        },
        {
          title: 'Situation shape',
          language: 'json',
          code: formatHouseholdJson(country.step3Household),
        },
      ],
    },
    arrays: {
      title: 'Understand arrays before moving on',
      body:
        'A major point from the notebook is that calculate() returns arrays, not scalars. The length depends on the entity level of the variable you requested.',
      side: (
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
          <h3 className="text-lg font-semibold text-text-primary">Entity levels</h3>
          <div className="mt-4 space-y-2 text-sm text-text-secondary">
            <div>Person variables return one value per person.</div>
            <div>Tax-unit or benefit-unit variables return one value per unit.</div>
            <div>Household variables return one value per household.</div>
            <div>Use `.sum()` when you want the aggregate for the relevant entity.</div>
          </div>
        </div>
      ),
      blocks: [
        {
          title: 'Entity-level return values',
          language: 'python',
          code: getPythonArrayExample(country),
        },
      ],
    },
    trace: {
      title: 'Trace explains why a result happened',
      body:
        'The household notebook correctly treats trace as essential advanced usage. It exposes the dependency tree behind a variable so users can debug and understand the implementation.',
      side: (
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
          <h3 className="text-lg font-semibold text-text-primary">What trace output teaches</h3>
          <div className="mt-4 space-y-2 text-sm text-text-secondary">
            <div>Indentation shows dependency depth.</div>
            <div>Array shape reveals the entity level of each intermediate variable.</div>
            <div>It connects the final result back to upstream policy logic.</div>
          </div>
        </div>
      ),
      blocks: [
        {
          title: 'Trace a calculation',
          language: 'python',
          code: getPythonTraceExample(country),
        },
      ],
    },
    reforms: {
      title: 'Reforms belong in the main docs, not just the notebook',
      body:
        'The notebook covers both parametric reforms and structural reforms. The page should teach the common path first, then show that deeper customization exists.',
      side: (
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
          <h3 className="text-lg font-semibold text-text-primary">Two reform layers</h3>
          <div className="mt-4 space-y-2 text-sm text-text-secondary">
            <div>Parametric reforms change parameter values with `Reform.from_dict(...)`.</div>
            <div>Structural reforms replace variable logic by updating a variable class.</div>
          </div>
        </div>
      ),
      blocks: isUS
        ? [
            {
              title: 'Parametric reform',
              language: 'python',
              code: getUSPythonParametricReformExample(),
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
        'The notebook is right to surface calculate_dataframe(). Once users move beyond one-off calculations, they need a tabular output they can inspect, export, and aggregate.',
      side: (
        <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
          <h3 className="text-lg font-semibold text-text-primary">Why `map_to` matters</h3>
          <p className="mt-3 text-sm text-text-secondary">
            Without `map_to`, PolicyEngine chooses the longest entity needed to represent the variables.
            Use `map_to="household"` or `map_to="person"` when you want a predictable row structure.
          </p>
        </div>
      ),
      blocks: [
        {
          title: 'DataFrame workflow',
          language: 'python',
          code: getPythonDataFrameExample(country),
        },
      ],
    },
  };

  const microsimPanels = {
    overview: {
      title: 'Microsimulation is a dataset-backed analysis mode',
      body:
        'The microsimulation notebook is not just “bigger Simulation.” It introduces a different scale of analysis: weighted microdata, dataset choice, and economy-wide aggregation.',
      side: (
        <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5">
          <h3 className="text-lg font-semibold text-text-primary">Core distinction</h3>
          <p className="mt-3 text-sm text-text-secondary">
            `Simulation` is for one explicit household situation. `Microsimulation` is for a weighted dataset representing many real households.
          </p>
        </div>
      ),
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
        'This is the most important notebook lesson to carry into the docs. `.calculate()` aggregates are weighted automatically, while DataFrames require explicit manual weighting.',
      side: (
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
          <h3 className="text-lg font-semibold text-text-primary">The rule to remember</h3>
          <div className="mt-4 space-y-2 text-sm text-text-secondary">
            <div>`microsim.calculate(...).sum()` is weighted.</div>
            <div>`calculate_dataframe(...)` is not weighted automatically.</div>
            <div>Multiply by `household_weight` or `person_weight` in pandas when working from DataFrames.</div>
          </div>
        </div>
      ),
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
        'The microsimulation notebook uses the same reform pattern as household simulation, but the output is now a weighted national impact rather than a household-by-household comparison.',
      side: (
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
          <h3 className="text-lg font-semibold text-text-primary">What changes</h3>
          <div className="mt-4 space-y-2 text-sm text-text-secondary">
            <div>You compare aggregate totals, not just one household result.</div>
            <div>You can track recipient counts and total net income changes.</div>
          </div>
        </div>
      ),
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
        'The notebook pushes from one-year national totals into state-level analysis and 10-year budget windows. Those are exactly the advanced patterns users need once the weighting model is clear.',
      side: (
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
          <h3 className="text-lg font-semibold text-text-primary">Typical next steps</h3>
          <div className="mt-4 space-y-2 text-sm text-text-secondary">
            <div>Group weighted DataFrames by geography.</div>
            <div>Loop over years and compare baseline vs reform totals.</div>
            <div>Use pooled datasets when state sample size matters.</div>
          </div>
        </div>
      ),
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
        'The notebook closes the loop by switching to person-level DataFrames for enrollment-style analysis. This belongs in the docs because it shows how the same API supports household and person views.',
      side: (
        <div className="rounded-2xl border border-border-light bg-bg-secondary p-5">
          <h3 className="text-lg font-semibold text-text-primary">Person-level pattern</h3>
          <p className="mt-3 text-sm text-text-secondary">
            Use `map_to="person"` and weight with `person_weight` when the question is about people rather than households.
          </p>
        </div>
      ),
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
        <div className="mx-auto max-w-4xl rounded-3xl border border-border-light bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
          <div className="grid gap-5 md:grid-cols-3">
            <SummaryCard
              eyebrow="Household simulation"
              title="Single-situation modeling"
              body="Build a situation object, calculate variables, trace dependencies, compare baseline vs reform, and move into DataFrame workflows."
            />
            <SummaryCard
              eyebrow="Microsimulation"
              title="Weighted dataset analysis"
              body="Understand dataset-backed analysis, weighting, baseline vs reform aggregates, state analysis, multi-year windows, and program participation."
            />
            <SummaryCard
              eyebrow="Notebook source"
              title="Condensed from the educational notebooks"
              body="This page is meant to carry the relevant substance from household_simulation.ipynb and microsimulation.ipynb into the docs itself."
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a href="#household-simulation" className="rounded-full bg-primary-50 px-4 py-2 font-medium text-primary-700">
              Household simulation
            </a>
            <a href="#microsimulation" className="rounded-full bg-primary-50 px-4 py-2 font-medium text-primary-700">
              Microsimulation
            </a>
            <a href="#advanced-notes" className="rounded-full bg-primary-50 px-4 py-2 font-medium text-primary-700">
              Advanced notes
            </a>
          </div>
        </div>
      </section>

      <section id="household-simulation" className="px-6 pb-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border-light bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            Household simulation
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            The local Python workflow should be fully documented here
          </h2>
          <p className="mt-3 text-lg text-text-secondary">
            This section folds in the household simulation notebook material: core concepts, entity
            structure, return values, trace, reforms, and DataFrame analysis.
          </p>

          <TopicSection
            items={HOUSEHOLD_TOPICS}
            selected={householdTopic}
            onChange={setHouseholdTopic}
            panels={householdPanels}
            sidebarTitle="Household sequence"
            sidebarDescription="Move through the package in a deliberate order instead of jumping around the page."
          />
        </div>
      </section>

      <section id="microsimulation" className="px-6 pb-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-border-light bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            Microsimulation
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            Explain where household simulation stops and dataset analysis begins
          </h2>
          <p className="mt-3 text-lg text-text-secondary">
            The microsimulation notebook is mostly about weighted analysis on a research dataset.
            That distinction should be explicit in the docs, not hidden in notebooks alone.
          </p>

          {isUS ? (
            <>
              <TopicSection
                items={MICROSIM_TOPICS}
                selected={microsimTopic}
                onChange={setMicrosimTopic}
                panels={microsimPanels}
                sidebarTitle="Microsimulation sequence"
                sidebarDescription="Keep the progression explicit: setup, weighting, reform comparison, then richer aggregate analysis."
              />
            </>
          ) : (
            <div className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-6">
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
