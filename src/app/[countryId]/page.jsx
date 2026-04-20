import { notFound } from 'next/navigation';
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

  const target = `/${country.id}/api/`;

  return {
    title: `${country.label} PolicyEngine docs`,
    description: `Choose the Python package guide or the HTTP API guide for ${country.label}.`,
    alternates: { canonical: target },
    robots: { index: false, follow: true },
    other: { refresh: `0; url=${target}` },
  };
}

export default async function CountryGuidePage({ params }) {
  const { countryId } = await params;
  const country = getCountryDoc(countryId);

  if (!country) {
    notFound();
  }

  const target = `/${country.id}/api/`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-secondary p-8 text-text-secondary">
      <p>
        Redirecting to the <a href={target} className="text-primary-600 underline">{country.label} API guide</a>.
      </p>
    </main>
  );
}
