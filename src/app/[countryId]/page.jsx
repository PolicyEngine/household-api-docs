import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { getCountryDoc, SUPPORTED_COUNTRY_IDS } from '@/utils/countryDocs';

export function generateStaticParams() {
  return SUPPORTED_COUNTRY_IDS.map((countryId) => ({ countryId }));
}

export async function generateMetadata({ params }) {
  const { countryId } = await params;
  const country = getCountryDoc(countryId);

  if (!country) {
    return {};
  }

  return {
    title: `${country.label} PolicyEngine docs`,
    description: `Choose the Python package guide or the HTTP API guide for ${country.label}.`,
  };
}

export default async function CountryGuidePage({ params }) {
  const { countryId } = await params;
  const country = getCountryDoc(countryId);

  if (!country) {
    notFound();
  }

  return (
    <>
      <Header country={country} />
      <main className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-bg-secondary">
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
                {country.label}
              </p>
              <h1 className="mb-5 text-4xl font-bold text-text-primary md:text-5xl">
                Choose the documentation track
              </h1>
              <p className="text-lg text-text-secondary md:text-xl">
                Both tracks use the same underlying model. The difference is whether you work
                locally in Python with <code className="rounded bg-white px-1.5 py-0.5 text-base">{country.pythonPackage}</code>{' '}
                or send HTTP requests to the household API.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <a
                href={`/${country.id}/python`}
                className="rounded-3xl border border-primary-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-colors hover:border-primary-400 hover:bg-primary-50"
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
                  Python package
                </p>
                <h2 className="mb-3 text-3xl font-semibold text-text-primary">Local interactive guide</h2>
                <p className="mb-6 text-text-secondary">
                  Start with installation, imports, <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">Simulation</code>,
                  household structure, and guided examples that teach the package directly.
                </p>
                <div className="space-y-2 text-sm text-text-secondary">
                  <div>Install and import the package correctly</div>
                  <div>Learn the household and entity model</div>
                  <div>Explore calculations through short guided examples</div>
                </div>
                <span className="mt-6 inline-flex rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white">
                  Open Python guide
                </span>
              </a>

              <a
                href={`/${country.id}/api`}
                className="rounded-3xl border border-border-light bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
                  HTTP API
                </p>
                <h2 className="mb-3 text-3xl font-semibold text-text-primary">Hosted and self-hosted API docs</h2>
                <p className="mb-6 text-text-secondary">
                  Start with authentication, request payloads, hosted REST calls, and the Docker
                  image for self-hosted HTTP integrations.
                </p>
                <div className="space-y-2 text-sm text-text-secondary">
                  <div>Understand tokens, endpoints, and request bodies</div>
                  <div>Choose between hosted REST and Docker</div>
                  <div>Reuse the same payload shape across deployment paths</div>
                </div>
                <span className="mt-6 inline-flex rounded-lg bg-text-primary px-4 py-2 text-sm font-medium text-white">
                  Open API guide
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
