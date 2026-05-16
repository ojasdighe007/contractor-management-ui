import { NavLink } from 'react-router-dom';

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
const linkActive = 'bg-slate-900 text-white';
const linkInactive = 'text-slate-700 hover:bg-slate-200';

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold">Contractor Management</span>
        <div className="flex gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Home
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
