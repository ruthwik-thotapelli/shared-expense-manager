
const Loader = ({
  size = "md", // sm, md, lg
  color = "violet", // violet, slate, white
  className = "",
  fullPage = false,
}) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const colors = {
    violet: "border-violet-600/20 border-t-violet-600 dark:border-violet-400/20 dark:border-t-violet-400",
    slate: "border-slate-200 border-t-slate-800 dark:border-slate-800 dark:border-t-slate-200",
    white: "border-white/25 border-t-white",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-solid ${sizes[size]} ${colors[color]} ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/75 dark:bg-slate-950/75 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-4">{spinner}</div>;
};

export default Loader;
