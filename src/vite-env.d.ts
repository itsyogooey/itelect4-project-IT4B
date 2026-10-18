/// <reference types="vite/client" />

// Tells TypeScript which VITE_ variables exist, so import.meta.env is typed.
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
