import { getToneClasses } from '../../config/statuses.js';

function pickTone(percent) {
  if (percent >= 75) return 'emerald';
  if (percent >= 40) return 'sky';
  if (percent >= 20) return 'amber';
  return 'rose';
}

function StockMeter({ onHand = 0, required = 0, unit = '' }) {
  const safeRequired = required > 0 ? required : 1;
  const percent = Math.min(100, Math.round((onHand / safeRequired) * 100));
  const tone = getToneClasses(pickTone(percent));

  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between text-xs text-slate-600">
        <span className="font-medium text-slate-900">
          {onHand.toLocaleString()}{' '}
          <span className="text-slate-500">
            / {required.toLocaleString()} {unit}
          </span>
        </span>
        <span className={`font-semibold ${tone.text}`}>{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${tone.bar}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default StockMeter;
