import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "../components/common/DarkModeToggle";
import {
  FiHome, FiUsers, FiDollarSign, FiBarChart, FiCreditCard,
  FiUpload, FiUser, FiSettings, FiLogOut, FiMenu, FiX
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const SidebarContent = ({ navItems, personalItems, currentUser, handleLogout, setMobileMenuOpen }) => (
  <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800/80">
    {/* Brand logo */}
    <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800/80">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-600 dark:bg-violet-500 text-white shadow-sm shadow-violet-500/30">
        <FiDollarSign className="w-5 h-5" />
      </div>
      <span className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight">EquiSplit</span>
    </div>

    {/* Main Nav links */}
    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
        Menu
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                isActive
                  ? "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {item.name}
          </NavLink>
        );
      })}

      <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 pt-6 mb-2">
        Preferences
      </div>
      {personalItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                isActive
                  ? "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {item.name}
          </NavLink>
        );
      })}
    </nav>

    {/* User profile footer */}
    {currentUser && (
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white"
          />
          <div className="text-left overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
              {currentUser.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {currentUser.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer"
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    )}
  </div>
);

const DashboardLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: FiHome },
    { name: "Groups", path: "/groups", icon: FiUsers },
    { name: "Expenses", path: "/expenses", icon: FiDollarSign },
    { name: "Balances", path: "/balances", icon: FiBarChart },
    { name: "Settlements", path: "/settlements", icon: FiCreditCard },
    { name: "CSV Import", path: "/import", icon: FiUpload },
  ];

  const personalItems = [
    { name: "Profile", path: "/profile", icon: FiUser },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    const foundItem = [...navItems, ...personalItems].find(item => item.path === path);
    if (foundItem) return foundItem.name;
    if (path.startsWith("/groups/")) return "Group Details";
    if (path.startsWith("/expenses/")) return "Expense Details";
    if (path.startsWith("/import/report")) return "Import Report";
    return "Shared Expense Manager";
  };
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Desktop Sidebar (static) */}
      <aside className="hidden lg:block w-[260px] shrink-0 h-screen sticky top-0">
        <SidebarContent
          navItems={navItems}
          personalItems={personalItems}
          currentUser={currentUser}
          handleLogout={handleLogout}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </aside>

      {/* Slide-out Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/30 backdrop-blur-xs"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-[280px] max-w-xs h-full z-10"
            >
              <SidebarContent
                navItems={navItems}
                personalItems={personalItems}
                currentUser={currentUser}
                handleLogout={handleLogout}
                setMobileMenuOpen={setMobileMenuOpen}
              />
              {/* Close Button Inside Drawer */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-[-48px] p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl shadow-md cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-100 bg-white/80 dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-3" role="navigation" aria-label="Main menu">
            {/* Burger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-300 cursor-pointer"
              aria-label="Open menu"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <Link
              to="/profile"
              className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 shrink-0"
            >
              <img
                src={currentUser?.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=placeholder"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
