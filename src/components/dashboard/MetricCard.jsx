import Card from "../common/Card";

const MetricCard = ({ label, value, change, icon, accent, details }) => {
  const accentStyles = accent || "bg-violet-600 text-white";

  return (
    <Card className="p-5 flex flex-col justify-between gap-4 hover:shadow-lg" glass>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        {icon && (
          <div className={`${accentStyles} rounded-2xl p-3 shadow-sm shadow-violet-500/10`}>{icon}</div>
        )}
      </div>
      {details && <p className="text-sm text-slate-500 dark:text-slate-400">{details}</p>}
      {change && (
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
          {change}
        </span>
      )}
    </Card>
  );
};

export default MetricCard;
