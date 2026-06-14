import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import { FiCreditCard, FiUsers } from "react-icons/fi";

const ExpenseDetails = () => {
  const { id } = useParams();
  const { users } = useAuth();
  const { expenses, groups } = useApp();

  const expense = useMemo(() => expenses.find((item) => item.id === id), [expenses, id]);
  const group = useMemo(() => groups.find((item) => item.id === expense?.groupId), [groups, expense]);
  const payer = useMemo(() => users.find((user) => user.id === expense?.paidBy), [users, expense]);

  if (!expense) {
    return (
      <div className="text-center py-24">
        <p className="text-xl text-slate-500 dark:text-slate-400">Expense not found.</p>
        <Link to="/expenses" className="mt-4 inline-flex rounded-full bg-violet-600 px-5 py-2 text-white hover:bg-violet-700 transition">
          View expense list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={expense.description}
        subtitle={`Expense details for the ${group?.name} group.`}
        label={expense.category}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6" glass>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Amount</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">${expense.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Paid by</p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{payer?.name}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/80">
              <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                <FiCreditCard className="h-5 w-5" />
                <span className="font-semibold">Split type: {expense.splitType}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Each member share is calculated automatically based on the selected split type.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Split breakdown</h3>
              <div className="space-y-3">
                {expense.splits.map((split) => {
                  const member = users.find((user) => user.id === split.userId);
                  return (
                    <div key={split.userId} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900/80">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-semibold text-slate-700 dark:text-slate-200">{member?.name?.split(" ")[0].charAt(0)}</div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{member?.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{member?.email}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white">${split.amount.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6" glass>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Group details</h3>
            <FiUsers className="h-5 w-5 text-violet-600" />
          </div>
          <div className="mt-6 space-y-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950/80">
              <p className="font-semibold text-slate-900 dark:text-white">Group</p>
              <p>{group?.name}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950/80">
              <p className="font-semibold text-slate-900 dark:text-white">Date</p>
              <p>{new Date(expense.date).toLocaleDateString()}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950/80">
              <p className="font-semibold text-slate-900 dark:text-white">Category</p>
              <p>{expense.category}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseDetails;
