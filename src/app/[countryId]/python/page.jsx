import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import PythonDocsContent from '@/components/PythonDocsContent';
import PythonHeroSection from '@/components/PythonHeroSection';
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
    title: `${country.pythonPackage} documentation`,
    description: `Interactive Python package documentation for ${country.label} household simulations.`,
    alternates: {
      canonical: `/${country.id}/python`,
    },
  };
}

export default async function CountryPythonPage({ params }) {
  const { countryId } = await params;
  const country = getCountryDoc(countryId);

  if (!country) {
    notFound();
  }

  return (
    <>
      <Header country={country} />
      <main>
        <PythonHeroSection country={country} />
        <PythonDocsContent country={country} />
      </main>
    </>
  );
}
