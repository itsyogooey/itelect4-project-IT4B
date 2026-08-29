# Campus Lost and Found

## Project Concept
This TypeScript and React application helps students browse campus lost-item reports, mark items as claimed or found for the current session, and review their activity on a profile page.

## TypeScript Features
- Project entities and API types in `src/types/index.ts`
- Generic `ApiResponse<T>` and lookup functions
- Utility types including `Omit`, `Pick`, and `Partial`
- Strict TypeScript configuration

## How to Install and Run
```bash
npm install
npm run api
npm run dev
```

Run `npm run type-check` to verify the TypeScript project with zero errors.

## Project Structure
- `src/index.ts` — generic TypeScript examples
- `src/types/index.ts` — project entities and shared type definitions
- `src/pages/` — Dashboard, Items, Login, Profile, and detail views
- `src/components/` — reusable typed UI components
