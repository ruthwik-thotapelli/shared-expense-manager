import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import { FiAlertTriangle } from "react-icons/fi";

const NotFound = () => (
  <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
    <Card className="max-w-xl p-10 text-center mx-auto glass">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-100 text-rose-600 mb-6">
        <FiAlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">404</h1>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">The page you are looking for cannot be found. It may have been moved or removed.</p>
      <Link to="/" aria-label="Return to dashboard" className="inline-flex mt-8 items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition">
        Return to dashboard
      </Link>
    </Card>
  </div>
);

export default NotFound;
