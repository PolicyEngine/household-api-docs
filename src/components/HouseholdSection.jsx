'use client';

import CodeBlock from './CodeBlock';
import { getAccessModeOption } from './accessModes';
import {
  formatHouseholdJson,
  getFullDockerExample,
  getFullExampleTitle,
  getFullRestExample,
} from '@/utils/countryDocs';

export default function HouseholdSection({ country, accessMode }) {
  const selectedMode = getAccessModeOption(accessMode, country);
  const fullExample = accessMode === 'rest' ? getFullRestExample(country) : getFullDockerExample(country);

  return (
    <section id="household-objects" className="py-16 border-b border-border-light bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Household payloads</h2>
        <p className="text-text-secondary mb-8 text-lg">
          The request body carries a household object that describes the people and their groupings
          for tax and benefit calculations. This structure is the same whether you call the hosted
          endpoint or the Docker container.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-border-light rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold">Level</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
                <th className="px-4 py-3 text-left font-semibold">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">Entity group</td>
                <td className="px-4 py-3 text-text-secondary">Top-level grouping category</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  &quot;people&quot;, &quot;{country.entityGroups[1]?.[0] ?? country.entityGroups[0][0]}&quot;
                </td>
              </tr>
              <tr className="border-t border-border-light bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">Entity</td>
                <td className="px-4 py-3 text-text-secondary">Named instance within a group</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  &quot;person&quot;, &quot;my household&quot;
                </td>
              </tr>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">Variable</td>
                <td className="px-4 py-3 text-text-secondary">Property of an entity</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  &quot;{country.variableExamples[0]}&quot;, &quot;{country.variableExamples[1]}&quot;
                </td>
              </tr>
              <tr className="border-t border-border-light bg-gray-50">
                <td className="px-4 py-3 font-mono text-sm">Year</td>
                <td className="px-4 py-3 text-text-secondary">Time period for the value</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">&quot;2025&quot;</td>
              </tr>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-mono text-sm">Value</td>
                <td className="px-4 py-3 text-text-secondary">Number, string, boolean, or null for outputs</td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">{country.valueExamples}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-text-primary mb-4">Entity groups</h3>
        <p className="text-text-secondary mb-4">{country.entityGroupsIntro}</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-border-light rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold">Group</th>
                <th className="px-4 py-3 text-left font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {country.entityGroups.map(([group, purpose], index) => (
                <tr
                  key={group}
                  className={index % 2 === 0 ? 'border-t border-border-light' : 'border-t border-border-light bg-gray-50'}
                >
                  <td className="px-4 py-3 font-mono text-sm">{group}</td>
                  <td className="px-4 py-3 text-text-secondary">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-text-primary mb-4">Step 1: Start with empty groups</h3>
        <CodeBlock code={formatHouseholdJson(country.step1Skeleton)} language="json" title="Empty household skeleton" />

        <h3 className="text-2xl font-semibold text-text-primary mt-10 mb-4">Step 2: Add people and assign to groups</h3>
        <p className="text-text-secondary mb-4">{country.step2Body}</p>
        <CodeBlock code={formatHouseholdJson(country.step2Household)} language="json" title={country.step2Title} />

        <h3 className="text-2xl font-semibold text-text-primary mt-10 mb-4">Step 3: Add variables and values</h3>
        <p className="text-text-secondary mb-4">
          Set input variables as <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{'{"year": value}'}</code>{' '}
          pairs. For outputs you want calculated, set the value to{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">null</code> (or simply omit the variable:
          all computable variables are returned by default).
        </p>
        <CodeBlock code={formatHouseholdJson(country.step3Household)} language="json" title={country.step3Title} />

        <h3 className="text-2xl font-semibold text-text-primary mt-10 mb-4">{country.fullExampleHeading}</h3>
        <p className="text-text-secondary mb-4">{country.fullExampleBody}</p>
        <p className="text-sm text-text-tertiary mb-4">
          Current access path:{' '}
          <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary-700">
            {selectedMode.label}
          </span>
        </p>
        <CodeBlock code={fullExample} language="python" title={getFullExampleTitle(country, accessMode)} />
      </div>
    </section>
  );
}
