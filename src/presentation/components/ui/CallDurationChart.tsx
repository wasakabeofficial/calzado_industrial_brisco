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
    };

    leads.forEach((lead) => {
      const duracion = lead.duracion_llamada;

      if (
        duracion === undefined ||
        duracion === null ||
        duracion === "" ||
        duracion === "N/A"
      ) {
        return;
      }

      const valor =
        typeof duracion === "number" ? duracion : parseFloat(duracion);

      if (isNaN(valor) || valor < 0) {
        return;
      }

      const minutos = Math.floor(valor);
      const segundosDecimal = Math.round((valor - minutos) * 100);
      const totalSegundos = minutos * 60 + segundosDecimal;

      if (totalSegundos <= 30) counts["0-30s"]++;
      else if (totalSegundos <= 60) counts["31-60s"]++;
      else if (totalSegundos <= 120) counts["1-2 min"]++;
      else if (totalSegundos <= 300) counts["2-5 min"]++;
      else counts["5+ min"]++;
    });

    const colors: Record<string, string> = {
      "0-30s": "#22c55e",
      "31-60s": "#16a34a",
      "1-2 min": "#f97316",
      "2-5 min": "#ef4444",
      "5+ min": "#dc2626",
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

      <div className="flex items-end justify-center gap-3 md:gap-4 h-40 md:h-48">
        {chartData.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="text-sm md:text-base font-bold text-gray-900">
              {item.count}
            </div>
            <div
              className="w-10 md:w-14 rounded-t-md transition-all duration-300"
              style={{
                height: `${(item.count / maxCount) * 120}px`,
                backgroundColor: item.color,
              }}
            />
            <span className="text-[10px] md:text-xs text-gray-600 text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-xs md:text-sm text-gray-500 text-center">
        Total de llamadas analizadas: {total}
      </div>
    </div>
  );
}