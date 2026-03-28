import { IconApi } from '@tabler/icons-react';

export default function HeroSection() {
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
          Simulate tax and benefit policy outcomes for any US household with our hosted REST API,
          public Docker image, or Python packages.
        </p>
      </div>
    </section>
  );
}
