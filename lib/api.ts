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

function createApiUrl(params?: Record<string, string | number | boolean>) {
  const url = new URL(API_URL);
  url.pathname = url.pathname.replace(/\/$/, "");

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

function createProjectsApiUrl(params?: Record<string, string | number | boolean>) {
  const url = createApiUrl(params);
  url.pathname = url.pathname.replace(/\/posts\/?$/, "/projects");

  return url;
}

async function fetchProjects(
  url: URL,
  tags: string[] = ["projects"]
): Promise<Project[]> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    next: {
      revalidate: 60,
      tags,
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

export async function getProjects(): Promise<Project[]> {
  return fetchProjects(createApiUrl());
}

export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await fetchProjects(
    createProjectsApiUrl({
      is_featured: true,
      limit: 1,
    }),
    ["projects", "featured-project"]
  );

  return projects.find((project) => project.is_featured) ?? null;
}
