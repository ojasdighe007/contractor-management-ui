import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInventory } from '../../hooks/useInventory.js';
import InventoryFilters from '../../components/inventory/InventoryFilters.jsx';
import MaterialTable from '../../components/inventory/MaterialTable.jsx';
import EmptyState from '../../components/inventory/EmptyState.jsx';
import { anyVendorMatches, matchesQuery } from '../../lib/material.js';

function FinishingPhaseView() {
  const { siteId } = useParams();
  const { items, isEmpty } = useInventory(siteId, 'finishing');

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

  if (isEmpty) {
    return (
      <EmptyState
        title="No finishing items yet"
        message="This site is still in early structural works. Finishing inventory will appear here once procurement begins."
      />
    );
  }

  return (
    <div className="space-y-5">
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
          title="No items match"
          message="Try adjusting the filters or search query."
        />
      ) : (
        <MaterialTable items={filtered} />
      )}
    </div>
  );
}

export default FinishingPhaseView;
