import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../domain/entities";

interface LeadInfoProps {
  lead: ContactoBriscoResponse;
}

function Badge({
  label,
  color,
}: {
  label: string;
  color: "green" | "red" | "yellow" | "gray" | "blue" | "orange" | "purple";
}) {
  const colors: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
    purple: "bg-purple-100 text-purple-800",
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}
    >
      {label}
    </span>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-900 truncate" title={typeof value === "string" ? value : undefined}>
        {value ?? "N/A"}
      </p>
    </div>
  );
}

export default function LeadInfo({ lead }: LeadInfoProps) {
  const nombre = lead.nombre_completo ?? "N/A";
  const telefono = lead.telefono?.toString() ?? "N/A";
  const empresa = lead.nombre_empresa ?? "N/A";
  const callStatus = lead.vapi_call_status ?? "N/A";
  const proceso = lead.status_procesos ?? "N/A";
  const fechaCompra = lead.fecha_ultima_compra ?? "N/A";
  const producto = lead.producto_ultima_compra ?? "N/A";
  const interes = lead.interes_cliente ?? "N/A";
  const descripcionInteres = lead.descripcion_interes_cliente;
  const conversion = lead.conversion_lograda ?? false;
  const seguimiento = lead.accion_seguimiento ?? "N/A";
  const descripcionSeguimiento = lead.descripcion_accion_seguimiento;
  const resumen = lead.resumen_llamada;
  const objeccion = lead.objeccion_principal ?? "N/A";
  const descripcionObjeccion = lead.descripcion_objeccion_principal;
  const duracionLlamada = useMemo(() => {
    const d = lead.duracion_llamada;
    if (d === undefined || d === null || d === "" || d === "N/A") return null;
    const valor = typeof d === "number" ? d : parseFloat(d);
    if (isNaN(valor) || valor < 0) return null;
    const min = Math.floor(valor);
    const seg = Math.round((valor - min) * 100);
    if (min === 0) return `${seg} s`;
    return `${min} min ${seg} s`;
  }, [lead.duracion_llamada]);
  const razonTerminado = lead.razon_terminado_llamada ?? "N/A";
  const fechaRegistro = lead.created_at ?? new Date().toISOString();

  const statusColor =
    callStatus.toLowerCase() === "completado"
      ? "green"
      : callStatus.toLowerCase() === "fallido"
        ? "red"
        : "gray";

  const procesoColor = proceso === "PROCESADO" ? "green" : "yellow";

  const interesColor =
    interes === "ALTO"
      ? "green"
      : interes === "MEDIO"
        ? "orange"
        : interes === "BAJO"
          ? "red"
          : "gray";

  const objeccionColor = objeccion === "NINGUNA" ? "green" : "orange";

  return (
    <div className="bg-white border border-gray-200 rounded-lg w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-indigo-700 font-bold text-sm">
              {nombre !== "N/A"
                ? nombre
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                : "?"}
            </span>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">{nombre}</h2>
            <p className="text-xs text-gray-500">{empresa}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge label={proceso} color={procesoColor} />
          <Badge label={callStatus} color={statusColor} />
        </div>
      </div>

      {/* Info Body - full width horizontal layout */}
      <div className="px-5 py-4 space-y-5">
        {/* Fila 1: Contacto + Fechas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Teléfono" value={telefono} />
          <Field label="Registro" value={new Date(fechaRegistro).toLocaleString("es-MX")} />
          <Field label="Última Compra" value={fechaCompra} />
          <Field label="Producto" value={producto} />
        </div>

        {/* Fila 2: Llamada - duración + razón */}
        {(callStatus !== "N/A" || duracionLlamada || razonTerminado !== "N/A") && (
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Información de Llamada
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {callStatus !== "N/A" && (
                <Field label="Estado" value={<Badge label={callStatus} color={statusColor} />} />
              )}
              {duracionLlamada && <Field label="Duración" value={duracionLlamada} />}
              {razonTerminado !== "N/A" && <Field label="Razón Terminación" value={razonTerminado} />}
            </div>
          </div>
        )}

        {/* Fila 3: Interés */}
        {interes !== "N/A" && (
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Interés del Cliente
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Field label="Nivel" value={<Badge label={interes} color={interesColor} />} />
              <Field label="Conversión" value={conversion ? "Sí" : "No"} />
              {descripcionInteres && (
                <div className="col-span-2 sm:col-span-2">
                  <Field label="Descripción" value={descripcionInteres} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fila 4: Seguimiento */}
        {(seguimiento !== "N/A" || descripcionSeguimiento) && (
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Seguimiento
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Acción" value={seguimiento} />
              {descripcionSeguimiento && <Field label="Descripción" value={descripcionSeguimiento} />}
            </div>
          </div>
        )}

        {/* Fila 5: Objeciones */}
        {(objeccion !== "N/A" || descripcionObjeccion) && (
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Objeciones
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Objeción"
                value={<Badge label={objeccion} color={objeccionColor} />}
              />
              {descripcionObjeccion && <Field label="Descripción" value={descripcionObjeccion} />}
            </div>
          </div>
        )}

        {/* Fila 6: Resumen */}
        {resumen && (
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Resumen de Llamada
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{resumen}</p>
          </div>
        )}
      </div>
    </div>
  );
}