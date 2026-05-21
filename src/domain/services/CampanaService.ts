import type { Campana } from "../entities";

const N8N_CAMPANAS_WEBHOOK_URL = import.meta.env.VITE_N8N_CAMPANAS_WEBHOOK_URL || "https://cesar.n8n-wsk.com/webhook/getCampanasBrisco";

export const campanaService = {
  async getAll(): Promise<Campana[]> {
    const response = await fetch(N8N_CAMPANAS_WEBHOOK_URL);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: unknown = await response.json();

    if (Array.isArray(data)) {
      return data as Campana[];
    }

    if (typeof data === "object" && data !== null) {
      const record = data as Record<string, unknown>;
      const campanas = record.data ?? record.campanas;
      if (Array.isArray(campanas)) {
        return campanas as Campana[];
      }
    }

    return [];
  },
};
