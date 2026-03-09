'use client';

import CodeBlock from './CodeBlock';

const curlRequest = `curl --request POST \\
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

const pythonRequest = `import requests

token = "YOUR_ACCESS_TOKEN"

household = {
    "people": {
        "you": {
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

response = requests.post(
    "https://household.api.policyengine.org/us/calculate",
    json={"household": household},
    headers={"Authorization": f"Bearer {token}"},
)

result = response.json()`;

export default function RequestSection() {
  return (
    <section id="making-requests" className="py-16 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Making requests</h2>
        <p className="text-text-secondary mb-4 text-lg">
          Send a POST request to the calculate endpoint with your household object:
        </p>

        <div className="p-4 rounded-lg bg-primary-50 border border-primary-200 mb-6">
          <code className="text-sm font-mono font-semibold text-primary-800">
            POST https://household.api.policyengine.org/us/calculate
          </code>
        </div>

        <p className="text-text-secondary mb-4">
          The request body must contain a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">household</code> key
          with your household object. The response returns the same structure with all computable variables filled in.
        </p>

        <CodeBlock code={curlRequest} language="curl" title="curl" />
        <CodeBlock code={pythonRequest} language="python" title="Python" />
      </div>
    </section>
  );
}
