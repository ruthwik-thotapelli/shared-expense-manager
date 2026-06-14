import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const ImportReport = () => {
  const { expenses, groups } = useApp();

  const duplicates = useMemo(() => {
    const index = {};
    expenses.forEach((expense) => {
      const key = `${expense.description.toLowerCase()}|${expense.amount.toFixed(2)}`;
      index[key] = [...(index[key] || []), expense];
    });
    return Object.values(index).filter((items) => items.length > 1);
  }, [expenses]);

  return (
    <div className="space-y-6">
      <PageHeader title="Import Report" subtitle="Review anomalies and duplicate records detected during import." />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6" glass>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Anomaly review</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Confirmed duplicate expenses and suspicious rows.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              <FiCheckCircle className="h-4 w-4" />
              {duplicates.length === 0 ? "No duplicates" : `${duplicates.length} issue(s)`}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {duplicates.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-500 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400">
                No duplicate expenses were detected in the current import report.
              </div>
            ) : (
              duplicates.map((group, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Duplicate set</p>
                  <div className="mt-3 space-y-3 text-sm text-slate-500 dark:text-slate-400">
                    {group.map((expense) => {
                      const groupName = groups.find((item) => item.id === expense.groupId)?.name;
                      return (
                        <div key={expense.id} className="rounded-3xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/80">
                          <p className="font-semibold text-slate-900 dark:text-white">{expense.description}</p>
                          <p>{groupName} • ${expense.amount.toFixed(2)} • {new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6" glass>
          <div className="flex items-center gap-3">
            <FiAlertCircle className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Duplicate detection</h2>
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">The report automatically groups items with matching descriptions and amounts. Review any suspicious entries before finalizing import.</p>
        </Card>
      </div>
    </div>
  );
};

export default ImportReport;
