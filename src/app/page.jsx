import Link from 'next/link';

const DOCS_TRACKS = [
  {
    title: 'API docs',
    description: 'HTTP endpoints, request structure, and hosted/self-hosted usage.',
    links: [
      { href: '/us/api', label: 'United States API' },
      { href: '/uk/api', label: 'United Kingdom API' },
    ],
  },
  {
    title: 'Python docs',
    description: 'Direct `policyengine` package usage, release bundles, and TRACE workflows.',
    links: [
      { href: '/us/python', label: 'United States Python' },
      { href: '/uk/python', label: 'United Kingdom Python' },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            PolicyEngine household docs
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Choose the docs track you need
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Start with the household API if you want an HTTP surface. Start with
            the Python docs if you want direct package usage and reproducibility
            tooling.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {DOCS_TRACKS.map((track) => (
            <section
              key={track.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-slate-950">{track.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {track.description}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {track.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-base font-medium text-slate-900 transition hover:border-sky-300 hover:bg-sky-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
