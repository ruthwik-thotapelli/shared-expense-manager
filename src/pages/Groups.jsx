import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { toast } from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import GroupCard from "../components/groups/GroupCard";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Groups = () => {
  const { users } = useAuth();
  const { groups, addGroup } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Home");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const memberOptions = useMemo(() => users, [users]);

  const resetForm = () => {
    setGroupName("");
    setDescription("");
    setCategory("Home");
    setSelectedMembers([]);
  };

  const handleCreateGroup = (event) => {
    event.preventDefault();
    if (!groupName || !description || selectedMembers.length < 2) {
      toast.error("Please enter group details and add at least 2 members.");
      return;
    }

    addGroup({
      name: groupName,
      description,
      category,
      members: selectedMembers,
      coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    });
    toast.success("Group created successfully.");
    resetForm();
    setShowModal(false);
  };

  const toggleMember = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Groups"
        subtitle="Create and manage your shared expense groups with ease."
        actionText="Create group"
        onAction={() => setShowModal(true)}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} memberCount={group.members.length} />
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create a new group">
        <form onSubmit={handleCreateGroup} className="space-y-4">
          <Input label="Group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
          <Input label="Description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Category</label>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Home</option>
            <option>Travel</option>
            <option>Food</option>
            <option>Bills</option>
          </select>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Members</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {memberOptions.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => toggleMember(user.id)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    selectedMembers.includes(user.id)
                      ? "border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10"
                      : "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  }`}
                >
                  {user.name}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" fullWidth>
            Create group
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Groups;
