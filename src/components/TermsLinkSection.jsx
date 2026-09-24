'use client';

export default function TermsLinkSection({ country }) {
  return (
    <section className="py-16 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-6">API terms and conditions</h2>
        <p className="text-text-secondary mb-8 text-lg max-w-2xl mx-auto">
          Review the terms that govern access to the hosted PolicyEngine API before requesting
          credentials or integrating the hosted endpoint. Self-hosted copies of our open-source
          software are governed by their open-source licenses, as Section 5 of the terms explains.
        </p>
        <a
          href={`/${country.id}/api/terms`}
          className="inline-flex items-center justify-center rounded-lg border-2 border-primary-500 bg-primary-500 px-5 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-600 hover:bg-primary-600"
        >
          Read API terms and conditions →
        </a>
      </div>
    </section>
  );
}
