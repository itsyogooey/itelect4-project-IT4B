import React from "react";
import type { Submission } from "../types";

export interface SubmissionBadgeProps {
  submission: Submission;
  children?: React.ReactNode;
}

export default function SubmissionBadge({ submission, children }: SubmissionBadgeProps) {
  return (
    <div className="submission-badge" style={{ border: "1px dashed #aaa", padding: 8, borderRadius: 6 }}>
      <div>Submission #{submission.id} — {submission.courseCode}</div>
      <div style={{ fontSize: 12, color: "#666" }}>Submitted at: {submission.submittedAt.toLocaleString()}</div>
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}
