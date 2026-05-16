import { Link, useParams } from 'react-router-dom';
import { useSite } from '../../hooks/useSites.js';
import { phases } from '../../config/phases.js';
import { getToneClasses } from '../../config/statuses.js';
import EmptyState from '../../components/inventory/EmptyState.jsx';

function PhaseTile({ siteId, phase }) {
  const tone = getToneClasses(phase.accent);
  return (
    <Link
      to={`/sites/${siteId}/${phase.id}`}
      className={`group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${tone.pill}`}
        >
          {phase.short?.[0] ?? phase.label[0]}
        </span>
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${tone.text}`}>
            Phase
          </p>
          <h3 className="text-lg font-semibold text-slate-900">{phase.label}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-600">{phase.description}</p>
      <p className="text-xs text-slate-500">{phase.tagline}</p>
      <span className="mt-auto self-start text-sm font-medium text-slate-900 group-hover:underline">
        Open phase →
      </span>
    </Link>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

function SiteDashboard() {
  const { siteId } = useParams();
  const { site } = useSite(siteId);

  if (!site) {
    return (
      <EmptyState
        title="Site not found"
        message="We couldn't find that site. It may have been removed or the link is incorrect."
        action={
          <Link
            to="/sites"
            className="inline-block rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Back to sites
          </Link>
        }
      />
    );
  }

  return (
    <section className="space-y-6">
      <nav className="text-xs text-slate-500">
        <Link to="/sites" className="hover:text-slate-900">
          Sites
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700">{site.name}</span>
      </nav>

      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {site.location}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {site.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">{site.description}</p>
          </div>
          <div className="rounded-xl bg-slate-50 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-wider text-slate-500">Progress</p>
            <p className="text-2xl font-bold text-slate-900">{site.progress}%</p>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-4">
          <Stat label="Manager" value={site.manager} />
          <Stat label="Phone" value={site.phone} />
          <Stat label="Started" value={new Date(site.startedOn).toLocaleDateString()} />
          <Stat
            label="Target Handover"
            value={new Date(site.targetHandover).toLocaleDateString()}
          />
        </dl>
      </header>

      <div>
        <h2 className="text-base font-semibold text-slate-900">Choose a phase</h2>
        <p className="text-sm text-slate-600">
          Drill into the inventory view tailored for that stage of construction.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {phases.map((phase) => (
          <PhaseTile key={phase.id} siteId={siteId} phase={phase} />
        ))}
      </div>
    </section>
  );
}

export default SiteDashboard;
