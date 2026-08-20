import type { ReactNode } from "react";
import type { Submission } from "../types/index";

export interface SubmissionBadgeProps {
  submission: Submission;
  children?: ReactNode;
}

export default function SubmissionBadge({ submission, children }: SubmissionBadgeProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <p className="text-gray-900 dark:text-white">
        Repo: {submission.repoUrl}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Score: {submission.score ?? "Not graded yet"}
      </p>
      {children}
    </div>
  );
}

