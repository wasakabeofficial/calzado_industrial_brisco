import { supabase } from "../../data/repositories";
import type { Lead, TranscriptionResponse } from "../entities";

const LEADS_TABLE = "leads_brisco";
const N8N_WEBHOOK_URL = "https://cesar.n8n-wsk.com/webhook/web_google_drive";

export const leadService = {
  async getAllLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from(LEADS_TABLE)
      .select("*")
      .order("created_at", { ascending: false });

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
};
