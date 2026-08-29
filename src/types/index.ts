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
}

export type ApiProject = Omit<Project, "id" | "dueDate"> & {
  id: string;
  dueDate: string;
};

export type NewProject = Omit<ApiProject, "id">;

export type UserPreview = Pick<User, "id" | "name" | "email">;
export type PublicProject = Omit<ApiProject, "postedBy">;

