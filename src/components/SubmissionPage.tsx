import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiSubmission } from "../types/index";
import SubmissionBadge from "../components/SubmissionBadge";
import { fetchSubmissions, createSubmission } from "../api/client";

function SubmissionsPage() {
  // Local state — only this form reads it, not global store
  const [repoUrl, setRepoUrl] = useState<string>("");
  const queryClient = useQueryClient();

  // 1️⃣ READ — same useQuery pattern as CoursesPage
  const { data, isPending, isError } = useQuery<ApiSubmission[]>({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  // 2️⃣ WRITE — mutationFn does the POST, onSuccess cleans up after it
  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      // The submissions list is out of date now — go and refetch it
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      setRepoUrl("");
    },
  });

  // mutate() is what an event handler calls
  const handleAdd = (): void => {
    addSubmission.mutate({
      studentId: "u-1",
      projectId: "p-itelect4",
      repoUrl: repoUrl,
      submittedAt: new Date().toISOString(), // a STRING, not a Date
    });
  };

  // 3️⃣ Conditional rendering
  if (isPending) {
    return <div className="animate-pulse rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Loading submissions...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        Could not load submissions.
      </div>
    );
  }

  // 4️⃣ Main render
  return (
    <main className="page-frame page-panel">
      <p className="page-eyebrow">Submission log / active work</p>
      <h2 className="page-title">
        My Submissions
      </h2>

      <div className="submission-form">
        <input
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="github.com/you/your-repo"
          className="w-full rounded border border-gray-300 p-3"
        />
        <button
          onClick={handleAdd}
          disabled={repoUrl === "" || addSubmission.isPending}
          className="w-full rounded bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400 sm:w-auto"
        >
          {addSubmission.isPending ? "Saving..." : "Add"}
        </button>
      </div>

      {addSubmission.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addSubmission.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data?.map((s: ApiSubmission) => (
          <SubmissionBadge key={s.id} submission={s}>
            <div className="submission-field submission-field-project">
              <span className="submission-field-label">Project</span>
              <span className="submission-field-value">{s.projectId}</span>
            </div>
          </SubmissionBadge>
        ))}
      </div>
    </main>
  );
}

export default SubmissionsPage;
