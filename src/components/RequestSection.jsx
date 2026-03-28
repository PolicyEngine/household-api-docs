'use client';

import CodeBlock from './CodeBlock';
import { ACCESS_MODE_OPTIONS } from './accessModes';

const hostedCurlRequest = `curl --request POST \\
  --url https://household.api.policyengine.org/us/calculate \\
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "household": {
      "people": {
        "you": {
          "employment_income": { "2025": 50000 }
        }
      },
      "households": {
        "your household": {
          "members": ["you"],
          "state_name": { "2025": "CA" }
        }
      },
      "families": { "your family": { "members": ["you"] } },
      "tax_units": { "your tax unit": { "members": ["you"] } },
      "marital_units": { "your marital unit": { "members": ["you"] } },
      "spm_units": { "your spm unit": { "members": ["you"] } }
    }
  }'`;

const pythonRequest = `from policyengine_us import Simulation

household = {
    "people": {
        "you": {
            "age": {"2025": 30},
            "employment_income": {"2025": 50000},
        },
    },
    "households": {
        "your household": {
            "members": ["you"],
            "state_name": {"2025": "CA"},
        },
    },
    "families": {"your family": {"members": ["you"]}},
    "tax_units": {"your tax unit": {"members": ["you"]}},
    "marital_units": {"your marital unit": {"members": ["you"]}},
    "spm_units": {"your spm unit": {"members": ["you"]}},
}

sim = Simulation(situation=household)

results = {
    "eitc": sim.calculate("eitc", "2025")[0],
    "household_net_income": sim.calculate("household_net_income", "2025")[0],
}

print(results)`;

const dockerCurlRequest = `curl --request POST \\
  --url http://localhost:8080/us/calculate \\
  --header 'Content-Type: application/json' \\
  --data '{
    "household": {
      "people": {
        "you": {
          "employment_income": { "2025": 50000 }
        }
      },
      "households": {
        "your household": {
          "members": ["you"],
          "state_name": { "2025": "CA" }
        }
      },
      "families": { "your family": { "members": ["you"] } },
      "tax_units": { "your tax unit": { "members": ["you"] } },
      "marital_units": { "your marital unit": { "members": ["you"] } },
      "spm_units": { "your spm unit": { "members": ["you"] } }
    }
  }'`;

export default function RequestSection({ accessMode }) {
  const selectedMode =
    ACCESS_MODE_OPTIONS.find((option) => option.id === accessMode) ?? ACCESS_MODE_OPTIONS[0];

  return (
    <section id="making-requests" className="py-16 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Running a calculation</h2>
        <p className="text-text-secondary mb-4 text-lg">
          The request examples below follow your selected access path. Hosted REST, self-hosted Docker,
          and direct Python access all evaluate the same US household policies.
        </p>
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
                POST https://household.api.policyengine.org/us/calculate
              </code>
            </div>
            <p className="text-text-secondary mb-4">
              The request body must contain a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">household</code>{' '}
              key with your household object. The response returns the same structure with all computable variables
              filled in.
            </p>
            <CodeBlock code={hostedCurlRequest} language="curl" title="Hosted API request" />
          </>
        ) : accessMode === 'docker' ? (
          <>
            <p className="text-text-secondary mb-4">
              Send the same POST request to your local or self-hosted container. The public Docker image does not
              require authentication by default.
            </p>
            <div className="p-4 rounded-lg bg-primary-50 border border-primary-200 mb-6">
              <code className="text-sm font-mono font-semibold text-primary-800">
                POST http://localhost:8080/us/calculate
              </code>
            </div>
            <p className="text-text-secondary mb-4">
              The request body must contain a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">household</code>{' '}
              key with your household object. The response returns the same structure with all computable variables
              filled in.
            </p>
            <CodeBlock code={dockerCurlRequest} language="curl" title="Docker request" />
          </>
        ) : (
          <>
            <p className="text-text-secondary mb-4">
              Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">policyengine-us</code> when you want
              to call the US model directly from Python instead of going through HTTP.
            </p>
            <div className="p-4 rounded-lg bg-primary-50 border border-primary-200 mb-6">
              <code className="text-sm font-mono font-semibold text-primary-800">pip install policyengine-us</code>
            </div>
            <p className="text-text-secondary mb-4">
              Build a household object in Python, pass it to{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Simulation(situation=...)</code>, and
              calculate the variables you need directly in process.
            </p>
            <CodeBlock code={pythonRequest} language="python" title="Python package example" />
          </>
        )}
      </div>
    </section>
  );
}
