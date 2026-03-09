import HeroSection from '@/components/HeroSection';
import AuthSection from '@/components/AuthSection';
import RequestSection from '@/components/RequestSection';
import HouseholdSection from '@/components/HouseholdSection';
import VariableExplorer from '@/components/VariableExplorer';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AuthSection />
      <RequestSection />
      <HouseholdSection />
      <VariableExplorer />
    </main>
  );
}
