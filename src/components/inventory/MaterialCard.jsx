import { useState } from 'react';
import StockMeter from './StockMeter.jsx';
import PaymentBadge from './PaymentBadge.jsx';
import DeliveryStatusBadge from './DeliveryStatusBadge.jsx';
import {
  getAggregatedDeliveryStatus,
  getAggregatedPaymentStatus,
  getEarliestETA,
  getTotalOnHand,
  getVendors,
  isMultiVendor,
} from '../../lib/material.js';

const CATEGORY_ICONS = {
  Cement: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M5 7l7-4 7 4v10l-7 4-7-4V7zm7-1.7L7.4 7 12 9.7 16.6 7 12 5.3zM6.5 8.7v7.7L11 19V11.4L6.5 8.7zm6 10.3l4.5-2.6V8.7L12.5 11.4V19z"
        fill="currentColor"
      />
    </svg>
  ),
  Steel: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor" />
    </svg>
  ),
  Bricks: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M3 5h6v4H3V5zm7 0h11v4H10V5zM3 10h11v4H3v-4zm12 0h6v4h-6v-4zM3 15h6v4H3v-4zm7 0h11v4H10v-4z"
        fill="currentColor"
      />
    </svg>
  ),
  Sand: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M3 19l9-14 9 14H3zm3.6-2h10.8L12 8.6 6.6 17z" fill="currentColor" />
    </svg>
  ),
  Aggregate: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <circle cx="7" cy="9" r="3" fill="currentColor" />
      <circle cx="15" cy="8" r="2.4" fill="currentColor" />
      <circle cx="11" cy="15" r="3.4" fill="currentColor" />
      <circle cx="18" cy="15" r="2" fill="currentColor" />
    </svg>
  ),
  Blocks: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="4" width="8" height="6" rx="1" fill="currentColor" />
      <rect x="13" y="4" width="8" height="6" rx="1" fill="currentColor" />
      <rect x="3" y="14" width="8" height="6" rx="1" fill="currentColor" />
      <rect x="13" y="14" width="8" height="6" rx="1" fill="currentColor" />
    </svg>
  ),
};

function CategoryIcon({ category }) {
  const icon = CATEGORY_ICONS[category];
  if (icon) return icon;
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
  });
}

function VendorRow({ vendor, unit }) {
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-slate-100 bg-slate-50/60 p-2.5 text-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-900">{vendor.name}</p>
          <p className="text-[11px] text-slate-500">
            {(vendor.onHand ?? 0).toLocaleString()} {unit} · ETA{' '}
            {formatDate(vendor.expectedDate)}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end gap-1">
          <PaymentBadge status={vendor.paymentStatus} size="xs" />
          <DeliveryStatusBadge status={vendor.deliveryStatus} size="xs" />
        </div>
      </div>
      {vendor.notes && <p className="text-[11px] text-slate-600">{vendor.notes}</p>}
    </li>
  );
}

function MaterialCard({ item }) {
  const vendors = getVendors(item);
  const total = getTotalOnHand(item);
  const required = item.required > 0 ? item.required : 1;
  const critical = total / required < 0.25;
  const multi = isMultiVendor(item);
  const earliestETA = getEarliestETA(item);

  const [expanded, setExpanded] = useState(false);

  const primary = vendors[0];

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
        critical ? 'border-rose-200 ring-1 ring-rose-100' : 'border-slate-200'
      }`}
    >
      <header className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            critical ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-700'
          }`}
        >
          <CategoryIcon category={item.category} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {item.category}
          </p>
          <h3 className="truncate text-base font-semibold text-slate-900">{item.name}</h3>
        </div>
        {critical && (
          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-700">
            Low
          </span>
        )}
      </header>

      <StockMeter onHand={total} required={item.required} unit={item.unit} />

      <div className="flex flex-wrap items-center gap-2">
        {multi && (
          <span
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200"
            title="Click 'View vendor breakdown' for per-vendor status."
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M9 2a4 4 0 100 8 4 4 0 000-8zM2 15a5 5 0 0114 0v1H2v-1zm14.5-7a3 3 0 11.001 5.999A3 3 0 0116.5 8zm-1.7 7.05A6 6 0 0118 16h2v-1.5a3.5 3.5 0 00-5.2-3.05z" />
            </svg>
            {vendors.length} vendors
          </span>
        )}
        <PaymentBadge
          status={multi ? getAggregatedPaymentStatus(item) : primary?.paymentStatus}
        />
        <DeliveryStatusBadge
          status={multi ? getAggregatedDeliveryStatus(item) : primary?.deliveryStatus}
        />
      </div>

      {multi ? (
        <div>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            aria-expanded={expanded}
          >
            <span>{expanded ? 'Hide vendor breakdown' : 'View vendor breakdown'}</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-4 w-4 text-slate-500 transition-transform ${
                expanded ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {expanded && (
            <ul className="mt-2 space-y-2">
              {vendors.map((vendor) => (
                <VendorRow
                  key={vendor.id ?? vendor.name}
                  vendor={vendor}
                  unit={item.unit}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-slate-100 pt-3 text-xs">
          <div>
            <dt className="text-slate-500">Vendor</dt>
            <dd className="truncate font-medium text-slate-800">
              {primary?.name ?? '—'}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">ETA</dt>
            <dd className="font-medium text-slate-800">
              {earliestETA
                ? earliestETA.toLocaleDateString(undefined, {
                    day: '2-digit',
                    month: 'short',
                  })
                : '—'}
            </dd>
          </div>
          {primary?.notes && (
            <div className="col-span-2">
              <dt className="sr-only">Notes</dt>
              <dd className="text-slate-600">{primary.notes}</dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}

export default MaterialCard;
