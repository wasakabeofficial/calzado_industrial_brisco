import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";
import VerticalBarChart from "./VerticalBarChart";

interface FollowUpActionChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS: Record<string, string> = {
  ENVIAR_COTIZACION: "#3b82f6",
  ENVIAR_CATALOGO: "#8b5cf6",
  REPROGRAMAR_LLAMADA: "#f59e0b",
  ARCHIVAR: "#6b7280",
  SIN_ACCION: "#9ca3af",
};

const LABELS: Record<string, string> = {
  ENVIAR_COTIZACION: "Enviar Cotización",
  ENVIAR_CATALOGO: "Enviar Catálogo",
  REPROGRAMAR_LLAMADA: "Reprogramar Llamada",
  ARCHIVAR: "Archivar",
  SIN_ACCION: "Sin Acción",
};

export default function FollowUpActionChart({
  leads,
}: FollowUpActionChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const key = lead.accion_seguimiento ?? "SIN_ACCION";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([key, count]) => ({
        label: LABELS[key] || key,
        count,
        color: COLORS[key] || "#9ca3af",
      }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  return (
    <VerticalBarChart
      title="Acción de Seguimiento"
      data={data}
      total={leads.length}
      footerLabel="Total de leads"
    />
  );
}
