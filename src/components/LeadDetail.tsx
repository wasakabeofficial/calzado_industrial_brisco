import { useParams, useNavigate } from "react-router";
import LeadInfo from "./LeadInfo";
import { useLeadDetail } from "../hooks/useLeadDetail";
import { useTranscripcion } from "../hooks/useTranscripcion";

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const leadId = id ? parseInt(id) : 0;

  const { lead, loading, error } = useLeadDetail(leadId);
  const {
    transcripcion,
    loading: loadingTranscripcion,
    fetchTranscripcion,
    clearTranscripcion,
  } = useTranscripcion();

  const handleFetchTranscripcion = () => {
    if (lead?.vapi_call_id) {
      fetchTranscripcion(lead.vapi_call_id);
    }
  };

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
        onClick={handleFetchTranscripcion}
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
                onClick={clearTranscripcion}
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
