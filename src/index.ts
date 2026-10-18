import type { ApiItem, ApiResponse } from "./types/index";

export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item: T) => item.id === id);
}

export function createItemResponse(item: ApiItem): ApiResponse<ApiItem> {
  return {
    data: item,
    success: true,
  };
}