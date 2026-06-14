import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { FiArrowUpRight, FiBarChart2, FiClock, FiTrendingUp } from "react-icons/fi";
import PageHeader from "../components/common/PageHeader";
import MetricCard from "../components/dashboard/MetricCard";
import Card from "../components/common/Card";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { expenses, groups, getUserNetStatistics } = useApp();

  const userStats = useMemo(() => {
    if (!currentUser) return { netBalance: 0, totalOwed: 0, totalReceivable: 0 };
    return getUserNetStatistics(currentUser.id);
  }, [currentUser, getUserNetStatistics]);

  const expensesByMonth = useMemo(() => {
    const monthMap = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const label = date.toLocaleString("default", { month: "short" });
      monthMap[label] = (monthMap[label] || 0) + expense.amount;
    });
    return Object.entries(monthMap).map(([name, total]) => ({ name, total: Number(total.toFixed(0)) }));
  }, [expenses]);

  const recentExpenses = useMemo(() => {
    return expenses
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4);
  }, [expenses]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Review your shared expense health, recent activity, and quick actions across groups."
        actionText="Log a new expense"
        onAction={() => navigate("/expenses")}
      />

      <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Total receivable"
              value={`$${userStats.totalReceivable.toFixed(2)}`}
              change="+12% this month"
              icon={<FiArrowUpRight className="h-5 w-5" />}
            />
            <MetricCard
              label="Total owed"
              value={`$${userStats.totalOwed.toFixed(2)}`}
              change="-4% since last week"
              icon={<FiTrendingUp className="h-5 w-5" />}
            />
            <MetricCard
              label="Net balance"
              value={`$${userStats.netBalance.toFixed(2)}`}
              details="Positive means others owe you."
              icon={<FiBarChart2 className="h-5 w-5" />}
            />
          </div>

          <Card className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] p-6" glass>
            <div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Activity Trend</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Expenses logged across groups this quarter.</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Updated today
                </span>
              </div>
              <div className="mt-6 h-72 min-h-[280px]">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={expensesByMonth} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Area type="monotone" dataKey="total" stroke="#7c3aed" fillOpacity={1} fill="url(#expenseGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Live insight</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Smart settling guidance</h3>
                  </div>
                  <FiClock className="h-6 w-6 text-violet-600" />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Use simplified debts to reduce settlement friction and keep your groups aligned on shared spending.
                </p>
              </div>

              <Card>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Recent activity</h3>
                <div className="mt-4 space-y-4">
                  {recentExpenses.map((expense) => (
                    <div key={expense.id} className="rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{expense.description}</p>
                      <div className="mt-2 flex items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                        <span>${expense.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="flex flex-col gap-4 p-6" glass>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Quick actions</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Jump to the most used workflows.</p>
              </div>
              <FiTrendingUp className="h-6 w-6 text-violet-600" />
            </div>
            <div className="grid gap-3">
              <button onClick={() => navigate("/groups")} className="rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-violet-300 hover:bg-violet-50 dark:border-slate-800 dark:hover:bg-slate-900/70">
                <p className="font-semibold text-slate-900 dark:text-slate-100">View groups</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage members and group budgets.</p>
              </button>
              <button onClick={() => navigate("/balances")} className="rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-violet-300 hover:bg-violet-50 dark:border-slate-800 dark:hover:bg-slate-900/70">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Review balances</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">See who owes what across all groups.</p>
              </button>
              <button onClick={() => navigate("/import")} className="rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-violet-300 hover:bg-violet-50 dark:border-slate-800 dark:hover:bg-slate-900/70">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Import CSV</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Upload receipts and payment history.</p>
              </button>
            </div>
          </Card>

          <Card className="p-6" glass>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Your groups</h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">You are active in {groups.length} groups.</p>
            <div className="mt-5 grid gap-3">
              {groups.slice(0, 3).map((group) => (
                <div key={group.id} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{group.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{group.members.length} members</p>
                    </div>
                    <div className="rounded-2xl bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">{group.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
