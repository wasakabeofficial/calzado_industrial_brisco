const AUTH_HEADER = "Authorization";
const AUTH_TOKEN = "Bearer BriscoNeuropoint.ai";

export function n8nFetch(url: string, options?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      [AUTH_HEADER]: AUTH_TOKEN,
    },
  });
}
