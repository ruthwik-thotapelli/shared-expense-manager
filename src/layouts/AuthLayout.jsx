import DarkModeToggle from "../components/common/DarkModeToggle";
import { FiDollarSign } from "react-icons/fi";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-height-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Top bar with DarkModeToggle for mobile/everyone */}
      <div className="absolute top-4 right-4 z-50">
        <DarkModeToggle />
      </div>

      {/* Left panel (Hero section) - only on md screens up */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-violet-600 to-indigo-800 dark:from-violet-900 dark:to-indigo-950 p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Decorative background grid and bubbles */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

        {/* Branding Logo */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <FiDollarSign className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="font-bold text-xl tracking-tight">EquiSplit</span>
        </div>

        {/* Hero Message */}
        <div className="my-auto z-10 max-w-md text-left" role="region" aria-label="Auth hero">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Share expenses, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-100">
              without the stress.
            </span>
          </h1>
          <p className="text-violet-100/90 text-base leading-relaxed">
            Keep track of shared bills, rent, vacation costs, and meals. Splitwise style debt-simplification built right in to save time and bank fees.
          </p>
        </div>

        {/* Footer info */}
        <div className="z-10 text-xs text-violet-200/60">
          © {new Date().getFullYear()} EquiSplit Inc. All rights reserved.
        </div>
      </div>

      {/* Right panel (Auth Form Container) */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-12 lg:px-16 relative">
        {/* Mobile branding */}
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600 text-white">
            <FiDollarSign className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-slate-800 dark:text-slate-200">EquiSplit</span>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
