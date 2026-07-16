# IT Elective 4 - TypeScript Project

## Project Concept
This TypeScript project models an educational submission system using type-safe interfaces, type aliases, enums, generics, utility types, and functions. It demonstrates how to structure user, course, and submission data with strong typing while keeping runtime code simple and maintainable.

## Interfaces and Types Defined So Far
- `User` — represents a user account with name, email, role, and active status
- `Course` — defines a course code, title, units, and semester
- `Submission` — models a student submission with course reference, submission time, and optional score
- `ApiResponse<T>` — generic wrapper for API-style responses
- `UserUpdate` — partial update payload based on `User`
- `UserPreview` — lightweight preview of a `User`
- `PublicUser` — public-safe user shape without private fields
- `RoleCount` — record type for counting roles
- `ID` — union alias for numeric or string IDs
- `Coordinate` — alias for x/y coordinate objects
- `Formatter` — function type for formatting numeric values
- `StringOrNumber` and `Status` — example unions for flexible values
- `StudentWithCourse` — intersection type combining `User` and course enrollment
- `SubmissionStatus` and `Role` — enums for fixed allowed values

## How to Install and Run
```bash
npm install
npx tsc --noEmit
npx ts-node src/index.ts
```

## Project Structure
- `src/index.ts` — main entry point with sample runtime code and generic API response examples
- `src/sample.ts` — additional utility examples including generic functions and type operations
- `types/index.ts` — all type and interface definitions used by the project
