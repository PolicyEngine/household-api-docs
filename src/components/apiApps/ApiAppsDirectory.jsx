import { IconApps } from '@tabler/icons-react';
import ApiAppCard from './ApiAppCard';
import { API_APPS } from '@/data/apiApps';
import { partitionApiAppsByCountry } from '@/utils/apiApps';

function AppGrid({ apps }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {apps.map((app) => (
        <ApiAppCard key={app.id} app={app} />
      ))}
    </div>
  );
}

export default function ApiAppsDirectory({ country }) {
  const { local, other } = partitionApiAppsByCountry(API_APPS, country.id);

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-xl bg-primary-100 p-3">
              <IconApps size={40} className="text-primary-700" aria-hidden="true" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">
            Apps built on PolicyEngine
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary md:text-xl">
            These products calculate taxes and benefits for the people who use them with
            PolicyEngine, through the API or by running the open-source model. Each card links to
            the app and to its maker&apos;s own page on how it uses PolicyEngine.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`/${country.id}/api`}
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary-500 bg-primary-500 px-5 py-3 font-semibold text-white transition-colors hover:border-primary-600 hover:bg-primary-600"
            >
              Read the API docs
            </a>
            <a
              href="#add-your-app"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary-500 bg-white px-5 py-3 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            >
              Add your app
            </a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            Serving the {country.label}
          </h2>
          {local.length > 0 ? (
            <AppGrid apps={local} />
          ) : (
            <p className="text-text-secondary">
              No {country.adjective} apps are listed yet. Yours could be the first.
            </p>
          )}
        </div>
      </section>

      {other.length > 0 && (
        <section className="pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-2xl font-bold text-text-primary">In other countries</h2>
            <AppGrid apps={other} />
          </div>
        </section>
      )}

      <section id="add-your-app" className="scroll-mt-24 bg-bg-secondary py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-primary">Add your app</h2>
          <p className="text-lg text-text-secondary">
            If your product uses the PolicyEngine API or model, email{' '}
            <a
              href="mailto:hello@policyengine.org?subject=List%20my%20app%20built%20on%20PolicyEngine"
              className="text-primary-600 underline hover:text-primary-700"
            >
              hello@policyengine.org
            </a>{' '}
            with its name, a link, one sentence on what it does, and a public page that mentions
            PolicyEngine. We list an app once its makers agree to be listed.
          </p>
        </div>
      </section>
    </>
  );
}
