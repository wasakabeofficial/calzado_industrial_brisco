import { useEffect, useState } from "react";
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
  conversacion_lograda: boolean;
  created_at: string;
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from("leads_brisco")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeads();
  }, []);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Empresa
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status Llamada
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado Proceso
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Interés
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id_registro} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {lead.nombre_completo}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {lead.nombre_empresa}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {lead.telefono}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
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
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lead.status_procesos === "PENDIENTE"
                      ? "bg-yellow-100 text-yellow-800"
                      : lead.status_procesos === "COMPLETADO"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {lead.status_procesos}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {lead.interes_cliente || "N/A"}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(lead.created_at).toLocaleDateString("es-MX")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {leads.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No hay registros disponibles
        </div>
      )}
    </div>
  );
}
