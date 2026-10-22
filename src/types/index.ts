// ===== GT1-GT3: shapes written for json-server and db.json =====
// export interface Project { id: string; slug: string; title: string;
//   description: string; dueDate: Date; category?: string; location?: string;
//   status?: "Lost"; postedBy?: string; reportedDate?: string; }
// export type ApiProject = Omit<Project, "id" | "dueDate"> & { id: string; dueDate: string };
// export type NewProject = Omit<ApiProject, "id">;
// export type NewSubmission = ReturnType<typeof getSubmissionTemplate>;
//   -> the template invented studentId: "student-1" and submittedAt: new Date()
//
// NOTE: json-server stored whatever the browser sent, so the browser made up
//       the owner and the date. The real API takes the owner from the token
//       and the date from the schema default, so neither is sent any more.
// ===== GT4 Part 2: the same three interfaces as itelect4-backend =====

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Item {
  id: number;
  title: string;
  status: "lost" | "found" | "claimed";
  locationCode: string;
  reward?: number;
  createdAt: Date;
  ownerId: number;
}

// Reference data: the campus places the Report form's dropdown reads.
export interface Location {
  code: string;
  name: string;
}

// What GET /api/items sends back. MongoDB ids are 24 hex characters, and a
// date in JSON is an ISO string, never a Date object.
export type ApiItem = Omit<Item, "id" | "ownerId" | "createdAt"> & {
  id: string;        // from MongoDB's _id
  ownerId: string;   // the owner's _id, filled in by the API from the token
  createdAt: string; // ISO string, filled in by the API
};

// What we SEND when reporting an item. No ownerId and no createdAt: the
// server fills both in, so sending them would be ignored at best.
// itelect4-backend's NewItemBody is this same Pick.
export type NewItem = Pick<Item, "title" | "status" | "reward" | "locationCode">;

// What /api/auth/register sends back, and the user inside the login reply.
export type ApiUser = Omit<User, "id"> & {
  id: string;
};

// What /api/auth/login sends back. The token goes in the Authorization header.
export interface AuthReply {
  token: string;
  user: ApiUser;
}

// ===== Kept from GT1: generic and utility types =====
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export enum ItemStatus {
  Lost = "lost",
  Found = "found",
  Claimed = "claimed",
}

export type UserPreview = Pick<User, "id" | "name" | "email">;
export type PublicItem = Omit<ApiItem, "ownerId">;
export type ItemUpdate = Partial<NewItem>;
export type RoleCount = Record<User["role"], number>;

// ===== GT5: what POST /api/ai sends back =====
// itelect4-backend's ItemDraft type is derived from a Zod schema in
// src/schemas/itemDraft.ts, and this has to say the same thing. Nothing
// checks that the two agree -- you do.
export interface AiItemDraft {
  title: string;
  summary: string;
  category: "electronics" | "wallet-or-id" | "bag" | "accessory" | "clothing" | "other";
  clarity: "clear" | "needs-details" | "too-vague";
  tips: string[];
}
