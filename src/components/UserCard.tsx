import { useState } from "react";
import type { ApiProject, User } from "../types/index";

export interface UserCardProps {
  readonly user: User;
  readonly showDetails?: boolean;
  readonly onToggleDetails?: () => void;
  readonly onViewItems?: () => void;
  readonly items?: ApiProject[];
}

export default function UserCard({ user, showDetails = false, onToggleDetails, onViewItems, items = [] }: UserCardProps) {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  let roleLabel = "Student";

  if (user.role === "faculty") {
    roleLabel = "Faculty";
  }

  const statusText = "Lost — Blue Water Bottle";

  return (
    <div className="user-card border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h3>
          {showDetails && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>}
        </div>
        {showDetails && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {roleLabel}
          </span>
        )}
      </div>

      {showDetails && (
        <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            <span className="font-semibold text-slate-800 dark:text-slate-100">Course:</span> {user.course ?? "BS Information Technology"}
          </p>
          <p>
            <span className="font-semibold text-slate-800 dark:text-slate-100">Email:</span> {user.email}
          </p>
          <p className="rounded-md bg-slate-100 px-2 py-2 dark:bg-slate-800">
            <span className="font-semibold text-slate-800 dark:text-slate-100">Status:</span> {statusText}
          </p>
          <div className="space-y-3">
            {items.map((item) => {
              const isExpanded = expandedItemId === item.id;
              return (
                <div key={item.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.status ?? "Lost"} · {item.location ?? "Campus"}</p>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-3 space-y-1 border-t border-slate-200 pt-3 text-sm dark:border-slate-700">
                      <p>Category: {item.category ?? "Uncategorized"}</p>
                      <p>Status: {item.status ?? "Lost"}</p>
                      <p>Location: {item.location ?? "Not specified"}</p>
                      <p className="text-xs text-slate-500">Posted {new Date(item.reportedDate ?? item.dueDate).toLocaleDateString()}</p>
                      <p className="pt-1">{item.description.split("• Category:")[0].trim()}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                    className="mt-3 rounded-lg bg-slate-700 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-900"
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onToggleDetails}
          className="inline-flex rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {showDetails && onViewItems && (
          <button
            type="button"
            onClick={onViewItems}
            className="inline-flex rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            View Items
          </button>
        )}
      </div>
    </div>
  );
}
