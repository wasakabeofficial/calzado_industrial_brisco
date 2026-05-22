import { n8nClient, n8nFetch } from "../repositories";
import { n8nUrl } from "../repositories/n8nUrl";
import { filterLeads } from "../../domain/services";
import type {
  ContactoBriscoResponse,
  LeadFilters,
  TranscriptionResponse,
} from "../../domain/entities";

const WEBHOOK_PATH = import.meta.env.VITE_N8N_WEBHOOK_PATH;
const AUDIO_WEBHOOK_PATH = import.meta.env.VITE_N8N_AUDIO_WEBHOOK_PATH;

export interface AudioResponse {
  audio: {
    url: string;
    name: string;
    mimeType: string;
  };
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
    const response = await n8nFetch(`${n8nUrl(WEBHOOK_PATH)}?call_id=${callId}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: TranscriptionResponse = await response.json();
    return (
      data.texto?.transcripcion_limpia || "No hay transcripción disponible"
    );
  },

  async getLeadAudio(callId: string): Promise<AudioResponse> {
    const response = await n8nFetch(
      `${n8nUrl(AUDIO_WEBHOOK_PATH)}?call_id=${callId}`,
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: AudioResponse = await response.json();
    return data;
  },
};
