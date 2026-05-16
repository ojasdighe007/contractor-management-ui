export function getVendors(item) {
  if (Array.isArray(item.vendors) && item.vendors.length > 0) {
    return item.vendors;
  }

  if (item.vendor) {
    return [
      {
        id: item.vendor,
        name: item.vendor,
        onHand: item.onHand ?? 0,
        paymentStatus: item.paymentStatus,
        deliveryStatus: item.deliveryStatus,
        expectedDate: item.expectedDate,
        notes: item.notes,
      },
    ];
  }

  return [];
}

export function getTotalOnHand(item) {
  if (typeof item.onHand === 'number' && (!item.vendors || item.vendors.length === 0)) {
    return item.onHand;
  }
  return getVendors(item).reduce((sum, v) => sum + (v.onHand ?? 0), 0);
}

export function getEarliestETA(item) {
  const dates = getVendors(item)
    .map((v) => v.expectedDate)
    .filter(Boolean)
    .map((d) => new Date(d).getTime())
    .filter((t) => !Number.isNaN(t));
  if (dates.length === 0) return null;
  return new Date(Math.min(...dates));
}

export function getPaymentBreakdown(item) {
  const vendors = getVendors(item);
  const counts = vendors.reduce((acc, v) => {
    acc[v.paymentStatus] = (acc[v.paymentStatus] ?? 0) + 1;
    return acc;
  }, {});
  return { counts, total: vendors.length };
}

export function getDeliveryBreakdown(item) {
  const vendors = getVendors(item);
  const counts = vendors.reduce((acc, v) => {
    acc[v.deliveryStatus] = (acc[v.deliveryStatus] ?? 0) + 1;
    return acc;
  }, {});
  return { counts, total: vendors.length };
}

const DELIVERY_ORDER = [
  'vendor_contacted',
  'ordered',
  'shipped',
  'in_transit',
  'delivered',
];

export function getAggregatedPaymentStatus(item) {
  const vendors = getVendors(item);
  if (vendors.length === 0) return null;
  const statuses = new Set(vendors.map((v) => v.paymentStatus));
  if (statuses.size === 1) return vendors[0].paymentStatus;
  return 'partial';
}

export function getAggregatedDeliveryStatus(item) {
  const vendors = getVendors(item);
  if (vendors.length === 0) return null;

  const undelivered = vendors.filter((v) => v.deliveryStatus !== 'delivered');
  if (undelivered.length === 0) return 'delivered';

  let best = undelivered[0].deliveryStatus;
  let bestIdx = DELIVERY_ORDER.indexOf(best);
  for (const v of undelivered) {
    const idx = DELIVERY_ORDER.indexOf(v.deliveryStatus);
    if (idx > bestIdx) {
      bestIdx = idx;
      best = v.deliveryStatus;
    }
  }
  return best;
}

export function isMultiVendor(item) {
  return getVendors(item).length > 1;
}

export function anyVendorMatches(item, { paymentStatus, deliveryStatus }) {
  const vendors = getVendors(item);
  return vendors.some(
    (v) =>
      (!paymentStatus || v.paymentStatus === paymentStatus) &&
      (!deliveryStatus || v.deliveryStatus === deliveryStatus)
  );
}

export function matchesQuery(item, q) {
  if (!q) return true;
  const needle = q.toLowerCase();
  const vendorNames = getVendors(item)
    .map((v) => v.name?.toLowerCase() ?? '')
    .join(' ');
  return (
    item.name.toLowerCase().includes(needle) ||
    (item.category ?? '').toLowerCase().includes(needle) ||
    (item.location ?? '').toLowerCase().includes(needle) ||
    vendorNames.includes(needle)
  );
}
