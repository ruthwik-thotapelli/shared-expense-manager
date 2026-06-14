import { forwardRef } from "react";

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  type = "text",
  name,
  id,
  className = "",
  ...props
}, ref) => {
  const isTextarea = type === "textarea";
  const inputId = id || name;

  const baseInputStyles = "block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-violet-400 dark:focus:ring-violet-400";
  const iconPadding = Icon ? "pl-10" : "";
  const errorStyles = error ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-900/50" : "";

  return (
    <div className={`w-full text-left ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon className="h-5 w-5" />
          </div>
        )}
        {isTextarea ? (
          <textarea
            ref={ref}
            name={name}
            id={inputId}
            rows={3}
            className={`${baseInputStyles} ${iconPadding} ${errorStyles}`}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            name={name}
            id={inputId}
            className={`${baseInputStyles} ${iconPadding} ${errorStyles}`}
            {...props}
          />
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
