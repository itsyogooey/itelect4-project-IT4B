// src/pages/CourseDetailPage.tsx
import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ApiProject } from "../types/index";
import CourseCard from "../components/CourseCard";
import useAuthStore from "../store/authStore";
import { fetchProjectBySlug } from "../api/client";

function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const userName = useAuthStore((state) => state.userName);

  const { data: project, isPending, isError } = useQuery<ApiProject>({
    queryKey: ["projects", slug],
    queryFn: () => fetchProjectBySlug(slug ?? ""),
    enabled: Boolean(slug),
  });

  if (isPending) return <div className="p-6 animate-pulse">Loading project...</div>;

  if (isError || !project) {
    return (
      <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-red-700">Item Not Found</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          No reported item matches the code <strong>{slug}</strong>.
        </p>
        <button
          type="button"
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
        Item Details — {project.title}
      </h2>
      <CourseCard course={project} />

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
        >
          Back to Items
        </button>
      </div>
    </main>
  );
}

export default CourseDetailPage;
