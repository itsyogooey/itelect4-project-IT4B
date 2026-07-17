// ===== UTILITY TYPES =====
// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;
// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;
// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive">;
// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<
  "student" | "admin" | "instructor",
  number
>;

// ===== ENUMS =====
// Regular enum -- exists at runtime; can be looped over or reverse-mapped
export enum SubmissionStatus {
  Pending,
  Graded,
  Late,
}

// const enum -- inlined at compile time, zero runtime overhead
export const enum Role {
  Student = "student",
  Admin = "admin",
  Instructor = "instructor",
}



// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor"; // only these values
  isActive: boolean;
  score?: number;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number; // ? means this field is optional
}

// ===== TYPE ALIASES =====
export type ID = number | string;

export type Coordinate = {
  x: number;
  y: number;
};

export type Formatter = (value: number) => string;

// Using them
const studentId: ID = "S2026-001";
const position: Coordinate = { x: 10, y: 20 };
const formatScore: Formatter = (value) => `${value}%`;

console.log(studentId); // S2026-001
console.log(formatScore(95.5)); // 95.5%


// ===== UNION TYPES -- One OR the other =====
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive"; // literal union

export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

printId(101);
printId("S2026-001");


// ===== INTERSECTION TYPES -- combines ALL properties =====
export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa: number;
};

const topStudent: StudentWithCourse = {
  id: 1, name: "Maria Santos", email: "m@example.com",
  role: "student", isActive: true,
  enrolledCourse: { code: "ITELECT4", title: "IT Elective 4", units: 3, semester: "1st" },
  gpa: 1.25,
};



// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// example objects (kept here for convenience)
const userResponse: ApiResponse<User> = {
    success: true,
    data: { id: 1, name: "Juan dela Cruz", email: "juan@example.com", role: "student", isActive: true },
};

const courseResponse: ApiResponse<Course[]> = {
    success: true,
    data: [{ code: "ITELECT4", title: "IT Elective 4", units: 3, semester: "1st" }],
};

console.log(userResponse.data.name); // Juan dela Cruz
