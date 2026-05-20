import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm font-medium text-gray-500">
        Cargando registros...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mx-6 my-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-4 mx-auto max-w-8xl">
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200 border-collapse">
            <thead className="bg-gray-50/70">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Empresa
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Teléfono
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Status Llamada
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Estado Proceso
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Interés
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr
                  key={lead.id_registro}
                  className="transition-colors duration-150 ease-in-out hover:bg-gray-50/80 cursor-pointer"
                  onClick={() => navigate(`/lead/${lead.id_registro}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.nombre_completo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.nombre_empresa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono tracking-tight">
                    {lead.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize border ${
                        lead.vapi_call_status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : lead.vapi_call_status === "failed"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {lead.vapi_call_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium uppercase border ${
                        lead.status_procesos === "PENDIENTE"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : lead.status_procesos === "COMPLETADO" ||
                              lead.status_procesos === "PROCESADO"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {lead.status_procesos}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`text-xs font-semibold ${
                        lead.interes_cliente?.toUpperCase() === "ALTO"
                          ? "text-orange-600"
                          : "text-gray-700"
                      }`}
                    >
                      {lead.interes_cliente || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.created_at).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {leads.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-400 bg-gray-50/50">
            No hay registros de leads disponibles en este momento.
          </div>
        )}
      </div>
    </div>
  );
}
