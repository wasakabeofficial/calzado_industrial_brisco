const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || "https://cesar.n8n-wsk.com/webhook";

export function n8nUrl(path: string): string {
  return `${N8N_BASE_URL}/${path}`;
}
