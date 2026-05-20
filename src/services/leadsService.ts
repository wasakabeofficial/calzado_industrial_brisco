import { supabase } from "../lib/supabase";
import type { Lead, TranscripcionData } from "../types";

const TABLA_LEADS = "leads_brisco";
const WEBHOOK_N8N = "https://cesar.n8n-wsk.com/webhook/web_google_drive";

export const leadsService = {
  async getAll(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from(TABLA_LEADS)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: number): Promise<Lead> {
    const { data, error } = await supabase
      .from(TABLA_LEADS)
      .select("*")
      .eq("id_registro", id)
      .single();

    if (error) throw error;
    return data;
  },

  async getTranscripcion(callId: string): Promise<string> {
    const response = await fetch(`${WEBHOOK_N8N}?call_id=${callId}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: TranscripcionData = await response.json();
    return (
      data.texto?.transcripcion_limpia || "No hay transcripción disponible"
    );
  },
};
