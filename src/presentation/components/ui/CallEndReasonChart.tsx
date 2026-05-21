import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";
import VerticalBarChart from "./VerticalBarChart";

interface CallEndReasonChartProps {
  leads: ContactoBriscoResponse[];
}

const CHART_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#6b7280",
];

export default function CallEndReasonChart({ leads }: CallEndReasonChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const reason = lead.razon_terminado_llamada;
      if (!reason || reason === "N/A") return;
      counts[reason] = (counts[reason] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, count], idx) => ({
        label,
        count,
        color: CHART_COLORS[idx % CHART_COLORS.length],
      }));
  }, [leads]);

  return (
    <VerticalBarChart
      title="Razones de Terminación de Llamada"
      data={data}
      total={leads.length}
      footerLabel="Total de llamadas analizadas"
    />
  );
}