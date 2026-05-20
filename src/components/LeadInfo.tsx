import type { Lead } from "../types";

interface LeadInfoProps {
  lead: Lead;
}

export default function LeadInfo({ lead }: LeadInfoProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-lg font-medium text-gray-900">
            {lead.nombre_completo}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-lg font-medium text-gray-900">{lead.telefono}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Company</p>
          <p className="text-lg font-medium text-gray-900">
            {lead.nombre_empresa}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Client ID</p>
          <p className="text-lg font-medium text-gray-900">{lead.id_cliente}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Call Status</p>
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
          <p className="text-sm text-gray-500">Process Status</p>
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
          <p className="text-sm text-gray-500">Last Purchase</p>
          <p className="text-lg text-gray-900">
            {lead.fecha_ultima_compra || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Product Purchased</p>
          <p className="text-lg text-gray-900">
            {lead.producto_ultima_compra || "N/A"}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Client Interest</p>
          <p className="text-lg text-gray-900">
            {lead.interes_cliente || "N/A"}
          </p>
        </div>
        {lead.descripcion_interes_cliente && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Interest Description</p>
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
          <p className="text-lg text-gray-900">{lead.objeccion_principal}</p>
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
  );
}
