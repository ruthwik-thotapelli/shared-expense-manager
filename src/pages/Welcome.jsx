import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiShield, FiUsers, FiTrendingUp, FiClock } from "react-icons/fi";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const featureList = [
  { icon: FiTrendingUp, title: "Smart insights", description: "Track balances, trends, and group spending with clarity." },
  { icon: FiUsers, title: "Shared groups", description: "Organize expenses across roommates, trips, and social plans." },
  { icon: FiShield, title: "Secure by design", description: "Private local mock data with a clean authentication flow." },
  { icon: FiClock, title: "Quick setup", description: "Get started instantly with an intuitive dashboard experience." },
];

const Welcome = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(132,204,22,0.15),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.15),_transparent_30%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-violet-500/20 px-4 py-1 text-sm font-semibold text-violet-200 mb-6">Shared Expense Manager</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Simplify shared spending with a beautiful, modern expense dashboard.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">Stay in control of group budgets, balances, and settlements with a friendly interface built for teams, roommates, and travel plans.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/login">
                <Button className="w-full sm:w-auto" variant="primary">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full sm:w-auto" variant="secondary">Create account</Button>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {featureList.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-6 bg-white/5 border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-200">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Welcome;
