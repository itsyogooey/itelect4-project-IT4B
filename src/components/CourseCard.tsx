import type { ApiProject } from "../types/index";

interface CourseCardProps {
  readonly course: ApiProject;
  readonly variant?: "default" | "compact";
}

export default function CourseCard({
  course,
  variant = "default",
}: CourseCardProps) {
  const isCompact = variant === "compact";

  return (
    <article className={`project-card border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950 ${isCompact ? "project-card-compact" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        {!isCompact && <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{course.title}</h3>}
      </div>
      <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <p>Location: {course.location ?? "Not specified"}</p>
      </div>
    </article>
  );
}
