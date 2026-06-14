import { Link } from "react-router-dom";
import Card from "../common/Card";
import { FiUsers, FiArrowRight } from "react-icons/fi";

const GroupCard = ({ group, memberCount }) => (
  <Card className="overflow-hidden p-0 group hover:-translate-y-1" hoverable>
    <div className="relative h-44 overflow-hidden">
      <img
        src={group.coverImage}
        alt={group.name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-200/80">{group.category}</p>
        <h3 className="mt-2 text-xl font-semibold">{group.name}</h3>
      </div>
    </div>
    <div className="p-5 bg-white dark:bg-slate-950">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{group.description}</p>
      <div className="flex items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-300">
        <div className="inline-flex items-center gap-2">
          <FiUsers className="h-4 w-4" />
          <span>{memberCount} members</span>
        </div>
        <Link to={`/groups/${group.id}`} className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 dark:text-violet-300 dark:hover:text-violet-200">
          View
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </Card>
);

export default GroupCard;
