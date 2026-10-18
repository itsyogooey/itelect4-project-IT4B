import { Link } from "react-router";
import type { ApiItem } from "../types/index";

interface CourseCardProps {
  readonly course: ApiItem;
  readonly locationName?: string;
  readonly variant?: "default" | "compact";
}

export default function CourseCard({
  course,
  locationName,
  variant = "default",
}: CourseCardProps) {
  const isCompact = variant === "compact";

  return (
    <article className={`project-card border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950 ${isCompact ? "project-card-compact" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        {!isCompact && (
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            <Link to={`/projects/${course.id}`} className="project-link">
              {course.title}
            </Link>
          </h3>
        )}
      </div>
      <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <p>Status: {course.status}</p>
        <p>Location: {locationName ?? course.locationCode}</p>
        {course.reward !== undefined && course.reward > 0 && <p>Reward: PHP {course.reward}</p>}
        <p className="text-xs text-slate-500">Reported {new Date(course.createdAt).toLocaleDateString()}</p>
      </div>
    </article>
  );
}
