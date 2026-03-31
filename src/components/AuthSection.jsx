'use client';

import { IconKey, IconLock } from '@tabler/icons-react';
import CodeBlock from './CodeBlock';
import { getAccessModeOption } from './accessModes';
import {
  getDockerExample,
  getDockerSmokeTestExample,
  getHostedTokenCurlExample,
  getHostedTokenPythonExample,
  getTokenResponseExample,
} from '@/utils/countryDocs';

export default function AuthSection({ country, accessMode }) {
  const selectedMode = getAccessModeOption(accessMode, country);

  return (
    <section id="getting-started" className="py-16 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Getting started</h2>
        <p className="text-text-secondary mb-8 text-lg">
          The HTTP interface has two paths: the hosted API and the self-hosted Docker image. Start
          with Docker if you want to make requests immediately on your own machine. Use the hosted
          API when you want PolicyEngine-managed infrastructure and issued credentials.
        </p>

        <div className="grid gap-4 md:grid-cols-2 mb-12">
          <div className="p-4 rounded-lg border border-border-light bg-white">
            <div className="flex items-center gap-3 mb-2">
              <IconKey size={20} className="text-primary-600" />
              <span className="font-semibold text-sm">Hosted API</span>
            </div>
            <p className="text-sm text-text-secondary">
              Use our managed endpoint with OAuth credentials issued by PolicyEngine.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border-light bg-white">
            <div className="flex items-center gap-3 mb-2">
              <IconLock size={20} className="text-primary-600" />
              <span className="font-semibold text-sm">Docker image</span>
            </div>
            <p className="text-sm text-text-secondary">
              Run the same household API yourself via GitHub Container Registry, without waiting for credentials.
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-2xl border border-primary-200 bg-primary-50 p-5">
          <h3 className="text-lg font-semibold text-text-primary mb-2">Need direct Python access?</h3>
          <p className="text-text-secondary mb-3">
            The package guide is now separate from the API docs. Use{' '}
            <code className="bg-white px-1.5 py-0.5 rounded text-sm">{country.pythonPackage}</code>{' '}
            when you want to work locally with <code className="bg-white px-1.5 py-0.5 rounded text-sm">Simulation</code>{' '}
            instead of sending HTTP requests.
          </p>
          <a
            href={`/${country.id}/python`}
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Open Python package guide
          </a>
        </div>

        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm border border-border-light rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold">Option</th>
                <th className="px-4 py-3 text-left font-semibold">Best for</th>
                <th className="px-4 py-3 text-left font-semibold">Authentication</th>
                <th className="px-4 py-3 text-left font-semibold">Wait time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border-light">
                <td className="px-4 py-3 font-medium">Hosted API</td>
                <td className="px-4 py-3 text-text-secondary">Managed infrastructure and remote HTTP access</td>
                <td className="px-4 py-3 text-text-secondary">OAuth client credentials</td>
                <td className="px-4 py-3 text-text-secondary">Requires requesting access</td>
              </tr>
              <tr className="border-t border-border-light bg-gray-50">
                <td className="px-4 py-3 font-medium">Docker image</td>
                <td className="px-4 py-3 text-text-secondary">Self-hosting the HTTP API on your own machine or infrastructure</td>
                <td className="px-4 py-3 text-text-secondary">None by default</td>
                <td className="px-4 py-3 text-text-secondary">Immediate</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-text-primary mb-4">Selected access path</h3>
        <p className="text-text-secondary mb-6">
          The page is currently showing <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{selectedMode.label}</code>{' '}
          examples. Use the sticky selector above to switch the whole page into a different integration path.
        </p>

        {accessMode === 'rest' ? (
          <div className="mb-12">
            <div className="p-5 rounded-lg border border-border-light bg-white mb-4">
              <h4 className="text-lg font-semibold text-text-primary mb-3">Hosted REST API</h4>
              <p className="text-text-secondary mb-3">
                Use PolicyEngine&apos;s managed HTTP endpoint if you want a hosted integration rather than
                running the API yourself. This path requires OAuth client credentials issued by PolicyEngine.
              </p>
              <p className="text-sm text-text-secondary">
                Contact{' '}
                <a
                  href="mailto:hello@policyengine.org"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  hello@policyengine.org
                </a>{' '}
                to request API credentials.
              </p>
            </div>

            <CodeBlock code={getHostedTokenCurlExample()} language="curl" title="Fetch an access token" />
            <CodeBlock code={getHostedTokenPythonExample()} language="python" title="Fetch an access token in Python" />
            <CodeBlock code={getTokenResponseExample()} language="json" title="Token response" />
          </div>
        ) : accessMode === 'docker' ? (
          <div className="mb-12">
            <div className="p-5 rounded-lg border border-border-light bg-primary-50 mb-4">
              <h4 className="text-lg font-semibold text-text-primary mb-3">Public Docker image</h4>
              <p className="text-text-secondary mb-3">
                Run the household API locally or on your own infrastructure using the public container
                image. The image uses the same REST interface as the hosted API, so you can send the
                same request body to <code className="bg-white px-1.5 py-0.5 rounded text-sm">{country.dockerCalculateUrl}</code>.
              </p>
              <p className="text-sm text-text-secondary">
                <a
                  href="https://github.com/PolicyEngine/policyengine-household-api/pkgs/container/policyengine-household-api"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  GitHub Container Registry
                </a>{' '}·{' '}
                <a
                  href="https://github.com/PolicyEngine/policyengine-household-api/blob/main/config/README.md"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  configuration docs
                </a>
              </p>
            </div>

            <CodeBlock code={getDockerExample()} language="bash" title="Docker (same HTTP API, self-hosted)" />
            <CodeBlock code={getDockerSmokeTestExample()} language="bash" title="Quick Docker smoke test (service metadata)" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
