'use client';

import { useId, useRef } from 'react';
import { ACCESS_MODE_OPTIONS, getAccessModeOption } from './accessModes';

export default function AccessModeSelector({ accessMode, onChange }) {
  const selectedMode = getAccessModeOption(accessMode);
  const selectorLabelId = useId();
  const optionRefs = useRef([]);

  function moveFocus(nextIndex) {
    const option = ACCESS_MODE_OPTIONS[nextIndex];
    if (!option) {
      return;
    }

    onChange(option.id);
    optionRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(event, index) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();
    const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = (index + delta + ACCESS_MODE_OPTIONS.length) % ACCESS_MODE_OPTIONS.length;
    moveFocus(nextIndex);
  }

  return (
    <section className="sticky top-4 z-30 px-6 -mt-8 md:-mt-10 mb-10">
      <div className="max-w-4xl mx-auto rounded-2xl border border-border-light bg-white/95 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="px-5 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p
                id={selectorLabelId}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 mb-2"
              >
                Access path
              </p>
              <h2 className="text-lg font-semibold text-text-primary">
                Choose one path and the examples below stay in sync.
              </h2>
              <p className="text-sm text-text-secondary mt-1">{selectedMode.description}</p>
            </div>

            <div
              className="inline-flex flex-wrap rounded-xl border border-border-light bg-gray-50 p-1 gap-1"
              role="radiogroup"
              aria-labelledby={selectorLabelId}
            >
              {ACCESS_MODE_OPTIONS.map((option, index) => (
                <button
                  key={option.id}
                  type="button"
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  role="radio"
                  aria-checked={accessMode === option.id}
                  tabIndex={accessMode === option.id ? 0 : -1}
                  onClick={() => onChange(option.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
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
