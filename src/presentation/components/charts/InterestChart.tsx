import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";
import VerticalBarChart from "./VerticalBarChart";

interface InterestChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS: Record<string, string> = {
  ALTO: "#22c55e",
  MEDIO: "#f59e0b",
  BAJO: "#ef4444",
  NINGUNO: "#9ca3af",
};

const LABELS: Record<string, string> = {
  ALTO: "Alto",
  MEDIO: "Medio",
  BAJO: "Bajo",
  NINGUNO: "Sin interés",
};

export default function InterestChart({ leads }: InterestChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    let sinDato = 0;
    leads.forEach((lead) => {
      const raw = lead.interes_cliente?.toUpperCase();
      if (!raw || raw === "N/A") {
        sinDato++;
      } else {
        counts[raw] = (counts[raw] || 0) + 1;
      }
    });

    // Si ningún lead tiene nivel de interés registrado, mostrar vacío
    if (Object.keys(counts).length === 0) return [];

    return [
      ...Object.entries(counts).map(([key, count]) => ({
        label: LABELS[key] || key,
        count,
        color: COLORS[key] || "#6b7280",
      })),
      ...(sinDato > 0 ? [{ label: "Sin dato", count: sinDato, color: "#d1d5db" }] : []),
    ].sort((a, b) => b.count - a.count);
  }, [leads]);

  return (
    <VerticalBarChart
      title="Interés de Clientes"
      data={data}
      total={leads.length}
      footerLabel="Total de leads"
    />
  );
}
