import type { ApiProject } from "../types/index";

interface CourseCardProps {
  course: ApiProject;
  variant?: "default" | "compact";
}

export default function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const isCompact = variant === "compact";

  return (
    <article className={`project-card border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950 ${isCompact ? "project-card-compact" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${isCompact ? "text-slate-700 dark:text-slate-300" : "text-slate-700 dark:text-slate-300"}`}>
          {course.slug}
        </p>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Project
        </span>
      </div>
      {!isCompact && <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{course.title}</h3>}
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Due {new Date(course.dueDate).toLocaleDateString()}</p>
    </article>
  );
}
