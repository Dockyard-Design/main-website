import { API_URL, API_KEY } from "./env";

import type { Project, ApiResponse } from "./types";

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    next: {
      revalidate: 60,
      tags: ["projects"],
    },
  });

  if (!res.ok) {
    throw new ApiError(`API request failed: ${res.statusText}`, res.status);
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new ApiError("Invalid JSON response from API");
  }

  if (!json || typeof json !== "object") {
    throw new ApiError("Unexpected API response format");
  }

  const response = json as ApiResponse;

  if (!Array.isArray(response.data)) {
    throw new ApiError("API response missing 'data' array");
  }

  return response.data;
}
