import { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import { FiUsers, FiDollarSign } from "react-icons/fi";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { groups, expenses, getGroupBalances } = useApp();
  const { users } = useAuth();

  const group = groups.find((item) => item.id === id);

  const members = useMemo(
    () => users.filter((user) => group?.members.includes(user.id)),
    [group, users]
  );

  const groupExpenses = useMemo(
    () => expenses.filter((expense) => expense.groupId === id),
    [expenses, id]
  );

  const balances = useMemo(() => (group ? getGroupBalances(group.id) : []), [group, getGroupBalances]);

  if (!group) {
    return (
      <div className="text-center py-24">
        <p className="text-xl text-slate-500 dark:text-slate-400">Group not found.</p>
        <Link to="/groups" className="mt-4 inline-flex rounded-full bg-violet-600 px-5 py-2 text-white hover:bg-violet-700 transition">
          Back to groups
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={group.name}
        subtitle={group.description}
        actionText="Add expense"
        onAction={() => navigate("/expenses")}
        label={group.category}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="relative h-64 overflow-hidden">
              <img src={group.coverImage} alt={group.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm uppercase tracking-[0.24em] text-white/70">Group stats</p>
                <h2 className="mt-2 text-3xl font-semibold">{group.members.length} members</h2>
              </div>
            </div>
          </Card>

          <Card className="p-6" glass>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent expenses</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Latest expenses recorded for this group.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {groupExpenses.length} entries
              </span>
            </div>
            <div className="space-y-4">
              {groupExpenses.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">No expenses have been added yet.</p>
              ) : (
                groupExpenses.slice(0, 5).map((expense) => (
                  <div key={expense.id} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{expense.description}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Paid by {users.find((u) => u.id === expense.paidBy)?.name}</p>
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">${expense.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6" glass>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Members</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Who is part of this group.</p>
              </div>
              <FiUsers className="h-5 w-5 text-violet-600" />
            </div>
            <div className="mt-4 space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="h-11 w-11 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{member.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{member.email}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{member.currency}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6" glass>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Balance summary</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Simplified settlement suggestions for this group.</p>
              </div>
              <FiDollarSign className="h-5 w-5 text-violet-600" />
            </div>
            <div className="mt-5 space-y-3">
              {balances.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">All balances are settled today.</p>
              ) : (
                balances.map((item, index) => {
                  const payer = users.find((user) => user.id === item.from);
                  const payee = users.find((user) => user.id === item.to);
                  return (
                    <div key={`${item.from}-${item.to}-${index}`} className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200">
                      <p>
                        <span className="font-semibold text-slate-900 dark:text-white">{payer?.name}</span> should pay <span className="font-semibold text-slate-900 dark:text-white">{payee?.name}</span>
                      </p>
                      <p className="mt-2 text-slate-500 dark:text-slate-400">${item.amount.toFixed(2)}</p>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
