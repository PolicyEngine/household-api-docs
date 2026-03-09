'use client';

import { useState, useEffect, useMemo } from 'react';
import { IconSearch, IconLoader2, IconAlertTriangle } from '@tabler/icons-react';

const METADATA_URL = 'https://household.api.policyengine.org/us/metadata';
const PAGE_SIZE = 20;

function VariableCard({ name, variable }) {
  return (
    <div className="p-4 rounded-lg border border-border-light bg-white hover:border-primary-300 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <code className="text-sm font-mono font-semibold text-primary-700 break-all">{name}</code>
        <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-text-secondary">
          {variable.entity}
        </span>
      </div>
      <p className="text-sm text-text-secondary line-clamp-2 mb-2">
        {variable.label || variable.description || 'No description available'}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-text-tertiary">
        {variable.unit && (
          <span className="px-2 py-0.5 rounded bg-gray-50">{variable.unit}</span>
        )}
        {variable.definitionPeriod && (
          <span className="px-2 py-0.5 rounded bg-gray-50">{variable.definitionPeriod}</span>
        )}
        {variable.valueType && (
          <span className="px-2 py-0.5 rounded bg-gray-50">{variable.valueType}</span>
        )}
      </div>
    </div>
  );
}

function ParameterCard({ name, parameter }) {
  return (
    <div className="p-4 rounded-lg border border-border-light bg-white hover:border-primary-300 transition-colors">
      <code className="text-sm font-mono font-semibold text-primary-700 break-all block mb-2">{name}</code>
      <p className="text-sm text-text-secondary line-clamp-2 mb-2">
        {parameter.label || parameter.description || 'No description available'}
      </p>
      {parameter.unit && (
        <span className="text-xs px-2 py-0.5 rounded bg-gray-50 text-text-tertiary">{parameter.unit}</span>
      )}
    </div>
  );
}

export default function VariableExplorer() {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('variables');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetch(METADATA_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMetadata(data.result || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!metadata) return [];
    const source = tab === 'variables' ? metadata.variables : metadata.parameters;
    if (!source) return [];
    const entries = Object.entries(source);
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(([name, item]) => {
      return (
        name.toLowerCase().includes(q) ||
        (item.label && item.label.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q))
      );
    });
  }, [metadata, search, tab]);

  const visible = filtered.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, tab]);

  return (
    <section id="variable-explorer" className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-text-primary mb-4">Variable and parameter explorer</h2>
        <p className="text-text-secondary mb-8 text-lg">
          Browse the full list of variables and parameters available in the US tax-benefit model.
          Use variable names as keys in your household object.
        </p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab('variables')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'variables'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            Variables
          </button>
          <button
            onClick={() => setTab('parameters')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'parameters'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            Parameters
          </button>
        </div>

        <div className="relative mb-6">
          <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder={`Search ${tab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border-light bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400"
          />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16 text-text-secondary">
            <IconLoader2 size={24} className="animate-spin mr-2" />
            Loading metadata...
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <IconAlertTriangle size={18} />
            Failed to load metadata: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-sm text-text-tertiary mb-4">
              {filtered.length.toLocaleString()} {tab} found
              {search && ` matching "${search}"`}
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {visible.map(([name, item]) =>
                tab === 'variables' ? (
                  <VariableCard key={name} name={name} variable={item} />
                ) : (
                  <ParameterCard key={name} name={name} parameter={item} />
                ),
              )}
            </div>
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="px-6 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Show more ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
