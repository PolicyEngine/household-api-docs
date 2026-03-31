export default function PythonHeroSection({ country }) {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
          Python package guide
        </p>
        <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">
          Learn {country.pythonPackage} through guided examples
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-text-secondary md:text-xl">
          This track is for local Python workflows. It focuses on the install path, the import path,
          <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-base">{country.pythonPackage}</code>
          and <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-base">{country.pythonImport}</code>,
          household structure, and short interactive examples that teach what the package can do.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl gap-4 rounded-2xl border border-primary-200 bg-white p-5 text-left shadow-[0_12px_24px_rgba(15,23,42,0.06)] md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Install</div>
            <div className="mt-2 text-sm text-text-secondary">
              <code className="rounded bg-bg-secondary px-1.5 py-0.5">{country.pythonPackage}</code>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Import</div>
            <div className="mt-2 text-sm text-text-secondary">
              <code className="rounded bg-bg-secondary px-1.5 py-0.5">{country.pythonImport}</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
