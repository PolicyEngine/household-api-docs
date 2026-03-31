import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ApiDocsContent from '@/components/ApiDocsContent';
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
    title: 'PolicyEngine household API documentation',
    description: `Documentation for the PolicyEngine household API — simulate tax and benefit policy outcomes for ${country.adjective} households.`,
    openGraph: {
      title: 'PolicyEngine household API',
      description: `Simulate tax and benefit policy outcomes for ${country.adjective} households using the PolicyEngine REST API.`,
      url: country.apiUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'PolicyEngine household API',
      description: `Simulate tax and benefit policy outcomes for ${country.adjective} households using the PolicyEngine REST API.`,
    },
    alternates: {
      canonical: country.apiUrl,
    },
  };
}

export default async function CountryApiPage({ params }) {
  const { countryId } = await params;
  const country = getCountryDoc(countryId);

  if (!country) {
    notFound();
  }

  return (
    <>
      <Header country={country} />
      <main>
        <HeroSection country={country} />
        <ApiDocsContent country={country} />
      </main>
    </>
  );
}
