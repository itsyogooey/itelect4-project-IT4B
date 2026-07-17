import type { User, Course } from "./types";

function getUser(id: number): User {
  return {
    id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
    score: 95.5,
  };
}

function calculateGrade(score: number, maxScore: number): string {
  const percentage: number = (score / maxScore) * 100;

  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";

  return "F";
}

function formatCourse(name: string, units: number, semester: string): string {
  return `${name} (${units} units) - ${semester}`;
}

const user: User = getUser(1);
console.log(user);
console.log(calculateGrade(85, 100));
console.log(formatCourse("IT Elective 4", 3, "1st Semester"));



// ===== GENERIC FUNCTIONS =====
// T is inferred automatically from whatever array you pass in
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
// Constrained generic -- T must have an "id: number" field
function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}
// [user] is an array containing one element
const firstUser = getFirst<User>([user]);
const foundUser = getById<User>([user], 1);

// Each ?. checks whether the object on its left exists before trying to access the next property, preventing errors if any part of the chain is null or undefined.
console.log(firstUser?.name); // Juan dela Cruz
console.log(foundUser?.email); // juan@example.com


// ===== USING UTILITY TYPES =====
import { UserUpdate, UserPreview, PublicUser, RoleCount } from "./types";

// Partial<T> -- update payload only needs the changed fields
const patch: UserUpdate = { name: "Juan D. Cruz" };

// Pick<T,K> -- a lightweight preview object
const preview: UserPreview = { id: 1, name: "Juan dela Cruz", role: "student" };

// Omit<T,K> -- safe to expose publicly (no email, no isActive)
const publicProfile: PublicUser = { id: 1, name: "Juan dela Cruz", role: "student" };

// Record<K,T> -- dashboard-style counts
const roleCount: RoleCount = { student: 45, admin: 2, instructor: 3 };

// ===== ReturnType<T> =====
function makeSubmission(courseCode: string) {
return { id: 1, studentId: 1, courseCode, submittedAt: new Date() };
}

// Infer the shape directly from the function -- no need to redeclare it
type NewSubmission = ReturnType<typeof makeSubmission>;
const gt1Submission: NewSubmission = makeSubmission("ITELECT4");


// ===== USING ENUMS =====
import { SubmissionStatus, Role } from "./types";

let status: SubmissionStatus = SubmissionStatus.Pending;
console.log(SubmissionStatus[status]); // "Pending" -- reverse mapping

status = SubmissionStatus.Graded;
console.log(status === SubmissionStatus.Graded); // true

const currentRole: Role = Role.Student;
console.log(currentRole); // "student"

