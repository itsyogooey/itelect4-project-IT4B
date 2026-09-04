export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "faculty";
  isActive: boolean;
  score?: number;
  course?: string;
}

export type ApiUser = Omit<User, "id"> & { id: string };

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  dueDate: Date;
  category?: string;
  location?: string;
  status?: "Lost";
  postedBy?: string;
  reportedDate?: string;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: string;
  itemId: string;
  studentId: string;
  submittedAt: Date;
  status: "Pending" | "Verified" | "Rejected";
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export enum ItemStatus {
  Lost = "Lost",
  Found = "Found",
  Claimed = "Claimed",
}

export enum Role {
  Student = "student",
  Faculty = "faculty",
}

export enum SubmissionStatus {
  Pending = "Pending",
  Verified = "Verified",
  Rejected = "Rejected",
}

export type ApiProject = Omit<Project, "id" | "dueDate"> & {
  id: string;
  dueDate: string;
};

export type NewProject = Omit<ApiProject, "id">;

export type UserPreview = Pick<User, "id" | "name" | "email">;
export type PublicProject = Omit<ApiProject, "postedBy">;
export type UserUpdate = Partial<User>;
export type RoleCount = Record<"student" | "faculty", number>;

function getSubmissionTemplate() {
  return {
    id: "template-1",
    itemId: "item-1",
    studentId: "student-1",
    submittedAt: new Date(),
    status: "Pending" as const,
  };
}

export type NewSubmission = ReturnType<typeof getSubmissionTemplate>;
