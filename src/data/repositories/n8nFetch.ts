const AUTHORIZATION_HEADER_NAME = import.meta.env.VITE_N8N_AUTHORIZATION_HEADER;
const AUTHORIZATION_TOKEN_VALUE = import.meta.env.VITE_N8N_AUTHORIZATION_TOKEN;

export function n8nFetch(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      [AUTHORIZATION_HEADER_NAME]: AUTHORIZATION_TOKEN_VALUE,
    },
  });
}
