'use client';

import { ACCESS_MODE_OPTIONS } from './accessModes';

export default function AccessModeSelector({ accessMode, onChange }) {
  const selectedMode =
    ACCESS_MODE_OPTIONS.find((option) => option.id === accessMode) ?? ACCESS_MODE_OPTIONS[0];

  return (
    <section className="sticky top-4 z-30 px-6 -mt-8 md:-mt-10 mb-10">
      <div className="max-w-4xl mx-auto rounded-2xl border border-border-light bg-white/95 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="px-5 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 mb-2">
                Access path
              </p>
              <h2 className="text-lg font-semibold text-text-primary">
                Choose one path and the examples below stay in sync.
              </h2>
              <p className="text-sm text-text-secondary mt-1">{selectedMode.description}</p>
            </div>

            <div
              className="inline-flex flex-wrap rounded-xl border border-border-light bg-gray-50 p-1 gap-1"
              role="tablist"
              aria-label="Access path selector"
            >
              {ACCESS_MODE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={accessMode === option.id}
                  onClick={() => onChange(option.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    accessMode === option.id
                      ? 'bg-primary-600 text-white'
                      : 'text-text-secondary hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
