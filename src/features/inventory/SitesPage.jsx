import { Link } from 'react-router-dom';
import { useSites } from '../../hooks/useSites.js';
import SiteSelector from '../../components/inventory/SiteSelector.jsx';

function ProgressBar({ value }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-slate-900 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function SiteCard({ site }) {
  return (
    <Link
      to={`/sites/${site.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {site.location}
          </p>
          <h3 className="mt-0.5 text-lg font-semibold text-slate-900">{site.name}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
          {site.units} units
        </span>
      </div>
      <p className="line-clamp-2 text-sm text-slate-600">{site.description}</p>
      <div className="mt-1 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Progress</span>
          <span className="font-semibold text-slate-900">{site.progress}%</span>
        </div>
        <ProgressBar value={site.progress} />
      </div>
      <footer className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span>Site Manager: {site.manager}</span>
        <span className="font-medium text-slate-900 group-hover:underline">Open →</span>
      </footer>
    </Link>
  );
}

function SitesPage() {
  const { sites } = useSites();

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Inventory
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Choose a site
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Pick a site to drill into its building or finishing inventory. Use the
            dropdown for quick access or browse the cards below.
          </p>
        </div>
        <div className="md:w-80">
          <SiteSelector sites={sites} />
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </section>
  );
}

export default SitesPage;
