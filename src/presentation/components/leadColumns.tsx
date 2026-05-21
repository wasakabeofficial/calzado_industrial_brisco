import type { ContactoBriscoResponse } from "../../domain/entities";

export const leadTableColumns = [
  { key: "nombre_completo" as keyof ContactoBriscoResponse, header: "Cliente" },
  { key: "nombre_empresa" as keyof ContactoBriscoResponse, header: "Empresa" },
  { key: "telefono" as keyof ContactoBriscoResponse, header: "Teléfono" },
  {
    key: "vapi_call_status" as keyof ContactoBriscoResponse,
    header: "Status Llamada",
    render: (lead: ContactoBriscoResponse) => {
      const status = lead.vapi_call_status ?? "N/A";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize border ${
            status.toLowerCase() === "completado"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : status.toLowerCase() === "fallido"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    key: "status_procesos" as keyof ContactoBriscoResponse,
    header: "Estado Proceso",
    render: (lead: ContactoBriscoResponse) => {
      const proceso = lead.status_procesos ?? "N/A";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium uppercase border ${
            proceso === "PENDIENTE"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : proceso === "COMPLETADO" || proceso === "PROCESADO"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          {proceso}
        </span>
      );
    },
  },
  {
    key: "interes_cliente" as keyof ContactoBriscoResponse,
    header: "Interés",
    render: (lead: ContactoBriscoResponse) => {
      const interes = lead.interes_cliente ?? "N/A";
      return (
        <span
          className={`text-xs font-semibold ${
            interes?.toUpperCase() === "ALTO"
              ? "text-orange-600"
              : "text-gray-700"
          }`}
        >
          {interes}
        </span>
      );
    },
  },
  {
    key: "created_at" as keyof ContactoBriscoResponse,
    header: "Fecha",
    render: (lead: ContactoBriscoResponse) =>
      new Date(
        lead.created_at ?? lead.fecha_ultima_compra ?? new Date(),
      ).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
];
