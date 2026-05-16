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

function formatDate(value) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function VendorRow({ vendor, unit, indent = false }) {
  return (
    <tr className={`align-top ${indent ? 'bg-slate-50/50' : 'hover:bg-slate-50'}`}>
      <td className="px-4 py-2.5 pl-10 text-xs text-slate-700">
        <div className="font-medium text-slate-800">{vendor.name}</div>
        {vendor.notes && (
          <div className="mt-0.5 text-[11px] text-slate-500">{vendor.notes}</div>
        )}
      </td>
      <td className="px-4 py-2.5 text-xs text-slate-600">—</td>
      <td className="px-4 py-2.5 text-xs text-slate-700">
        {(vendor.onHand ?? 0).toLocaleString()} {unit}
      </td>
      <td className="px-4 py-2.5">
        <PaymentBadge status={vendor.paymentStatus} size="xs" />
      </td>
      <td className="px-4 py-2.5">
        <DeliveryStatusBadge status={vendor.deliveryStatus} size="xs" />
      </td>
      <td className="px-4 py-2.5 whitespace-nowrap text-xs text-slate-700">
        {formatDate(vendor.expectedDate)}
      </td>
      <td className="px-4 py-2.5 text-xs text-slate-500">supplier</td>
    </tr>
  );
}

function ItemRow({ item }) {
  const vendors = getVendors(item);
  const multi = isMultiVendor(item);
  const total = getTotalOnHand(item);
  const earliest = getEarliestETA(item);
  const primary = vendors[0];
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr className="align-top hover:bg-slate-50">
        <td className="px-4 py-3">
          <div className="flex items-start gap-2">
            {multi ? (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
                aria-expanded={expanded}
                aria-label={expanded ? 'Collapse vendors' : 'Expand vendors'}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-3 w-3 transition-transform ${expanded ? 'rotate-90' : ''}`}
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 5.23a.75.75 0 011.06 0l4.39 4.25a.75.75 0 010 1.08l-4.39 4.25a.75.75 0 11-1.04-1.08L11.06 10 7.23 6.27a.75.75 0 01-.02-1.04z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <span
                className="mt-0.5 inline-block h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
            )}
            <div>
              <div className="font-medium text-slate-900">{item.name}</div>
              {item.notes && !multi && (
                <div className="mt-0.5 text-xs text-slate-500">{item.notes}</div>
              )}
              {multi && (
                <div className="mt-0.5 text-xs text-slate-500">
                  {vendors.length} vendors supplying this item
                </div>
              )}
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-slate-700">{item.location ?? '—'}</td>
        <td className="px-4 py-3 min-w-[180px]">
          <StockMeter onHand={total} required={item.required} unit={item.unit} />
        </td>
        <td className="px-4 py-3">
          <PaymentBadge
            status={multi ? getAggregatedPaymentStatus(item) : primary?.paymentStatus}
          />
        </td>
        <td className="px-4 py-3">
          <DeliveryStatusBadge
            status={multi ? getAggregatedDeliveryStatus(item) : primary?.deliveryStatus}
          />
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-slate-700">
          {multi ? formatDate(earliest) : formatDate(primary?.expectedDate)}
        </td>
        <td className="px-4 py-3 text-slate-700">
          {multi ? `${vendors.length} vendors` : (primary?.name ?? '—')}
        </td>
      </tr>
      {multi &&
        expanded &&
        vendors.map((vendor) => (
          <VendorRow
            key={vendor.id ?? vendor.name}
            vendor={vendor}
            unit={item.unit}
            indent
          />
        ))}
    </>
  );
}

function MaterialTable({ items }) {
  const grouped = items.reduce((acc, item) => {
    const key = item.category || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const groups = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="space-y-6">
      {groups.map(([category, rows]) => (
        <section
          key={category}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
            <h3 className="text-sm font-semibold text-slate-800">{category}</h3>
            <span className="text-xs text-slate-500">
              {rows.length} item{rows.length === 1 ? '' : 's'}
            </span>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-white text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Item</th>
                  <th className="px-4 py-2 text-left font-medium">Location</th>
                  <th className="px-4 py-2 text-left font-medium">Stock</th>
                  <th className="px-4 py-2 text-left font-medium">Payment</th>
                  <th className="px-4 py-2 text-left font-medium">Delivery</th>
                  <th className="px-4 py-2 text-left font-medium">ETA</th>
                  <th className="px-4 py-2 text-left font-medium">Vendor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((item) => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

export default MaterialTable;
