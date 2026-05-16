import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInventory } from '../../hooks/useInventory.js';
import InventoryFilters from '../../components/inventory/InventoryFilters.jsx';
import MaterialCard from '../../components/inventory/MaterialCard.jsx';
import EmptyState from '../../components/inventory/EmptyState.jsx';
import { anyVendorMatches, getVendors, matchesQuery } from '../../lib/material.js';

function BuildingPhaseView() {
  const { siteId } = useParams();
  const { items } = useInventory(siteId, 'building');

  const [query, setQuery] = useState('');
  const [payment, setPayment] = useState('');
  const [delivery, setDelivery] = useState('');

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (!matchesQuery(item, query)) return false;
      if (!anyVendorMatches(item, { paymentStatus: payment, deliveryStatus: delivery })) {
        return false;
      }
      return true;
    });
  }, [items, query, payment, delivery]);

  const summary = useMemo(() => {
    let materials = items.length;
    let totalVendors = 0;
    let allPaid = 0;
    let pending = 0;
    items.forEach((item) => {
      const vendors = getVendors(item);
      totalVendors += vendors.length;
      const everyPaid = vendors.every((v) => v.paymentStatus === 'paid');
      const anyPending = vendors.some(
        (v) => v.paymentStatus === 'unpaid' || v.paymentStatus === 'partial'
      );
      if (everyPaid) allPaid += 1;
      if (anyPending) pending += 1;
    });
    return { materials, totalVendors, allPaid, pending };
  }, [items]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryTile
          label="Materials tracked"
          value={summary.materials}
          hint={`${summary.totalVendors} vendor link${summary.totalVendors === 1 ? '' : 's'}`}
        />
        <SummaryTile label="Fully paid" value={summary.allPaid} tone="emerald" />
        <SummaryTile label="Pending payment" value={summary.pending} tone="rose" />
      </div>

      <InventoryFilters
        query={query}
        onQueryChange={setQuery}
        payment={payment}
        onPaymentChange={setPayment}
        delivery={delivery}
        onDeliveryChange={setDelivery}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No materials match"
          message="Try adjusting the filters or search query."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryTile({ label, value, hint, tone = 'slate' }) {
  const toneText = {
    slate: 'text-slate-900',
    emerald: 'text-emerald-700',
    rose: 'text-rose-700',
  }[tone];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className={`mt-1 text-2xl font-bold ${toneText}`}>{value}</p>
      {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

export default BuildingPhaseView;
