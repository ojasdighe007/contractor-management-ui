import { getPaymentStatus, getToneClasses } from '../../config/statuses.js';

function PaymentBadge({ status, size = 'sm' }) {
  const meta = getPaymentStatus(status);
  const tone = getToneClasses(meta.tone);
  const sizeClasses = size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${tone.pill} ${sizeClasses}`}
      title={meta.description}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${tone.bar}`} aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export default PaymentBadge;
