import type { ReactNode } from "react";
import type { Submission } from "../types";

export interface SubmissionBadgeProps {
  submission: Submission;
  children?: ReactNode;
}

export default function SubmissionBadge({ submission, children }: SubmissionBadgeProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold">Submission #{submission.id}</div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
          {submission.courseCode}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Submitted at: {submission.submittedAt.toLocaleString()}</p>
      <div className="mt-5 rounded-3xl bg-white px-4 py-4 text-sm font-medium text-slate-700 shadow-sm dark:bg-slate-950 dark:text-slate-100">
        {children}
      </div>
    </div>
  );
}
