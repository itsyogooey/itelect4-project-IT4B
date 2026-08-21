// src/pages/DashboardPage.tsx
import { useQuery } from "@tanstack/react-query";
import type { ApiUser } from "../types/index";
import UserCard from "../components/UserCard";
import useToggle from "../hooks/useToggle";
import { fetchUsers } from "../api/client";

function DashboardPage() {
  const [showDetails, toggleDetails] = useToggle(false);
  const { data: users, isPending, isError } = useQuery<ApiUser[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) return <div className="mx-auto mt-10 max-w-4xl animate-pulse rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Loading dashboard...</div>;
  if (isError) return <div className="mx-auto mt-10 max-w-4xl rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950 dark:text-red-200">Could not load the dashboard.</div>;

  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Personal workspace / 2026</p>
      <h2 className="page-title">SUBMISSION TRACKER</h2>
      <p className="page-intro">
        Welcome to my personal dashboard — track submissions and progress here.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users?.map((user: ApiUser) => (
          <UserCard key={user.id} user={user} showDetails={showDetails} onToggleDetails={toggleDetails} />
        ))}
      </div>

    </main>
  );
}

export default DashboardPage;
