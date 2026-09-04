import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ApiProject } from "../types/index";
import CourseCard from "../components/CourseCard";
import usePrevious from "../hooks/usePrevious";
import useUIStore from "../store/uiStore";
import { fetchProjects } from "../api/client";

function CoursesPage() {
  const searchTerm = useUIStore((state) => state.searchTerm);
  const claimedItemIds = useUIStore((state) => state.claimedItemIds);
  const setSearchTerm = useUIStore((state) => state.setSearchTerm);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);
  const { data: projects, isPending, isError } = useQuery<ApiProject[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const filteredCourses =
    projects?.filter((project) => project.status === "Lost" && !claimedItemIds.includes(project.id)).filter(
      (c: ApiProject) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.description ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];
  if (isPending) {
    return <div className="mx-auto mt-10 max-w-4xl animate-pulse rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Loading campus items...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        Something went wrong while loading the campus item registry.
      </div>
    );
  }

  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Item registry / active reports</p>
      <h2 className="page-title">
        Lost & Found Items
      </h2>
      <p className="page-intro">
        Search recent reports and review items reported lost across campus.
      </p>

      <div className="submission-form mt-6">
        <input
          ref={searchInputRef}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Items"
          className="w-full px-4 py-3 text-sm"
        />
        <button
          type="button"
          onClick={() => searchInputRef.current?.focus()}
          className="w-full rounded bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Search
        </button>
      </div>

      {previousSearch && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500">
          Previous search: "{previousSearch}"
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((c: ApiProject) => {
          return <CourseCard key={c.slug} course={c} />;
        })}
      </div>
    </main>
  );
}

export default CoursesPage;
