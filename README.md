# IT Elective 4 - TypeScript Project

## Project Concept
This project demonstrates TypeScript fundamentals including interfaces, types, generics, utility types, and enums. It manages student course submissions with type-safe operations.

## Features
- **Interfaces**: User, Course, and Submission types for educational management
- **Generics**: ApiResponse wrapper for type-safe API responses, generic functions (getFirst, getById)
- **Utility Types**: Partial, Pick, Omit, Record types for flexible type composition
- **Enums**: SubmissionStatus and Role enums for fixed values
- **Type Aliases**: Union types, intersection types, and structured type definitions

## How to Run
```bash
# Install dependencies
npm install

# Type check (verify no errors)
npx tsc --noEmit

# Run the code
npx ts-node src/index.ts
```

## Project Structure
- `src/index.ts` - Main entry point with User, Course, and generic examples
- `src/sample.ts` - Additional examples of generics and utility types
- `types/index.ts` - All TypeScript type definitions and interfaces
