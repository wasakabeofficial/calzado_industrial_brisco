import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface CallEndReasonChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#6b7280",
];
const BAR_MAX_HEIGHT = 160;

export default function CallEndReasonChart({ leads }: CallEndReasonChartProps) {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const razon = lead.razon_terminado_llamada;
      if (!razon || razon === "N/A" || razon === "") return;
      const label = razon
        .toLowerCase()
        .trim()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      counts[label] = (counts[label] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([label, count], i) => ({
        label,
        count,
        color: COLORS[i % COLORS.length],
      }));
  }, [leads]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  if (leads.length === 0 || chartData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
          Razones de Terminación
        </h2>
        <p className="text-gray-400 text-center py-8 text-sm">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
        Razones de Terminación de Llamada
      </h2>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] md:text-xs text-gray-500 truncate max-w-30">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div
        className="flex items-end justify-center gap-2 md:gap-3"
        style={{ height: `${BAR_MAX_HEIGHT}px` }}
      >
        {chartData.map((item) => {
          const barHeight =
            item.count > 0
              ? Math.max((item.count / maxCount) * (BAR_MAX_HEIGHT - 20), 8)
              : 0;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 group relative shrink-0"
            >
              <span className="text-sm font-semibold text-gray-900">
                {item.count}
              </span>
              <div
                className="w-12 md:w-16 rounded-t-sm transition-all duration-300 relative"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: item.color,
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                  <div className="bg-gray-900 text-white text-[10px] rounded px-1.5 py-1 whitespace-nowrap shadow-lg">
                    {item.label}: {item.count} llamadas
                  </div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                </div>
              </div>
              <span className="text-[9px] md:text-[10px] text-gray-400 text-center max-w-16 md:max-w-20 leading-tight truncate">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 text-[10px] md:text-xs text-gray-400 text-center">
        Total de llamadas analizadas: {leads.length}
      </div>
    </div>
  );
}
