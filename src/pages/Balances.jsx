import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import { FiDollarSign, FiShield, FiUsers } from "react-icons/fi";

const Balances = () => {
  const { currentUser, users } = useAuth();
  const { getGlobalBalancesForUser, getUserNetStatistics } = useApp();

  const debts = useMemo(() => getGlobalBalancesForUser(currentUser.id), [currentUser, getGlobalBalancesForUser]);
  const stats = useMemo(() => getUserNetStatistics(currentUser.id), [currentUser, getUserNetStatistics]);

  return (
    <div className="space-y-6">
      <PageHeader title="Balances" subtitle="Understand who owes whom across your shared expense groups." />
      <div className="grid gap-4 xl:grid-cols-3">
        <Card glass>
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-violet-600/10 p-3 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
              <FiDollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total receivable</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">${stats.totalReceivable.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        <Card glass>
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Net balance</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">${stats.netBalance.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        <Card glass>
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <FiUsers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total owed</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">${stats.totalOwed.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6" glass>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Settlement suggestions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Recommended simplified transfers based on current activity.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">Updated now</span>
        </div>
        <div className="mt-6 space-y-4">
          {debts.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">No outstanding balances at the moment.</p>
          ) : (
            debts.map((transaction, idx) => {
              const payer = users.find((user) => user.id === transaction.from);
              const receiver = users.find((user) => user.id === transaction.to);
              return (
                <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-slate-900 dark:text-white">
                      <span className="font-semibold">{payer?.name}</span> pays <span className="font-semibold">{receiver?.name}</span>
                    </p>
                    <span className="text-slate-700 dark:text-slate-300">${transaction.amount.toFixed(2)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
};

export default Balances;
