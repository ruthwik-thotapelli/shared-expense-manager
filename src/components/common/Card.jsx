
const Card = ({
  children,
  className = "",
  glass = false,
  hoverable = false,
  onClick,
}) => {
  const baseStyles = "rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 dark:border-slate-900/50 dark:bg-slate-900/40";
  const glassStyles = glass ? "glass" : "";
  const hoverStyles = hoverable ? "card-hover cursor-pointer" : "";
  const clickableStyles = onClick ? "cursor-pointer" : "";

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${clickableStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
