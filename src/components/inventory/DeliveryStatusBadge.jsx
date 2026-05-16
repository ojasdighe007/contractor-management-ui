import { getDeliveryStatus, getToneClasses } from '../../config/statuses.js';

const ICONS = {
  check: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.704 5.296a1 1 0 010 1.408l-7.5 7.5a1 1 0 01-1.408 0l-3.5-3.5a1 1 0 011.408-1.408L8.5 12.092l6.796-6.796a1 1 0 011.408 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3" aria-hidden="true">
      <path d="M2 5a1 1 0 011-1h9a1 1 0 011 1v2h2.586A1 1 0 0117 7.293L18.707 9a1 1 0 01.293.707V13a1 1 0 01-1 1h-1.05a2.5 2.5 0 01-4.9 0H7.95a2.5 2.5 0 01-4.9 0H3a1 1 0 01-1-1V5zm12 4h2.586l-1-1H14v1zm-9.5 5a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3" aria-hidden="true">
      <path d="M10 2L3 5v10l7 3 7-3V5l-7-3zM4.8 5.6L10 3.4l5.2 2.2-5.2 2.2-5.2-2.2zM4 7.1l5 2.1v7.4l-5-2.1V7.1zm6 9.5V9.2l5-2.1v7.4l-5 2.1z" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3" aria-hidden="true">
      <path d="M9 2a1 1 0 011-1h0a1 1 0 011 1h2a1 1 0 011 1v1H6V3a1 1 0 011-1h2zM5 5a1 1 0 011-1h8a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V5z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3" aria-hidden="true">
      <path d="M2 3.5A1.5 1.5 0 013.5 2h2.05a1.5 1.5 0 011.45 1.106l.715 2.502a1.5 1.5 0 01-.42 1.503l-1.13 1.13a11.04 11.04 0 005.595 5.595l1.13-1.13a1.5 1.5 0 011.503-.42l2.502.715A1.5 1.5 0 0118 14.45v2.05A1.5 1.5 0 0116.5 18h-1C7.492 18 2 12.508 2 4.5v-1z" />
    </svg>
  ),
};

function DeliveryStatusBadge({ status, withIcon = true, size = 'sm' }) {
  const meta = getDeliveryStatus(status);
  const tone = getToneClasses(meta.tone);
  const sizeClasses = size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${tone.pill} ${sizeClasses}`}
    >
      {withIcon && ICONS[meta.icon]}
      {meta.label}
    </span>
  );
}

export default DeliveryStatusBadge;
