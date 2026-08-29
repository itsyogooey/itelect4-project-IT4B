import type { ApiProject, ApiUser, NewProject } from "../types/index";

export const API_URL = "http://localhost:3001";

export async function fetchUsers(): Promise<ApiUser[]> {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) {
    throw new Error("Could not load users");
  }
  return res.json();
}

export async function fetchProjects(): Promise<ApiProject[]> {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) {
    throw new Error("Could not load projects");
  }
  return res.json();
}

export async function fetchProjectBySlug(slug: string): Promise<ApiProject> {
  const res = await fetch(`${API_URL}/projects?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) {
    throw new Error("Could not load that project");
  }
  const matches: ApiProject[] = await res.json();
  if (matches.length === 0) {
    throw new Error(`No project found with slug "${slug}".`);
  }
  return matches[0];
}

export async function fetchProjectById(id: string): Promise<ApiProject | null> {
  const res = await fetch(`${API_URL}/projects/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Could not load that item");
  return res.json();
}

export async function createProject(newProject: NewProject): Promise<ApiProject> {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProject),
  });
  if (!res.ok) {
    throw new Error("Could not save the item");
  }
  return res.json();
}

export async function updateProject(
  id: string,
  project: Partial<NewProject>
): Promise<ApiProject> {
  const res = await fetch(`${API_URL}/projects/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) {
    throw new Error("Could not update the item");
  }
  return res.json();
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Could not delete the item");
  }
}

