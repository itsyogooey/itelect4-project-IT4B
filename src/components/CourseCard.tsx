import type { Course } from "../types/index";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact";
}

export default function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const isCompact = variant === "compact";

  return (
    <article className={`rounded-3xl border p-5 shadow-sm transition ${isCompact ? "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950"}`}>
      <div className="flex items-center justify-between gap-3">
        <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${isCompact ? "text-slate-700 dark:text-slate-300" : "text-sky-700 dark:text-sky-300"}`}>
          {course.code}
        </p>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {course.units} units
        </span>
      </div>
      {!isCompact && <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{course.title}</h3>}
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{course.semester}</p>
    </article>
  );
}
