import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";
import VerticalBarChart from "./VerticalBarChart";

interface CallDurationChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS: Record<string, string> = {
  "0-30s": "#22c55e",
  "31-60s": "#16a34a",
  "1-2 min": "#f59e0b",
  "2-5 min": "#ef4444",
  "5+ min": "#dc2626",
};

export default function CallDurationChart({ leads }: CallDurationChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {
      "0-30s": 0,
      "31-60s": 0,
      "1-2 min": 0,
      "2-5 min": 0,
      "5+ min": 0,
    };
    leads.forEach((lead) => {
      const d = lead.duracion_llamada;
      if (d === undefined || d === null || d === "" || d === "N/A") return;
      const valor = typeof d === "number" ? d : parseFloat(d);
      if (isNaN(valor) || valor < 0) return;
      const min = Math.floor(valor);
      const seg = Math.round((valor - min) * 100);
      const totalSeg = min * 60 + seg;
      if (totalSeg <= 30) counts["0-30s"]++;
      else if (totalSeg <= 60) counts["31-60s"]++;
      else if (totalSeg <= 120) counts["1-2 min"]++;
      else if (totalSeg <= 300) counts["2-5 min"]++;
      else counts["5+ min"]++;
    });
    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([label, count]) => ({
        label,
        count,
        color: COLORS[label] ?? "#6b7280",
      }));
  }, [leads]);

  return (
    <VerticalBarChart
      title="Duración de Llamadas"
      data={data}
      total={leads.length}
      footerLabel="Total de llamadas analizadas"
    />
  );
}