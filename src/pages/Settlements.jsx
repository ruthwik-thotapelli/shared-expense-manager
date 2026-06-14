import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import { FiCheckCircle } from "react-icons/fi";

const Settlements = () => {
  const { users } = useAuth();
  const { settlements, groups } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader title="Settlements" subtitle="Review payments and completed settlements across your groups." />

      <Card className="p-6" glass>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Payment history</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Track completed settlements and payment methods.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            <FiCheckCircle className="h-4 w-4" />
            Settled
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
          <table role="table" aria-label="Settlements" className="min-w-full divide-y divide-slate-200 bg-white text-left dark:bg-slate-950 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Payer</th>
                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Payee</th>
                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Amount</th>
                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Group</th>
                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {settlements.map((settlement) => {
                const payer = users.find((user) => user.id === settlement.payerId);
                const payee = users.find((user) => user.id === settlement.payeeId);
                const group = groups.find((item) => item.id === settlement.groupId);
                return (
                  <tr key={settlement.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/80">
                    <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">{payer?.name}</td>
                    <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">{payee?.name}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white">${settlement.amount.toFixed(2)}</td>
                    <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{group?.name}</td>
                    <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{settlement.paymentMethod}</td>
                  </tr>
                );
              })}
              {settlements.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No settlements have been recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Settlements;
