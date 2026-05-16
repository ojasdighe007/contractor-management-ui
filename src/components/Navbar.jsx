import { NavLink } from 'react-router-dom';

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
const linkActive = 'bg-slate-900 text-white';
const linkInactive = 'text-slate-700 hover:bg-slate-200';

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/sites" className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white"
            aria-hidden="true"
          >
            CM
          </span>
          <span className="text-lg font-semibold">Contractor Management</span>
        </NavLink>
        <div className="flex gap-1">
          <NavLink
            to="/sites"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Inventory
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            About
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
