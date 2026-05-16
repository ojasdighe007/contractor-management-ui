import { NavLink } from 'react-router-dom';
import { phases } from '../../config/phases.js';
import { getToneClasses } from '../../config/statuses.js';

function PhaseSwitcher({ siteId }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
      {phases.map((phase) => {
        const tone = getToneClasses(phase.accent);
        return (
          <NavLink
            key={phase.id}
            to={`/sites/${siteId}/${phase.id}`}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive ? `${tone.pill} ring-0` : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            {phase.short ?? phase.label}
          </NavLink>
        );
      })}
    </div>
  );
}

export default PhaseSwitcher;
