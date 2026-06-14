import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [loading, setLoading] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    setLoading(true);
    const updated = updateProfile({ name, email, phone });
    setLoading(false);
    if (updated.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(updated.error || "Unable to update profile");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Manage your account details and contact preferences." />
      <Card className="p-6" glass>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Button type="submit" fullWidth loading={loading}>
            Save profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
