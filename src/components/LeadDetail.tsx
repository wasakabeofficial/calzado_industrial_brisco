import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

interface Lead {
  id_registro: number;
  id_cliente: number;
  vapi_call_id: string;
  nombre_completo: string;
  telefono: number;
  nombre_empresa: string;
  fecha_ultima_compra: string | null;
  producto_ultima_compra: string | null;
  vapi_call_status: string;
  status_procesos: string;
  interes_cliente: string;
  descripcion_interes_cliente: string | null;
  conversacion_lograda: boolean;
  accion_seguimiento: string;
  descripcion_accion_seguimiento: string | null;
  resumen_llamada: string | null;
  objeccion_principal: string;
  descripcion_objeccion_principal: string | null;
  created_at: string;
}

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
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Nombre Completo</p>
              <p className="text-lg font-medium text-gray-900">
                {lead.nombre_completo}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-lg font-medium text-gray-900">
                {lead.telefono}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Empresa</p>
              <p className="text-lg font-medium text-gray-900">
                {lead.nombre_empresa}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status Llamada</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.vapi_call_status === "completed"
                    ? "bg-green-100 text-green-800"
                    : lead.vapi_call_status === "failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {lead.vapi_call_status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado Proceso</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.status_procesos === "PENDIENTE"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {lead.status_procesos}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Última Compra</p>
              <p className="text-lg text-gray-900">
                {lead.fecha_ultima_compra || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Producto Última Compra</p>
              <p className="text-lg text-gray-900">
                {lead.producto_ultima_compra || "N/A"}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Interés del Cliente</p>
              <p className="text-lg text-gray-900">
                {lead.interes_cliente || "N/A"}
              </p>
            </div>
            {lead.descripcion_interes_cliente && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Descripción del Interés</p>
                <p className="text-lg text-gray-900">
                  {lead.descripcion_interes_cliente}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Conversación Lograda</p>
              <p className="text-lg text-gray-900">
                {lead.conversacion_lograda ? "Sí" : "No"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Acción de Seguimiento</p>
              <p className="text-lg text-gray-900">{lead.accion_seguimiento}</p>
            </div>
            {lead.descripcion_accion_seguimiento && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Descripción Acción</p>
                <p className="text-lg text-gray-900">
                  {lead.descripcion_accion_seguimiento}
                </p>
              </div>
            )}
            {lead.resumen_llamada && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Resumen de Llamada</p>
                <p className="text-lg text-gray-900">{lead.resumen_llamada}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Objeción Principal</p>
              <p className="text-lg text-gray-900">
                {lead.objeccion_principal}
              </p>
            </div>
            {lead.descripcion_objeccion_principal && (
              <div>
                <p className="text-sm text-gray-500">Descripción Objeción</p>
                <p className="text-lg text-gray-900">
                  {lead.descripcion_objeccion_principal}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Fecha de Registro</p>
              <p className="text-lg text-gray-900">
                {new Date(lead.created_at).toLocaleString("es-MX")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
