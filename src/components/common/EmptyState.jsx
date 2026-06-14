import React from "react";
import Button from "./Button";

const EmptyState = ({
  title,
  description,
  icon: Icon,
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl dark:border-slate-800 bg-white/30 dark:bg-slate-900/10 backdrop-blur-sm ${className}`}>
      {Icon && (
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400 mb-4 shadow-sm border border-violet-100/30 dark:border-violet-500/20">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
