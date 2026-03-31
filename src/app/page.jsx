export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-bg-secondary px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border-light bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
          PolicyEngine household docs
        </p>
        <h1 className="mb-4 text-4xl font-bold text-text-primary">
          Open a country guide directly
        </h1>
        <p className="mb-8 text-lg text-text-secondary">
          Country is part of the URL. Go straight to <code className="rounded bg-gray-100 px-1.5 py-0.5 text-base">/us</code>{' '}
          or <code className="rounded bg-gray-100 px-1.5 py-0.5 text-base">/uk</code>, then choose the Python package or API track there.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="/us"
            className="rounded-2xl border border-border-light bg-bg-secondary px-5 py-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50"
          >
            <div className="text-lg font-semibold text-text-primary">United States</div>
            <div className="mt-1 text-sm text-text-secondary">Open `/us`</div>
          </a>
          <a
            href="/uk"
            className="rounded-2xl border border-border-light bg-bg-secondary px-5 py-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50"
          >
            <div className="text-lg font-semibold text-text-primary">United Kingdom</div>
            <div className="mt-1 text-sm text-text-secondary">Open `/uk`</div>
          </a>
        </div>
      </div>
    </main>
  );
}
