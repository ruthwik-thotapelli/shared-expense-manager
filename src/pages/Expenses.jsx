import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { toast } from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Expenses = () => {
  const navigate = useNavigate();
  const { currentUser, users } = useAuth();
  const { expenses, groups, addExpense } = useApp();

  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Rent");
  const [groupId, setGroupId] = useState(groups[0]?.id || "");

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => {
        const query = search.toLowerCase();
        return (
          expense.description.toLowerCase().includes(query) ||
          expense.category.toLowerCase().includes(query)
        );
      })
      .filter((expense) => (groupFilter ? expense.groupId === groupFilter : true));
  }, [expenses, search, groupFilter]);

  const groupMap = useMemo(() => Object.fromEntries(groups.map((g) => [g.id, g.name])), [groups]);

  const handleAddExpense = (event) => {
    event.preventDefault();
    if (!description || !amount || !groupId) {
      toast.error("Please enter all expense details.");
      return;
    }
    const group = groups.find((item) => item.id === groupId);
    const amountNumber = Number(amount);
    if (!group || Number.isNaN(amountNumber)) {
      toast.error("Please select a valid group and amount.");
      return;
    }
    const splits = group.members.map((memberId) => ({ userId: memberId, amount: Number((amountNumber / group.members.length).toFixed(2)) }));
    addExpense({
      groupId,
      description,
      amount: amountNumber,
      category,
      paidBy: currentUser.id,
      splitType: "equal",
      splits,
    });
    toast.success("Expense added successfully.");
    setDescription("");
    setAmount("");
    setCategory("Rent");
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        subtitle="Track spending, filter by group, and add new shared expenses quickly."
        actionText="Add expense"
        onAction={() => setShowModal(true)}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_330px]">
        <Card className="p-6" glass>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Expense list</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Search and filter your shared spending records.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Group</label>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                >
                  <option value="">All groups</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 bg-white text-left dark:bg-slate-950 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Expense</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Group</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Amount</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Paid by</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/80 cursor-pointer" onClick={() => navigate(`/expenses/${expense.id}`)}>
                    <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">{expense.description}</td>
                    <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{groupMap[expense.groupId]}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white">${expense.amount.toFixed(2)}</td>
                    <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{users.find((user) => user.id === expense.paidBy)?.name}</td>
                  </tr>
                ))}
                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No expenses match your current filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6" glass>
            <p className="text-sm text-slate-500 dark:text-slate-400">Quick action</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Log shared spending</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Create expenses that are split evenly among group members.</p>
            <Button onClick={() => setShowModal(true)} className="mt-6">
              Add expense
            </Button>
          </Card>
          <Card className="p-6" glass>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Top spender</p>
            <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">{users.find((user) => user.id === currentUser.id)?.name}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You are the current active payer in the demo data.</p>
          </Card>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add new expense">
        <form onSubmit={handleAddExpense} className="space-y-4">
          <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Input label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <Input label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Group</label>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
          <Button type="submit" fullWidth>
            Save expense
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Expenses;
