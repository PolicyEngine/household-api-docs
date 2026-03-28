'use client';

import CodeBlock from './CodeBlock';
import { IconLock, IconKey, IconShield } from '@tabler/icons-react';

const dockerExample = `docker pull ghcr.io/policyengine/policyengine-household-api:latest
docker run --rm -p 8080:8080 ghcr.io/policyengine/policyengine-household-api:latest`;

const pythonModelExample = `pip install policyengine-us`;

const pythonToolkitExample = `pip install "policyengine[us]"`;

const curlExample = `curl --request POST \\
  --url https://policyengine.uk.auth0.com/oauth/token \\
  --header 'Content-Type: application/json' \\
  --data '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "audience": "https://household.api.policyengine.org",
    "grant_type": "client_credentials"
  }'`;

const pythonExample = `import requests

response = requests.post(
    "https://policyengine.uk.auth0.com/oauth/token",
    json={
        "client_id": "YOUR_CLIENT_ID",
        "client_secret": "YOUR_CLIENT_SECRET",
        "audience": "https://household.api.policyengine.org",
        "grant_type": "client_credentials",
    },
)

token = response.json()["access_token"]`;

const responseExample = `{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6...",
  "token_type": "Bearer"
}`;

export default function AuthSection() {
  return (
    <section id="getting-started" className="py-16 border-b border-border-light">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-text-primary mb-6">Getting started</h2>
        <p className="text-text-secondary mb-8 text-lg">
          You can use PolicyEngine three ways: our hosted API, the public household API Docker image,
          or our Python packages. If you want to start immediately, use Docker or Python. If you want
          a managed hosted endpoint, request API credentials.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
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
          <div className="p-4 rounded-lg border border-border-light bg-white">
            <div className="flex items-center gap-3 mb-2">
              <IconShield size={20} className="text-primary-600" />
              <span className="font-semibold text-sm">Python packages</span>
            </div>
            <p className="text-sm text-text-secondary">
              Call the US model directly from Python if you do not need an HTTP layer.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-text-primary mb-4">Self-serve without waiting</h3>
        <p className="text-text-secondary mb-6">
          These public options do not require an API key request.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-lg border border-border-light bg-primary-50">
            <h4 className="text-lg font-semibold text-text-primary mb-3">Public Docker image</h4>
            <p className="text-text-secondary mb-3">
              Run the household API locally or on your own infrastructure using the public container
              image. The image uses the same REST interface as the hosted API, so you can send the
              same request body to <code className="bg-white px-1.5 py-0.5 rounded text-sm">http://localhost:8080/us/calculate</code>.
            </p>
            <p className="text-sm text-text-secondary">
              <a
                href="https://github.com/PolicyEngine/policyengine-household-api/pkgs/container/policyengine-household-api"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                GitHub Container Registry
              </a>{' '}
              {' '}·{' '}
              <a
                href="https://github.com/PolicyEngine/policyengine-household-api/blob/main/config/README.md"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                configuration docs
              </a>
            </p>
          </div>

          <div className="p-5 rounded-lg border border-border-light bg-white">
            <h4 className="text-lg font-semibold text-text-primary mb-3">Python packages</h4>
            <p className="text-text-secondary mb-3">
              Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">policyengine-us</code> for
              direct access to the US model in Python 3.11+, or <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">policyengine[us]</code>{' '}
              for the higher-level analysis toolkit in Python 3.13+.
            </p>
            <p className="text-sm text-text-secondary">
              <a
                href="https://github.com/PolicyEngine/policyengine-us"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                policyengine-us
              </a>{' '}
              {' '}·{' '}
              <a
                href="https://github.com/PolicyEngine/policyengine.py"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                policyengine.py
              </a>
            </p>
          </div>
        </div>

        <CodeBlock code={dockerExample} language="bash" title="Docker (same HTTP API, self-hosted)" />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <CodeBlock code={pythonModelExample} language="bash" title="Direct US model (Python 3.11+)" />
          <CodeBlock code={pythonToolkitExample} language="bash" title="Higher-level toolkit (Python 3.13+)" />
        </div>

        <h3 className="text-2xl font-semibold text-text-primary mb-4" id="authentication">Hosted API authentication</h3>
        <p className="text-text-secondary mb-4">
          If you want PolicyEngine to host the API for you, the managed endpoint uses OAuth 2.0
          client credentials. Contact{' '}
          <a href="mailto:hello@policyengine.org" className="text-primary-600 hover:text-primary-700 underline">
            hello@policyengine.org
          </a>{' '}
          to request API credentials, then POST those credentials to the Auth0 token endpoint to receive a JWT access token:
        </p>

        <CodeBlock code={curlExample} language="curl" title="curl" />
        <CodeBlock code={pythonExample} language="python" title="Python" />

        <h4 className="text-lg font-semibold text-text-primary mt-8 mb-3">Response</h4>
        <CodeBlock code={responseExample} language="json" title="JSON response" />
      </div>
    </section>
  );
}
