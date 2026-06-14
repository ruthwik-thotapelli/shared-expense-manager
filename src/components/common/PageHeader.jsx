import Button from "./Button";

const PageHeader = ({ title, subtitle, actionText, onAction, label }) => (
  <div className="flex flex-col gap-4 md:items-center md:flex-row md:justify-between mb-6">
    <div className="space-y-2">
      {label && (
        <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
          {label}
        </span>
      )}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {actionText && onAction && (
      <Button onClick={onAction} size="md">
        {actionText}
      </Button>
    )}
  </div>
);

export default PageHeader;
