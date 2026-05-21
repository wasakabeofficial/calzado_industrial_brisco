import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface CallEndReasonChartProps {
  leads: ContactoBriscoResponse[];
}

const REASON_COLORS = [
  "#22c55e",
  "#16a34a",
  "#f97316",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f59e0b",
  "#6b7280",
];

export default function CallEndReasonChart({ leads }: CallEndReasonChartProps) {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};

    leads.forEach((lead) => {
      const razon = lead.razon_terminado_llamada;

      if (!razon || razon === "N/A" || razon === "") {
        return;
      }

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
      .map(([label, count], index) => ({
        label,
        count,
        color: REASON_COLORS[index % REASON_COLORS.length],
      }));
  }, [leads]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);
  const total = leads.length;

  if (leads.length === 0 || chartData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          Razones de Terminación
        </h2>
        <p className="text-gray-500 text-center py-8">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
        Razones de Terminación de Llamada
      </h2>

      <div className="space-y-3 md:space-y-4">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs md:text-sm text-gray-700 w-24 md:w-32 shrink-0 text-right truncate" title={item.label}>
              {item.label}
            </span>
            <div className="flex-1 bg-gray-100 rounded-full h-5 md:h-6 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 flex items-center justify-end px-2"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: item.color,
                  minWidth: item.count > 0 ? "24px" : "0px",
                }}
              >
                <span className="text-xs font-bold text-white drop-shadow-sm">
                  {item.count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-xs md:text-sm text-gray-500 text-center">
        Total de llamadas analizadas: {total}
      </div>
    </div>
  );
}