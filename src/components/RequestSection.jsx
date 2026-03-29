'use client';

import CodeBlock from './CodeBlock';
import { getAccessModeOption } from './accessModes';
import {
  getDockerCurlRequest,
  getHostedCurlRequest,
  getPythonInstallExample,
  getPythonRequestExample,
} from '@/utils/countryDocs';

export default function RequestSection({ country, accessMode }) {
  const selectedMode = getAccessModeOption(accessMode, country);

  return (
    <section id="making-requests" className="py-16 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Running a calculation</h2>
        <p className="text-text-secondary mb-4 text-lg">{country.requestSummary}</p>
        <p className="text-sm text-text-tertiary mb-6">
          Current access path:{' '}
          <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary-700">
            {selectedMode.label}
          </span>
        </p>

        {accessMode === 'rest' ? (
          <>
            <p className="text-text-secondary mb-4">
              Send a POST request to the hosted calculate endpoint with your household object and a bearer token.
            </p>
            <div className="p-4 rounded-lg bg-primary-50 border border-primary-200 mb-6">
              <code className="text-sm font-mono font-semibold text-primary-800">
                POST {country.hostedCalculateUrl}
              </code>
            </div>
            <p className="text-text-secondary mb-4">
              The request body must contain a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">household</code>{' '}
              key with your household object. The response returns the same structure with all computable variables
              filled in under the top-level <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">result</code> field.
            </p>
            <CodeBlock code={getHostedCurlRequest(country)} language="curl" title="Hosted API request" />
          </>
        ) : accessMode === 'docker' ? (
          <>
            <p className="text-text-secondary mb-4">
              Send the same POST request to your local or self-hosted container. The public Docker image does not
              require authentication by default.
            </p>
            <div className="p-4 rounded-lg bg-primary-50 border border-primary-200 mb-6">
              <code className="text-sm font-mono font-semibold text-primary-800">
                POST {country.dockerCalculateUrl}
              </code>
            </div>
            <p className="text-text-secondary mb-4">
              The request body must contain a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">household</code>{' '}
              key with your household object. The response returns the same structure with all computable variables
              filled in under the top-level <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">result</code> field.
            </p>
            <CodeBlock code={getDockerCurlRequest(country)} language="curl" title="Docker request" />
          </>
        ) : (
          <>
            <p className="text-text-secondary mb-4">
              Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{country.pythonPackage}</code> when you want
              to call the {country.adjective} model directly from Python instead of going through HTTP.
            </p>
            <CodeBlock code={getPythonInstallExample(country)} language="bash" title={`Install ${country.pythonPackage}`} />
            <p className="text-text-secondary mb-4">
              Build a household object in Python, pass it to{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Simulation(situation=...)</code>, and
              calculate the variables you need directly in process.
            </p>
            <CodeBlock code={getPythonRequestExample(country)} language="python" title="Python package example" />
          </>
        )}
      </div>
    </section>
  );
}
