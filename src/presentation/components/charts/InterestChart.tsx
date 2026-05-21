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
  NINGUNO: "#6b7280",
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
    leads.forEach((lead) => {
      const key = lead.interes_cliente?.toUpperCase() || "NINGUNO";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([key, count]) => ({
        label: LABELS[key] || key,
        count,
        color: COLORS[key] || "#6b7280",
      }))
      .sort((a, b) => b.count - a.count);
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
