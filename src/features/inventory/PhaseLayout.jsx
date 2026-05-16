import { Link, useParams } from 'react-router-dom';
import { useSite } from '../../hooks/useSites.js';
import { getPhase } from '../../config/phases.js';
import { getToneClasses } from '../../config/statuses.js';
import PhaseSwitcher from '../../components/inventory/PhaseSwitcher.jsx';
import EmptyState from '../../components/inventory/EmptyState.jsx';
import { getPhaseView } from './phaseRegistry.js';

function PhaseLayout() {
  const { siteId, phaseId } = useParams();
  const { site } = useSite(siteId);
  const phase = getPhase(phaseId);
  const View = getPhaseView(phaseId);

  if (!site) {
    return (
      <EmptyState
        title="Site not found"
        message="We couldn't find that site. The link may be incorrect."
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

  if (!phase || !View) {
    return (
      <EmptyState
        title="Phase not available"
        message={`No view is registered for "${phaseId}". Add it to phaseRegistry.js to enable.`}
        action={
          <Link
            to={`/sites/${siteId}`}
            className="inline-block rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Back to site
          </Link>
        }
      />
    );
  }

  const tone = getToneClasses(phase.accent);

  return (
    <section className="space-y-5">
      <nav className="text-xs text-slate-500">
        <Link to="/sites" className="hover:text-slate-900">
          Sites
        </Link>
        <span className="mx-1.5">/</span>
        <Link to={`/sites/${siteId}`} className="hover:text-slate-900">
          {site.name}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700">{phase.short ?? phase.label}</span>
      </nav>

      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${tone.text}`}>
            {phase.label}
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {site.name}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{phase.description}</p>
        </div>
        <PhaseSwitcher siteId={siteId} />
      </header>

      <View />
    </section>
  );
}

export default PhaseLayout;
