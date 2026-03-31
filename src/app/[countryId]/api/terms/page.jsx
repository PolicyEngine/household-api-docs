import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ApiTermsDocument from '@/components/ApiTermsDocument';
import { getCountryDoc, SUPPORTED_COUNTRY_IDS } from '@/utils/countryDocs';
import { getApiTermsMarkdown } from '@/utils/apiTerms';

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
    title: 'API Terms of Service | PolicyEngine',
    description: `Terms of service for access to the PolicyEngine API for ${country.adjective} households.`,
    openGraph: {
      title: 'PolicyEngine API Terms of Service',
      description: `Terms of service for access to the PolicyEngine API for ${country.adjective} households.`,
      url: `${country.apiUrl}/terms`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'PolicyEngine API Terms of Service',
      description: `Terms of service for access to the PolicyEngine API for ${country.adjective} households.`,
    },
    alternates: {
      canonical: `${country.apiUrl}/terms`,
    },
  };
}

export default async function CountryApiTermsPage({ params }) {
  const { countryId } = await params;
  const country = getCountryDoc(countryId);

  if (!country) {
    notFound();
  }

  return (
    <>
      <Header country={country} />
      <main className="min-h-[calc(100vh-var(--pe-spacing-header))] bg-gradient-to-b from-primary-50 via-white to-bg-secondary">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
          <ApiTermsDocument markdown={getApiTermsMarkdown(countryId)} />
        </div>
      </main>
    </>
  );
}
