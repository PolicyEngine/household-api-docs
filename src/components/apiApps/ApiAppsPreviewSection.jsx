import ApiAppCard from './ApiAppCard';
import { API_APPS } from '@/data/apiApps';
import { getApiAppsPreview } from '@/utils/apiApps';

const PREVIEW_LIMIT = 6;

export default function ApiAppsPreviewSection({ country }) {
  const preview = getApiAppsPreview(API_APPS, country.id, PREVIEW_LIMIT);

  if (preview.length === 0) {
    return null;
  }

  return (
    <section id="built-on-policyengine-apis" className="border-b border-border-light bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold text-text-primary">Built on PolicyEngine&apos;s APIs</h2>
            <p className="text-lg text-text-secondary">
              These apps call a PolicyEngine API to calculate taxes and benefits for their users.
            </p>
          </div>
          <a
            href={`/${country.id}/api/apps`}
            className="font-semibold text-primary-600 hover:text-primary-700"
          >
            See all {API_APPS.length} apps built on PolicyEngine →
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((app) => (
            <ApiAppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}
