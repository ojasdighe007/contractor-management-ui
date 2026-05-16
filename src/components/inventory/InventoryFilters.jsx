import { paymentStatuses, deliveryStatuses } from '../../config/statuses.js';

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-800 shadow-sm focus:border-slate-400 focus:outline-none"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function InventoryFilters({
  query = '',
  onQueryChange,
  payment = '',
  onPaymentChange,
  delivery = '',
  onDeliveryChange,
  rightSlot = null,
}) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <label className="flex min-w-[220px] flex-1 flex-col gap-1 text-xs font-medium text-slate-600">
        Search
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm focus-within:border-slate-400">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-slate-400"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3a6 6 0 104.472 10.03l3.249 3.248a1 1 0 001.414-1.414l-3.249-3.248A6 6 0 009 3zm-4 6a4 4 0 118 0 4 4 0 01-8 0z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder="Search by name, vendor, category…"
            className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </label>
      <Select
        label="Payment"
        value={payment}
        onChange={onPaymentChange ?? (() => {})}
        options={Object.values(paymentStatuses)}
      />
      <Select
        label="Delivery"
        value={delivery}
        onChange={onDeliveryChange ?? (() => {})}
        options={Object.values(deliveryStatuses)}
      />
      {rightSlot && <div className="ml-auto">{rightSlot}</div>}
    </div>
  );
}

export default InventoryFilters;
