function EmptyState({ title = 'Nothing here yet', message, action = null, icon = null }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      {icon ?? (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path
              d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {message && <p className="max-w-md text-sm text-slate-600">{message}</p>}
      {action}
    </div>
  );
}

export default EmptyState;
