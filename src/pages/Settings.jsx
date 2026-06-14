import { useTheme } from "../context/ThemeContext";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { simplifyDebtsToggle, setSimplifyDebtsToggle, resetData } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Customize shared expense workflows and UI preferences." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6" glass>
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Theme</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode.</p>
              </div>
              <button onClick={toggleDarkMode} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                {darkMode ? "Dark" : "Light"}
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Debt simplification</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Enable simplified settlement recommendations.</p>
              </div>
              <button onClick={() => setSimplifyDebtsToggle(!simplifyDebtsToggle)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                {simplifyDebtsToggle ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </Card>
        <Card className="p-6" glass>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Danger zone</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Reset mock data and return to the default sample state.</p>
          <Button variant="danger" onClick={resetData} className="mt-4">
            Reset demo data
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
