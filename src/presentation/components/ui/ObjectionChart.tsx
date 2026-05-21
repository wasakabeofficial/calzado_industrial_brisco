import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

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
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const key = lead.objeccion_principal?.toUpperCase() || "NINGUNA";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([key, count]) => ({
        label: key === "NINGUNA" ? "Ninguna" : key.charAt(0) + key.slice(1).toLowerCase(),
        count,
        color: COLORS[key] || "#6b7280",
      }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  if (leads.length === 0) {
    return (
      <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
          Objeciones
        </h2>
        <p className="text-gray-400 text-center py-8">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
        Objeciones
      </h2>

      <div className="space-y-3 mb-4">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-20 text-xs md:text-sm text-gray-300 shrink-0">
              {item.label}
            </span>
            <div className="flex-1 h-6 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 flex items-center justify-end px-2"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: item.color,
                  minWidth: item.count > 0 ? "28px" : "0",
                }}
              >
                <span className="text-xs font-bold text-white drop-shadow-sm">{item.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-700/30">
        {chartData.map((item) => (
          <div key={`legend-${item.label}`} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] md:text-xs text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700/30 text-xs md:text-sm text-gray-400 text-center">
        Total de leads: {leads.length}
      </div>
    </div>
  );
}