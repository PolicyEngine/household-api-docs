'use client';

import { useState } from 'react';
import CodeBlock from './CodeBlock';
import {
  getCalculateRequestExamples,
  getCalculateResponseExamples,
} from '@/utils/countryDocs';

export default function OpenApiReferenceSection({ country }) {
  const requestExamples = getCalculateRequestExamples(country);
  const [selectedRequestId, setSelectedRequestId] = useState(
    requestExamples[0]?.id
  );
  const responseExamples = getCalculateResponseExamples(country);
  const [selectedResponseId, setSelectedResponseId] = useState(
    responseExamples[0]?.id
  );
  const selectedRequest =
    requestExamples.find(({ id }) => id === selectedRequestId) ??
    requestExamples[0];
  const selectedResponse =
    responseExamples.find(({ id }) => id === selectedResponseId) ??
    responseExamples[0];

  return (
    <section
      id="endpoint-reference"
      className="py-16 border-b border-border-light"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Endpoint reference
          </h2>
          <p className="text-text-secondary mb-6 text-lg">
            The calculate endpoint reference includes request body shape,
            authentication, response codes, and examples.
          </p>
        </div>

        <div className="mb-8 overflow-hidden rounded-lg border border-border-light">
          <div className="border-b border-border-light bg-gray-50 px-4 py-3">
            <h3 className="text-lg font-semibold text-text-primary">
              Request sample
            </h3>
          </div>
          <div className="grid lg:grid-cols-[240px_1fr]">
            <div className="border-b border-border-light bg-bg-secondary p-3 lg:border-b-0 lg:border-r">
              <div className="space-y-1">
                {requestExamples.map(({ id, label, requirement }) => {
                  const isSelected = selectedRequest?.id === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedRequestId(id)}
                      className={`flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        isSelected
                          ? 'bg-white font-semibold text-primary-800 shadow-sm'
                          : 'text-text-secondary hover:bg-white hover:text-text-primary'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={`inline-flex min-w-[4.75rem] shrink-0 justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          requirement === 'Required'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-text-primary'
                        }`}
                      >
                        {requirement}
                      </span>
                      <code className="min-w-0 break-all">{label}</code>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="min-w-0 p-4">
              <div className="mb-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold text-text-primary">
                    {selectedRequest?.title}
                  </h4>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                      selectedRequest?.requirement === 'Required'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-text-primary'
                    }`}
                  >
                    {selectedRequest?.requirement}
                  </span>
                </div>
                <p className="mb-3 text-sm text-text-secondary">
                  {selectedRequest?.description}
                </p>
                <dl className="mb-3 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-text-primary">Type</dt>
                    <dd className="text-text-secondary">
                      <code>{selectedRequest?.type}</code>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">
                      Default
                    </dt>
                    <dd className="text-text-secondary">
                      <code>{selectedRequest?.defaultValue}</code>
                    </dd>
                  </div>
                </dl>
                <ul className="list-disc space-y-1 pl-5 text-sm text-text-secondary">
                  {(selectedRequest?.notes ?? []).map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
              <CodeBlock
                code={selectedRequest?.code ?? '{}'}
                language="json"
                title={`${selectedRequest?.title ?? 'Request'} example`}
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border-light bg-white">
          <div className="border-b border-border-light bg-gray-50 px-4 py-3">
            <h3 className="text-lg font-semibold text-text-primary">
              Response sample
            </h3>
          </div>
          <div className="grid lg:grid-cols-[240px_1fr]">
            <div className="border-b border-border-light bg-bg-secondary p-3 lg:border-b-0 lg:border-r">
              <div className="space-y-1">
                {responseExamples.map(({ id, status, label }) => {
                  const isSelected = selectedResponse?.id === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedResponseId(id)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        isSelected
                          ? 'bg-white font-semibold text-primary-800 shadow-sm'
                          : 'text-text-secondary hover:bg-white hover:text-text-primary'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={`inline-flex min-w-12 justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          status === '200'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-text-primary'
                        }`}
                      >
                        {status}
                      </span>
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="min-w-0 p-4">
              <CodeBlock
                code={selectedResponse?.code ?? '{}'}
                language="json"
                title={selectedResponse?.title ?? 'Response sample'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
