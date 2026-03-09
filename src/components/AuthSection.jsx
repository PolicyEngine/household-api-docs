'use client';

import CodeBlock from './CodeBlock';
import { IconLock, IconKey, IconShield } from '@tabler/icons-react';

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
          The PolicyEngine household API uses OAuth 2.0 client credentials for authentication.
          Access is not public &mdash; contact{' '}
          <a href="mailto:hello@policyengine.org" className="text-primary-600 hover:text-primary-700 underline">
            hello@policyengine.org
          </a>{' '}
          to request API credentials.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-lg border border-border-light bg-white">
            <div className="flex items-center gap-3 mb-2">
              <IconKey size={20} className="text-primary-600" />
              <span className="font-semibold text-sm">1. Get credentials</span>
            </div>
            <p className="text-sm text-text-secondary">
              PolicyEngine provides a Client ID and Client Secret. These don&apos;t expire. Keep them private.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border-light bg-white">
            <div className="flex items-center gap-3 mb-2">
              <IconLock size={20} className="text-primary-600" />
              <span className="font-semibold text-sm">2. Fetch a token</span>
            </div>
            <p className="text-sm text-text-secondary">
              Exchange credentials for a Bearer token (valid ~30 days, max 100 requests/month for tokens).
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border-light bg-white">
            <div className="flex items-center gap-3 mb-2">
              <IconShield size={20} className="text-primary-600" />
              <span className="font-semibold text-sm">3. Make requests</span>
            </div>
            <p className="text-sm text-text-secondary">
              Include the Bearer token in the Authorization header of every API call.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-text-primary mb-4" id="authentication">Authentication</h3>
        <p className="text-text-secondary mb-4">
          POST your credentials to the Auth0 token endpoint to receive a JWT access token:
        </p>

        <CodeBlock code={curlExample} language="curl" title="curl" />
        <CodeBlock code={pythonExample} language="python" title="Python" />

        <h4 className="text-lg font-semibold text-text-primary mt-8 mb-3">Response</h4>
        <CodeBlock code={responseExample} language="json" title="JSON response" />
      </div>
    </section>
  );
}
