import { supabase } from "../../data/repositories";
import type { Lead, LeadFilters, TranscriptionResponse } from "../entities";

const LEADS_TABLE = import.meta.env.VITE_LEADS_TABLE || "leads_brisco";
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;
const N8N_AUDIO_WEBHOOK_URL = import.meta.env.VITE_N8N_AUDIO_WEBHOOK_URL;

export interface AudioResponse {
  audio: {
    url: string;
    name: string;
    mimeType: string;
  };
}

export const leadService = {
  async getAllLeads(filters: LeadFilters = {} as LeadFilters): Promise<Lead[]> {
    let query = supabase.from(LEADS_TABLE).select("*");

    if (filters.proceso) {
      query = query.ilike("status_procesos", `%${filters.proceso}%`);
    }
    if (filters.empresa) {
      query = query.ilike("nombre_empresa", `%${filters.empresa}%`);
    }
    if (filters.cliente) {
      query = query.ilike("nombre_completo", `%${filters.cliente}%`);
    }
    if (filters.fechaInicio) {
      query = query.gte("created_at", `${filters.fechaInicio}T00:00:00`);
    }
    if (filters.fechaFin) {
      query = query.lte("created_at", `${filters.fechaFin}T23:59:59`);
    }
    if (filters.interes) {
      query = query.ilike("interes_cliente", `%${filters.interes}%`);
    }
    const { data, error } = await query.order("created_at", {
      ascending: false,
    });
    if (error) throw error;
    return data || [];
  },

  async getLeadById(leadId: number): Promise<Lead> {
    const { data, error } = await supabase
      .from(LEADS_TABLE)
      .select("*")
      .eq("id_registro", leadId)
      .single();

    if (error) throw error;
    return data;
  },

  async getLeadTranscription(callId: string): Promise<string> {
    const response = await fetch(`${N8N_WEBHOOK_URL}?call_id=${callId}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: TranscriptionResponse = await response.json();
    return (
      data.texto?.transcripcion_limpia || "No hay transcripción disponible"
    );
  },

  async getLeadAudio(callId: string): Promise<AudioResponse> {
    const response = await fetch(`${N8N_AUDIO_WEBHOOK_URL}?call_id=${callId}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: AudioResponse = await response.json();
    return data;
  },
};
