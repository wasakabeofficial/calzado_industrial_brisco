import type { Campana } from "../entities";
import { n8nUrl } from "../../data/repositories/n8nUrl";

const CAMPANAS_PATH = import.meta.env.VITE_N8N_CAMPANAS_PATH;

export const campanaService = {
  async getAll(): Promise<Campana[]> {
    const response = await fetch(n8nUrl(CAMPANAS_PATH));

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

  async create(data: Omit<Campana, "row_number">): Promise<void> {
    const response = await fetch(n8nUrl(CAMPANAS_PATH), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  },

  async update(rowNumber: number, data: Partial<Campana>): Promise<void> {
    const response = await fetch(n8nUrl(CAMPANAS_PATH), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row_number: rowNumber, ...data }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  },
};
