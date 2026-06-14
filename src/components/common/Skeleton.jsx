import React from "react";

const Skeleton = ({
  variant = "line", // line, circle, card, table
  count = 1,
  className = "",
}) => {
  const items = Array.from({ length: count });

  const renderSkeleton = () => {
    switch (variant) {
      case "circle":
        return (
          <div className={`h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse ${className}`} />
        );
      case "card":
        return (
          <div className={`border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 rounded-2xl animate-pulse flex flex-col gap-3 shadow-sm ${className}`}>
            <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-6 w-2/3 bg-slate-300 dark:bg-slate-700 rounded-md" />
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
        );
      case "table":
        return (
          <div className={`w-full divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl animate-pulse overflow-hidden shadow-sm ${className}`}>
            <div className="h-10 bg-slate-100 dark:bg-slate-800/80 w-full" />
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-4 flex gap-4 items-center">
                <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-4 w-1/6 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-4 w-1/6 bg-slate-200 dark:bg-slate-800 rounded ml-auto" />
              </div>
            ))}
          </div>
        );
      case "line":
      default:
        return (
          <div className={`h-4 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse ${className}`} />
        );
    }
  };

  return (
    <>
      {items.map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
};

export default Skeleton;
