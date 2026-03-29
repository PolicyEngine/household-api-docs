import { IconApi } from '@tabler/icons-react';

export default function HeroSection({ country }) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary-100 rounded-xl">
            <IconApi size={40} className="text-primary-700" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          PolicyEngine household API
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
          Simulate tax and benefit policy outcomes for any {country.adjective} household with our
          hosted REST API, public Docker image, or the{' '}
          <code className="bg-white px-1.5 py-0.5 rounded text-base">{country.pythonPackage}</code>{' '}
          Python package for direct in-process access.
        </p>
      </div>
    </section>
  );
}
