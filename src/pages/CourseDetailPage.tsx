// src/pages/CourseDetailPage.tsx
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { ApiProject } from "../types/index";
import CourseCard from "../components/CourseCard";
import { fetchProjectBySlug } from "../api/client";

function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: project, isPending, isError } = useQuery<ApiProject>({
    queryKey: ["projects", slug],
    queryFn: () => fetchProjectBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });

  if (isPending) return <div className="p-6 animate-pulse">Loading project...</div>;

  if (isError || !project) {
    return (
      <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-red-700">Project Not Found</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Sorry Gwyneth, no project exists with the slug <strong>{slug}</strong>.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
        >
          Back
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Project Detail — {project.title}
      </h2>
      <CourseCard course={project} />

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        {project.description}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-100"
      >
        Back to Projects
      </button>
    </main>
  );
}

export default CourseDetailPage;
