import type { User } from "../types/index";

export interface UserCardProps {
  user: User;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

export default function UserCard({ user, showDetails = false, onToggleDetails }: UserCardProps) {
  return (
    <div className="user-card border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h3>
          {showDetails && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>}
        </div>
        {showDetails && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">BS Information Technology Student</span>}
      </div>
      {showDetails && (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          {user.isActive ? "Active Student Account" : "Inactive Student Account"}
        </p>
      )}
      <button
        type="button"
        onClick={onToggleDetails}
        className="mt-5 inline-flex rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </div>
  );
}
