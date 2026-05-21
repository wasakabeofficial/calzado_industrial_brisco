import type { ContactoBriscoResponse } from "../../domain/entities";

interface LeadInfoProps {
  lead: ContactoBriscoResponse;
}

export default function LeadInfo({ lead }: LeadInfoProps) {
  const nombre = lead.nombre_completo ?? "N/A";
  const telefono = lead.telefono ?? "N/A";
  const empresa = lead.nombre_empresa ?? "N/A";
  const callStatus = lead.vapi_call_status ?? "N/A";
  const proceso = lead.status_procesos ?? "N/A";
  const fechaCompra = lead.fecha_ultima_compra ?? "N/A";
  const producto = lead.producto_ultima_compra ?? "N/A";
  const interes = lead.interes_cliente ?? "N/A";
  const descripcionInteres = lead.descripcion_interes_cliente;
  const conversacion = lead.conversacion_lograda ?? false;
  const seguimiento = lead.accion_seguimiento ?? "N/A";
  const descripcionSeguimiento = lead.descripcion_accion_seguimiento;
  const resumen = lead.resumen_llamada;
  const objeccion = lead.objeccion_principal ?? "N/A";
  const descripcionObjeccion = lead.descripcion_objeccion_principal;
  const duracionLlamada = lead.duracion_llamada ?? "N/A";
  const razonTerminado = lead.razon_terminado_llamada ?? "N/A";
  const fechaRegistro = lead.created_at ?? new Date().toISOString();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Nombre Completo</p>
          <p className="text-lg font-medium text-gray-900">{nombre}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">No. Telefono</p>
          <p className="text-lg font-medium text-gray-900">{telefono}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Organización</p>
          <p className="text-lg font-medium text-gray-900">{empresa}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Estado de Llamada</p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              callStatus.toLowerCase() === "completado"
                ? "bg-green-100 text-green-800"
                : callStatus.toLowerCase() === "fallido"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {callStatus}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Estado de Proceso</p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              proceso === "PENDIENTE"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {proceso}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fecha Última Compra</p>
          <p className="text-lg text-gray-900">{fechaCompra}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Producto Comprado</p>
          <p className="text-lg text-gray-900">{producto}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Interés del Cliente</p>
          <p className="text-lg text-gray-900">{interes}</p>
        </div>
        {descripcionInteres && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Descripción del Interés</p>
            <p className="text-lg text-gray-900">{descripcionInteres}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-gray-500">Conversación Lograda</p>
          <p className="text-lg text-gray-900">{conversacion ? "Sí" : "No"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Acción de Seguimiento</p>
          <p className="text-lg text-gray-900">{seguimiento}</p>
        </div>
        {descripcionSeguimiento && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Descripción Acción</p>
            <p className="text-lg text-gray-900">{descripcionSeguimiento}</p>
          </div>
        )}
        {resumen && (
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Resumen de Llamada</p>
            <p className="text-lg text-gray-900">{resumen}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-gray-500">Objeción Principal</p>
          <p className="text-lg text-gray-900">{objeccion}</p>
        </div>
        {descripcionObjeccion && (
          <div>
            <p className="text-sm text-gray-500">Descripción Objeción</p>
            <p className="text-lg text-gray-900">{descripcionObjeccion}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-gray-500">Duración de Llamada</p>
          <p className="text-lg text-gray-900">{duracionLlamada}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Razón de Terminación</p>
          <p className="text-lg text-gray-900">{razonTerminado}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Fecha de Registro</p>
          <p className="text-lg text-gray-900">
            {new Date(fechaRegistro).toLocaleString("es-MX")}
          </p>
        </div>
      </div>
    </div>
  );
}
