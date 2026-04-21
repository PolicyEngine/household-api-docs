export default function PythonHeroSection({ country }) {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
          Python package guide
        </p>
        <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">
          <code className="rounded bg-white px-2 py-1 text-4xl md:text-5xl">policyengine.py</code> for {country.adjective} tax and benefit analysis
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary md:text-xl">
          Reference examples covering household impact, policy reforms, microsimulation over calibrated microdata, and regional breakdowns.
        </p>
      </div>
    </section>
  );
}
