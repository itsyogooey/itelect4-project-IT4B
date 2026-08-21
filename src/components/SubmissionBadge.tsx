import type { ReactNode } from "react";
import type { ApiSubmission } from "../types/index";
export interface SubmissionBadgeProps {
  submission: ApiSubmission;
  children?: ReactNode;
}

export default function SubmissionBadge({ submission, children }: SubmissionBadgeProps) {
  return (
    <article className="submission-card">
      <div className="submission-card-header">
        <span className="submission-label">Submission</span>
        <span className={submission.score === undefined ? "submission-status submission-status-pending" : "submission-status"}>
          {submission.score === undefined ? "Pending" : "Graded"}
        </span>
      </div>
      <div className="submission-fields">
        <div className="submission-field">
          <span className="submission-field-label">Repository</span>
          <span className="submission-field-value">{submission.repoUrl}</span>
        </div>
        <div className="submission-field">
          <span className="submission-field-label">Score</span>
          <span className="submission-field-value">{submission.score ?? "Not graded yet"}</span>
        </div>
      </div>
      {children}
    </article>
  );
}

