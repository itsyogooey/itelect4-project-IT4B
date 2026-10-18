# Campus Lost and Found

## Project Concept
This TypeScript and React application lets students register and log in, report lost or found items at a campus location, mark them as claimed or found, and review their activity on a profile page. Items and locations are stored in MongoDB through the itelect4-backend API.

## TypeScript Features
- Project entities and API types in `src/types/index.ts`
- Generic `ApiResponse<T>` and lookup functions
- Utility types including `Omit`, `Pick`, and `Partial`
- Strict TypeScript configuration

## How to Install and Run
The data now comes from the deployed API (itelect4-backend), not from json-server.

```bash
npm install
copy .env.example .env      # then set VITE_API_URL to the backend address
npm run dev
```

Run `npm run type-check` to verify the TypeScript project with zero errors.

## Project Structure
- `src/index.ts` — generic TypeScript examples
- `src/types/index.ts` — project entities and shared type definitions
- `src/pages/` — Dashboard, Items, Login, Profile, and detail views
- `src/components/` — reusable typed UI components
