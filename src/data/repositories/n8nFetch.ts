const AUTHORIZATION_HEADER_NAME = "Authorization";
const AUTHORIZATION_TOKEN_VALUE = "Bearer BriscoNeuropoint.ai";

export function n8nFetch(url: string, options?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      [AUTHORIZATION_HEADER_NAME]: AUTHORIZATION_TOKEN_VALUE,
    },
  });
}
