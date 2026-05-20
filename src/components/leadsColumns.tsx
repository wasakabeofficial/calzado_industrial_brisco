import type { Lead } from "../types";

export const leadsColumns = [
  { key: "nombre_completo" as keyof Lead, header: "Cliente" },
  { key: "nombre_empresa" as keyof Lead, header: "Empresa" },
  { key: "telefono" as keyof Lead, header: "Teléfono" },
  {
    key: "vapi_call_status" as keyof Lead,
    header: "Status Llamada",
    render: (lead: Lead) => (
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
    ),
  },
  {
    key: "status_procesos" as keyof Lead,
    header: "Estado Proceso",
    render: (lead: Lead) => (
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
    ),
  },
  {
    key: "interes_cliente" as keyof Lead,
    header: "Interés",
    render: (lead: Lead) => (
      <span
        className={`text-xs font-semibold ${
          lead.interes_cliente?.toUpperCase() === "ALTO"
            ? "text-orange-600"
            : "text-gray-700"
        }`}
      >
        {lead.interes_cliente || "N/A"}
      </span>
    ),
  },
  {
    key: "created_at" as keyof Lead,
    header: "Fecha",
    render: (lead: Lead) =>
      new Date(lead.created_at).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
];
