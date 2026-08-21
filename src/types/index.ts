export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
  score?: number;
}

export type ApiUser = Omit<User, "id"> & { id: string };

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  dueDate: Date;
}

export type ApiProject = Omit<Project, "id" | "dueDate"> & {
  id: string;
  dueDate: string;
};

export type NewProject = Omit<ApiProject, "id">;

export interface Submission {
  id: string;
  projectId: string;
  studentId: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

export type ApiSubmission = Omit<Submission, "id" | "submittedAt"> & {
  id: string;
  submittedAt: string;
};

export type NewSubmission = Omit<ApiSubmission, "id">;
