import { useRef } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { ApiProject } from "../types/index";
import CourseCard from "../components/CourseCard";
import usePrevious from "../hooks/usePrevious";
import useUIStore from "../store/uiStore";
import { fetchProjects } from "../api/client";

function CoursesPage() {
  const searchTerm = useUIStore((state) => state.searchTerm);
  const setSearchTerm = useUIStore((state) => state.setSearchTerm);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);

  // ✅ React Query fetch
  const { data: projects, isPending, isError } = useQuery<ApiProject[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  // ✅ Filter logic (safe even if courses is undefined)
  const filteredCourses =
    projects?.filter(
      (c: ApiProject) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  if (isPending) {
    return <div className="mx-auto mt-10 max-w-4xl animate-pulse rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Loading Gwyneth’s projects...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        Sorry Gwyneth, something went wrong while loading your projects.
      </div>
    );
  }

  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Project index / active work</p>
      <h2 className="page-title">
        Gwyneth’s Projects
      </h2>
      <p className="page-intro">
        Search and explore the projects I’m tracking.
      </p>

      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search my projects..."
        className="mt-7 w-full px-4 py-3 text-sm"
      />

      {previousSearch && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500">
          Previous search: "{previousSearch}"
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((c: ApiProject) => (
          <Link className="project-link" key={c.slug} to={`/projects/${c.slug}`}>
            <CourseCard course={c} />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default CoursesPage;
