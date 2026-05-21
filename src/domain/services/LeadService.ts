import { n8nClient } from "../../data/repositories";
import { n8nUrl } from "../../data/repositories/n8nUrl";
import type {
  ContactoBriscoResponse,
  LeadFilters,
  TranscriptionResponse,
} from "../entities";

const WEBHOOK_PATH = import.meta.env.VITE_N8N_WEBHOOK_PATH || "web_google_drive";
const AUDIO_WEBHOOK_PATH = import.meta.env.VITE_N8N_AUDIO_WEBHOOK_PATH || "web_google_drive_audio";

export interface AudioResponse {
  audio: {
    url: string;
    name: string;
    mimeType: string;
  };
}

function filterLeads(
  leads: ContactoBriscoResponse[],
  filters: LeadFilters,
): ContactoBriscoResponse[] {
  return leads.filter((lead) => {
    const status = lead.status_procesos ?? "";
    const empresa = lead.nombre_empresa ?? "";
    const cliente = lead.nombre_completo ?? "";
    const interes = lead.interes_cliente ?? "";
    const createdAt =
      lead.created_at ?? lead.fecha_ultima_compra ?? new Date().toISOString();

    if (
      filters.proceso &&
      !status.toLowerCase().includes(filters.proceso.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.empresa &&
      !empresa.toLowerCase().includes(filters.empresa.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.cliente &&
      !cliente.toLowerCase().includes(filters.cliente.toLowerCase())
    ) {
      return false;
    }
    if (filters.fechaInicio && createdAt < `${filters.fechaInicio}T00:00:00`) {
      return false;
    }
    if (filters.fechaFin && createdAt > `${filters.fechaFin}T23:59:59`) {
      return false;
    }
    if (
      filters.interes &&
      !interes.toLowerCase().includes(filters.interes.toLowerCase())
    ) {
      return false;
    }

    // Filtro por duración
    if (filters.duracion) {
      const d = lead.duracion_llamada;
      if (d === undefined || d === null || d === "" || d === "N/A") {
        return false;
      }
      const valor = typeof d === "number" ? d : parseFloat(d);
      if (isNaN(valor) || valor < 0) return false;
      const min = Math.floor(valor);
      const seg = Math.round((valor - min) * 100);
      const totalSeg = min * 60 + seg;

      const ranges: Record<string, [number, number]> = {
        "0-30s": [0, 30],
        "31-60s": [31, 60],
        "1-2 min": [61, 120],
        "2-5 min": [121, 300],
        "5+ min": [301, Infinity],
      };

      const [lo, hi] = ranges[filters.duracion] ?? [-1, -1];
      if (totalSeg < lo || totalSeg > hi) return false;
    }

    // Filtro por razón de terminación
    if (
      filters.razonTerminado &&
      !(lead.razon_terminado_llamada ?? "")
        .toLowerCase()
        .includes(filters.razonTerminado.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}

export const leadService = {
  async getAllLeads(
    filters: LeadFilters = {} as LeadFilters,
  ): Promise<ContactoBriscoResponse[]> {
    const leads = await n8nClient.getContactos();
    const filtered = filterLeads(leads, filters);
    return filtered.sort((a, b) => {
      const dateA = a.created_at ?? a.fecha_ultima_compra ?? "";
      const dateB = b.created_at ?? b.fecha_ultima_compra ?? "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  },

  async getLeadById(leadId: number): Promise<ContactoBriscoResponse> {
    const leads = await leadService.getAllLeads();
    const lead = leads.find((l) => l.id_cliente === leadId);
    if (!lead) throw new Error(`Lead con ID ${leadId} no encontrado`);
    return lead;
  },

  async getLeadTranscription(callId: string): Promise<string> {
    const response = await fetch(`${n8nUrl(WEBHOOK_PATH)}?call_id=${callId}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: TranscriptionResponse = await response.json();
    return (
      data.texto?.transcripcion_limpia || "No hay transcripción disponible"
    );
  },

  async getLeadAudio(callId: string): Promise<AudioResponse> {
    const response = await fetch(
      `${n8nUrl(AUDIO_WEBHOOK_PATH)}?call_id=${callId}`,
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: AudioResponse = await response.json();
    return data;
  },
};
