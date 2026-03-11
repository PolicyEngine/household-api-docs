import HeroSection from '@/components/HeroSection';
import AuthSection from '@/components/AuthSection';
import RequestSection from '@/components/RequestSection';
import HouseholdSection from '@/components/HouseholdSection';
import ModelLink from '@/components/ModelLink';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AuthSection />
      <RequestSection />
      <HouseholdSection />
      <ModelLink />
    </main>
  );
}
