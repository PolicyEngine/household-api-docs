import { COUNTRY_SELECTOR_OPTIONS } from '@/utils/countryDocs';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border-light bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
          PolicyEngine household API
        </p>
        <h1 className="mb-4 text-4xl font-bold text-text-primary">
          Choose a country-specific API guide
        </h1>
        <p className="mb-8 text-lg text-text-secondary">
          The household API docs are organized by country so the package names, endpoints, and
          example households stay aligned with the relevant model.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {COUNTRY_SELECTOR_OPTIONS.map((country) => (
            <a
              key={country.id}
              href={`/${country.id}/api`}
              className="rounded-2xl border border-border-light bg-bg-secondary px-5 py-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50"
            >
              <div className="text-lg font-semibold text-text-primary">{country.label}</div>
              <div className="mt-1 text-sm text-text-secondary">Open the {country.id.toUpperCase()} API guide</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
