import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import LeadInfo from "./LeadInfo";
import type { Lead } from "./Lead";

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transcripcion, setTranscripcion] = useState<string | null>(null);
  const [loadingTranscripcion, setLoadingTranscripcion] = useState(false);

  async function fetchLead() {
    if (!id) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads_brisco")
        .select("*")
        .eq("id_registro", parseInt(id))
        .single();

      if (error) throw error;
      setLead(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTranscripcion() {
    if (!lead?.vapi_call_id) return;
    try {
      setLoadingTranscripcion(true);
      setTranscripcion(null);

      const response = await fetch(
        `https://cesar.n8n-wsk.com/webhook/web_google_drive?call_id=${lead.vapi_call_id}`,
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setTranscripcion(
        data.texto?.transcripcion_limpia || "No hay transcripción disponible",
      );
    } catch (err) {
      console.error("Error fetching transcripcion:", err);
      setTranscripcion(
        "Error al cargar la transcripción (CORS bloqueado). Configura los headers en n8n.",
      );
    } finally {
      setLoadingTranscripcion(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!lead) return <div className="p-8">Lead no encontrado</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-orange-500 hover:text-orange-700 flex items-center gap-2"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Detalle del Lead
      </h1>

      <button
        onClick={fetchTranscripcion}
        disabled={loadingTranscripcion || !lead?.vapi_call_id}
        className="mb-6 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loadingTranscripcion ? "Cargando..." : "Leer Transcripción"}
      </button>

      <div
        className={
          transcripcion ? "grid grid-cols-2 gap-6" : "grid grid-cols-1 gap-6"
        }
      >
        {/* Left: Transcripción */}
        {transcripcion && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Transcripción</h2>
              <button
                onClick={() => setTranscripcion(null)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ✕ Cerrar
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{transcripcion}</p>
          </div>
        )}

        {/* Right: Detalles del Lead */}
        <LeadInfo lead={lead} />
      </div>
    </div>
  );
}
