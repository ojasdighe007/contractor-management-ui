export const paymentStatuses = {
  paid: {
    id: 'paid',
    label: 'Paid',
    tone: 'emerald',
    description: 'Invoice fully settled with vendor.',
  },
  partial: {
    id: 'partial',
    label: 'Partial',
    tone: 'amber',
    description: 'Advance paid, balance pending.',
  },
  unpaid: {
    id: 'unpaid',
    label: 'Unpaid',
    tone: 'rose',
    description: 'No payment processed yet.',
  },
};

export const deliveryStatuses = {
  delivered: {
    id: 'delivered',
    label: 'Delivered',
    tone: 'emerald',
    icon: 'check',
  },
  in_transit: {
    id: 'in_transit',
    label: 'In Transit',
    tone: 'sky',
    icon: 'truck',
  },
  shipped: {
    id: 'shipped',
    label: 'Shipped',
    tone: 'indigo',
    icon: 'package',
  },
  ordered: {
    id: 'ordered',
    label: 'Ordered',
    tone: 'amber',
    icon: 'clipboard',
  },
  vendor_contacted: {
    id: 'vendor_contacted',
    label: 'Vendor Contacted',
    tone: 'slate',
    icon: 'phone',
  },
};

export const toneClasses = {
  emerald: {
    pill: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
    bar: 'bg-emerald-500',
    soft: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  amber: {
    pill: 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200',
    bar: 'bg-amber-500',
    soft: 'bg-amber-50',
    text: 'text-amber-800',
  },
  rose: {
    pill: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
    bar: 'bg-rose-500',
    soft: 'bg-rose-50',
    text: 'text-rose-700',
  },
  sky: {
    pill: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
    bar: 'bg-sky-500',
    soft: 'bg-sky-50',
    text: 'text-sky-700',
  },
  indigo: {
    pill: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200',
    bar: 'bg-indigo-500',
    soft: 'bg-indigo-50',
    text: 'text-indigo-700',
  },
  slate: {
    pill: 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200',
    bar: 'bg-slate-500',
    soft: 'bg-slate-50',
    text: 'text-slate-700',
  },
};

export function getPaymentStatus(id) {
  return paymentStatuses[id] ?? paymentStatuses.unpaid;
}

export function getDeliveryStatus(id) {
  return deliveryStatuses[id] ?? deliveryStatuses.ordered;
}

export function getToneClasses(tone) {
  return toneClasses[tone] ?? toneClasses.slate;
}
