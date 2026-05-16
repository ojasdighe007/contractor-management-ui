import { useNavigate } from 'react-router-dom';

function SiteSelector({ sites, value = '', placeholder = 'Jump to a site…' }) {
  const navigate = useNavigate();

  function onChange(event) {
    const id = event.target.value;
    if (id) navigate(`/sites/${id}`);
  }

  return (
    <label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus-within:border-slate-400">
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4 text-slate-400"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      <select
        className="w-full bg-transparent text-slate-800 focus:outline-none"
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {sites.map((site) => (
          <option key={site.id} value={site.id}>
            {site.name} — {site.location}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SiteSelector;
