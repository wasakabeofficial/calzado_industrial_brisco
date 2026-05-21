import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

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
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {
      "0-30s": 0,
      "31-60s": 0,
      "1-2 min": 0,
      "2-5 min": 0,
      "5+ min": 0,
    };

    leads.forEach((lead) => {
      const duracion = lead.duracion_llamada;
      if (
        duracion === undefined ||
        duracion === null ||
        duracion === "" ||
        duracion === "N/A"
      )
        return;
      const valor =
        typeof duracion === "number" ? duracion : parseFloat(duracion);
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

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  if (leads.length === 0 || chartData.length === 0) {
    return (
      <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
          Duración de Llamadas
        </h2>
        <p className="text-gray-400 text-center py-8">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
        Duración de Llamadas
      </h2>

      <div className="flex items-end justify-center gap-3 md:gap-4 h-36 md:h-44">
        {chartData.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <span className="text-sm md:text-base font-bold text-white">
              {item.count}
            </span>
            <div
              className="w-10 md:w-14 rounded-t-md transition-all duration-500"
              style={{
                height: `${Math.max((item.count / maxCount) * 120, item.count > 0 ? 16 : 0)}px`,
                backgroundColor: item.color,
              }}
            />
            <span className="text-[10px] md:text-xs text-gray-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4 pt-3 border-t border-gray-700/30">
        {chartData.map((item) => (
          <div
            key={`legend-${item.label}`}
            className="flex items-center gap-1.5"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] md:text-xs text-gray-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700/30 text-xs md:text-sm text-gray-400 text-center">
        Total de llamadas analizadas: {leads.length}
      </div>
    </div>
  );
}
