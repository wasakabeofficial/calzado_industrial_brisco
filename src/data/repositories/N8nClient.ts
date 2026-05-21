import type { ContactoBriscoResponse } from "../../domain/entities";

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_CONTACTOS_WEBHOOK_URL;

export const n8nClient = {
  async getContactos(): Promise<ContactoBriscoResponse[]> {
    const response = await fetch(N8N_WEBHOOK_URL);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: unknown = await response.json();

    if (Array.isArray(data)) {
      return data as ContactoBriscoResponse[];
    }

    if (typeof data === "object" && data !== null) {
      const record = data as Record<string, unknown>;
      const contactos = record.data ?? record.contactos;
      if (Array.isArray(contactos)) {
        return contactos as ContactoBriscoResponse[];
      }
    }

    return [];
  },
};
