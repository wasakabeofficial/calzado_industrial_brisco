import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface CallEndReasonChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS = ["#22c55e", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899", "#6b7280"];

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
      <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
          Razones de Terminación
        </h2>
        <p className="text-gray-400 text-center py-8">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
        Razones de Terminación de Llamada
      </h2>

      <div className="flex items-end justify-center gap-2 md:gap-3 h-36 md:h-44 overflow-x-auto pb-2">
        {chartData.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 shrink-0">
            <span className="text-sm md:text-base font-bold text-white">{item.count}</span>
            <div
              className="w-12 md:w-16 rounded-t-md transition-all duration-500"
              style={{
                height: `${Math.max((item.count / maxCount) * 120, item.count > 0 ? 16 : 0)}px`,
                backgroundColor: item.color,
              }}
            />
            <span
              className="text-[9px] md:text-xs text-gray-300 text-center max-w-16 md:max-w-20 leading-tight"
              title={item.label}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4 pt-3 border-t border-gray-700/30">
        {chartData.map((item) => (
          <div key={`legend-${item.label}`} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[9px] md:text-xs text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700/30 text-xs md:text-sm text-gray-400 text-center">
        Total de llamadas analizadas: {leads.length}
      </div>
    </div>
  );
}