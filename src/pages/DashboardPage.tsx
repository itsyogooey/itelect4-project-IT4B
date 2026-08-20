// src/pages/DashboardPage.tsx
import { useState } from "react";
import type { User } from "../types/index";
import UserCard from "../components/UserCard";
import useToggle from "../hooks/useToggle";
import { student } from "../data/mockData";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Gwyneth’s Dashboard
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        Welcome to my personal dashboard — track submissions and progress here.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UserCard user={student} onSelect={setSelectedUser} />
      </div>

      <button
        onClick={toggleDetails}
        className="mt-4 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
      >
        {showDetails ? "Hide" : "Show"} Details
      </button>

      {showDetails && selectedUser && (
        <div className="mt-4 rounded bg-gray-50 p-3 dark:bg-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            Selected: <strong>{selectedUser.name}</strong> ({selectedUser.role})
          </p>
        </div>
      )}
    </main>
  );
}

export default DashboardPage;
