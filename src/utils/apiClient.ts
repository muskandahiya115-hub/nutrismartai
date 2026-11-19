const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

export const apiConfigured = API_BASE.length > 0;

export class ApiRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
  } catch {
    throw new ApiRequestError(0, 'Could not reach the NutriSmart server. Please try again.');
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiRequestError(response.status, body?.error ?? `Request failed (${response.status}).`);
  }
  if (body === null || typeof body !== 'object') {
    throw new ApiRequestError(0, 'The server returned an unexpected response.');
  }
  return body as T;
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>(path);
}

export function apiPost<T>(path: string, data: unknown): Promise<T> {
  return request<T>(path, { method: 'POST', body: JSON.stringify(data) });
}
