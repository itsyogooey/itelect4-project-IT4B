import type {
  AiItemDraft,
  ApiItem,
  ApiUser,
  AuthReply,
  ItemUpdate,
  Location,
  NewItem,
} from "../types/index";
import useAuthStore from "../store/authStore";

// ===== GT3: one hard-coded host, and no token anywhere =====
// export const API_URL = "http://localhost:3001";   // json-server
// export async function fetchProjects(): Promise<ApiProject[]> {
//   const res = await fetch(`${API_URL}/projects`);
//   if (!res.ok) throw new Error("Could not load projects");
//   return res.json();
// }
// ... and the same lines again for every call, each with a guessed message.
//
// NOTE: The host was written into the code, so the deployed app would still
//       call the laptop. Nothing sent a token. And every error message was
//       invented here instead of read from the API.
// ===== GT4 Part 2: one request() helper, and the host from the env =====

// Vite only exposes variables that start with VITE_, and it bakes the value
// in at BUILD time. Changing it in Vercel needs a new deploy to take effect.
export const API_URL: string = import.meta.env.VITE_API_URL;

// A clear sentence now beats every call going to "undefined/api/items".
if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, " +
      "and restart npm run dev.",
  );
}

// Every call goes through here: the host, the JSON header, the token when
// there is one, and the API's own message when it refuses.
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  // getState(), not the hook: this is not a component. It only needs the
  // token as it is at the moment of the call.
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      // Exactly what requireAuth reads: "Bearer", one space, the token.
      // No token means no header, which is what the public routes want.
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    // Every refusal from this API has a message field. Show that sentence.
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  // DELETE answers 204 with no body, so there is nothing to parse.
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

// ---- locations: public reference data. No token needed.

export function fetchLocations(): Promise<Location[]> {
  return request<Location[]>("/api/locations");
}

export function fetchLocationByCode(code: string): Promise<Location> {
  return request<Location>(`/api/locations/${encodeURIComponent(code)}`);
}

// ---- items: private. request() adds the token automatically.

export function fetchItems(): Promise<ApiItem[]> {
  return request<ApiItem[]>("/api/items");
}

export function fetchItemById(id: string): Promise<ApiItem> {
  return request<ApiItem>(`/api/items/${encodeURIComponent(id)}`);
}

export function createItem(newItem: NewItem): Promise<ApiItem> {
  return request<ApiItem>("/api/items", {
    method: "POST",
    body: JSON.stringify(newItem),
  });
}

export function updateItem(id: string, changes: ItemUpdate): Promise<ApiItem> {
  return request<ApiItem>(`/api/items/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteItem(id: string): Promise<void> {
  return request<void>(`/api/items/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

// ---- auth: the two routes that make a session exist

export function registerUser(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiUser> {
  return request<ApiUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ===== GT5: one more private call =====
// ---- ai: private, like items. The token goes on automatically, which
// matters more here than anywhere: without it, anyone could spend the
// Gemini quota. No key and no Gemini address are in this file -- the
// browser only ever calls our own API.
export function askAi(prompt: string): Promise<AiItemDraft> {
  return request<AiItemDraft>("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}
