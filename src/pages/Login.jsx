import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      setError(result.error);
      toast.error(result.error);
    }
  };

  return (
    <Card className="p-8 shadow-2xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Welcome back</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Sign in to your account</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Securely manage shared expenses with your groups and settle faster.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" fullWidth loading={loading}>
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        New to EquiSplit?{' '}
        <Link to="/register" className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-300">
          Create an account
        </Link>
      </p>
    </Card>
  );
};

export default Login;
