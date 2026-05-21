import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface CallDurationChartProps {
  leads: ContactoBriscoResponse[];
}

export default function CallDurationChart({ leads }: CallDurationChartProps) {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {
      "0-30s": 0,
      "31-60s": 0,
      "1-2 min": 0,
      "2-5 min": 0,
      "5+ min": 0,
      "Sin dato": 0,
    };

    leads.forEach((lead) => {
      const duracion = lead.duracion_llamada;

      if (
        duracion === undefined ||
        duracion === null ||
        duracion === "" ||
        duracion === "N/A"
      ) {
        counts["Sin dato"]++;
        return;
      }

      const segundos =
        typeof duracion === "number" ? duracion : parseFloat(duracion);

      if (isNaN(segundos) || segundos < 0) {
        counts["Sin dato"]++;
        return;
      }

      if (segundos <= 30) counts["0-30s"]++;
      else if (segundos <= 60) counts["31-60s"]++;
      else if (segundos <= 120) counts["1-2 min"]++;
      else if (segundos <= 300) counts["2-5 min"]++;
      else counts["5+ min"]++;
    });

    const colors: Record<string, string> = {
      "0-30s": "#22c55e",
      "31-60s": "#16a34a",
      "1-2 min": "#f97316",
      "2-5 min": "#ef4444",
      "5+ min": "#dc2626",
      "Sin dato": "#9ca3af",
    };

    return Object.entries(counts)
      .filter(([, count]) => count > 0)
      .map(([label, count]) => ({
        label,
        count,
        color: colors[label] ?? "#6b7280",
      }));
  }, [leads]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);
  const total = leads.length;

  if (leads.length === 0 || chartData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          Duración de Llamadas
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
        Duración de Llamadas
      </h2>

      <div className="space-y-3 md:space-y-4">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs md:text-sm text-gray-700 w-16 md:w-20 shrink-0 text-right">
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