import { IconExternalLink } from '@tabler/icons-react';
import { getCountryDoc } from '@/utils/countryDocs';
import { INTEGRATION_LABELS, getAppMonogram } from '@/utils/apiApps';
import { zoneAssetPath } from '@/utils/zoneAssets';

function AppLogo({ app }) {
  if (app.logo) {
    return (
      <img
        src={zoneAssetPath(app.logo)}
        alt=""
        height={48}
        className="h-12 w-auto max-w-[200px] object-contain object-left"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-50 text-lg font-semibold text-primary-700"
    >
      {getAppMonogram(app.name)}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-border-light bg-bg-secondary px-2.5 py-0.5 text-xs font-medium text-text-secondary">
      {children}
    </span>
  );
}

export default function ApiAppCard({ app }) {
  const [evidence] = app.evidence;

  return (
    <article className="flex h-full flex-col rounded-lg border border-border-light bg-white p-5">
      <AppLogo app={app} />
      <h3 className="mt-3 text-lg font-semibold leading-snug text-text-primary">{app.name}</h3>
      <p className="text-sm text-text-secondary">{app.organization}</p>

      <p className="mt-4 text-text-secondary">{app.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {app.countries.map((countryId) => (
          <Tag key={countryId}>{getCountryDoc(countryId)?.label ?? countryId.toUpperCase()}</Tag>
        ))}
        {app.integration && <Tag>{INTEGRATION_LABELS[app.integration]}</Tag>}
      </div>

      <div className="mt-auto flex flex-col items-start gap-2 pt-5 text-sm font-semibold">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700"
        >
          Visit {app.name}
          <IconExternalLink size={14} aria-hidden="true" />
        </a>
        <a
          href={evidence.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary"
        >
          {evidence.label}
          <IconExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
