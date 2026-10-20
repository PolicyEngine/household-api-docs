import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ApiAppsDirectory from '@/components/apiApps/ApiAppsDirectory';
import { getCountryDoc, SUPPORTED_COUNTRY_IDS } from '@/utils/countryDocs';

export function generateStaticParams() {
  return SUPPORTED_COUNTRY_IDS.map((countryId) => ({ countryId }));
}

const TITLE = 'Apps built on PolicyEngine';
const DESCRIPTION =
  'Benefit screeners and tax calculators that use the PolicyEngine API or open-source model to calculate taxes and benefits.';

export async function generateMetadata({ params }) {
  const { countryId } = await params;
  const country = getCountryDoc(countryId);

  if (!country) {
    return {};
  }

  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${country.apiUrl}/apps`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: TITLE,
      description: DESCRIPTION,
    },
    alternates: {
      canonical: `${country.apiUrl}/apps`,
    },
  };
}

export default async function CountryApiAppsPage({ params }) {
  const { countryId } = await params;
  const country = getCountryDoc(countryId);

  if (!country) {
    notFound();
  }

  return (
    <>
      <Header country={country} />
      <main>
        <ApiAppsDirectory country={country} />
      </main>
    </>
  );
}
