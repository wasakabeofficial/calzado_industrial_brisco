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
  color: "green" | "red" | "yellow" | "gray" | "blue" | "orange";
}) {
  const colors: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
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
  colSpan,
}: {
  label: string;
  value: React.ReactNode;
  colSpan?: boolean;
}) {
  return (
    <div className={colSpan ? "col-span-2" : ""}>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-900 leading-relaxed">
        {value ?? "N/A"}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">{children}</div>
    </div>
  );
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

  const conversionLabel = conversion ? "Sí" : "No";
  const conversionColor = conversion ? "green" : "red";

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header con nombre y empresa */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
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
            <h2 className="text-lg font-bold text-gray-900">{nombre}</h2>
            <p className="text-sm text-gray-500">{empresa}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge label={proceso} color={procesoColor} />
          <Badge label={callStatus} color={statusColor} />
        </div>
      </div>

      {/* Cuerpo con secciones */}
      <div className="px-6 py-5 space-y-6">
        {/* Contacto */}
        <Section title="Contacto">
          <Field label="Teléfono" value={telefono} />
          <Field label="Fecha de Registro" value={new Date(fechaRegistro).toLocaleString("es-MX")} />
        </Section>

        {/* Llamada */}
        {(callStatus !== "N/A" || duracionLlamada || razonTerminado !== "N/A" || resumen) && (
          <Section title="Llamada">
            {callStatus !== "N/A" && (
              <Field label="Estado" value={<Badge label={callStatus} color={statusColor} />} />
            )}
            {duracionLlamada && <Field label="Duración" value={duracionLlamada} />}
            {razonTerminado !== "N/A" && <Field label="Razón de Terminación" value={razonTerminado} />}
            {resumen && <Field label="Resumen" value={resumen} colSpan />}
          </Section>
        )}

        {/* Interés y Conversión */}
        {(interes !== "N/A" || conversion !== false) && (
          <Section title="Interés & Conversión">
            <Field
              label="Nivel de Interés"
              value={<Badge label={interes} color={interesColor} />}
            />
            <Field
              label="Conversión Lograda"
              value={<Badge label={conversionLabel} color={conversionColor} />}
            />
            {descripcionInteres && (
              <Field label="Descripción del Interés" value={descripcionInteres} colSpan />
            )}
          </Section>
        )}

        {/* Seguimiento */}
        {(seguimiento !== "N/A" || descripcionSeguimiento) && (
          <Section title="Seguimiento">
            <Field label="Acción" value={seguimiento} />
            {descripcionSeguimiento && (
              <Field label="Descripción" value={descripcionSeguimiento} colSpan />
            )}
          </Section>
        )}

        {/* Objeciones */}
        {(objeccion !== "N/A" || descripcionObjeccion) && (
          <Section title="Objeciones">
            <Field
              label="Objeción Principal"
              value={<Badge label={objeccion} color={objeccionColor} />}
            />
            {descripcionObjeccion && (
              <Field label="Descripción" value={descripcionObjeccion} colSpan />
            )}
          </Section>
        )}

        {/* Compra */}
        {(fechaCompra !== "N/A" || producto !== "N/A") && (
          <Section title="Última Compra">
            <Field label="Fecha" value={fechaCompra} />
            <Field label="Producto" value={producto} />
          </Section>
        )}
      </div>
    </div>
  );
}