import type { User } from "../types";

export interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

export default function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">{user.role}</span>
      </div>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        {user.isActive ? "Active student account" : "Inactive account"}
      </p>
      <button
        type="button"
        onClick={() => onSelect?.(user)}
        className="mt-5 inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400"
      >
        Select
      </button>
    </div>
  );
}
