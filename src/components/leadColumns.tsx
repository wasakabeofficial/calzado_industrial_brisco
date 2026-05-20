import type { Lead } from "../types";

export const leadTableColumns = [
  { key: "nombre_completo" as keyof Lead, header: "Customer" },
  { key: "nombre_empresa" as keyof Lead, header: "Company" },
  { key: "telefono" as keyof Lead, header: "Phone" },
  {
    key: "vapi_call_status" as keyof Lead,
    header: "Call Status",
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
    header: "Process Status",
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
    header: "Interest",
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
    header: "Date",
    render: (lead: Lead) =>
      new Date(lead.created_at).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
];
