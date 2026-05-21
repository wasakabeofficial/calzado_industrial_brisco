import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";
import VerticalBarChart from "./VerticalBarChart";

interface ObjectionChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS: Record<string, string> = {
  NINGUNA: "#22c55e",
  PRECIO: "#ef4444",
  INTERES: "#3b82f6",
  TIEMPO: "#f59e0b",
  OTRO: "#8b5cf6",
};

export default function ObjectionChart({ leads }: ObjectionChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const key = lead.objeccion_principal?.toUpperCase() || "NINGUNA";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([key, count]) => ({
        label:
          key === "NINGUNA"
            ? "Ninguna"
            : key.charAt(0) + key.slice(1).toLowerCase(),
        count,
        color: COLORS[key] || "#6b7280",
      }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  return (
    <VerticalBarChart
      title="Objeciones"
      data={data}
      total={leads.length}
      footerLabel="Total de leads"
    />
  );
}
