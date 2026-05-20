import { useMemo } from "react";
import type { Lead } from "../../types";

interface CallStatusChartProps {
  leads: Lead[];
}

interface StatusData {
  label: string;
  count: number;
  color: string;
}

export default function CallStatusChart({ leads }: CallStatusChartProps) {
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};

    leads.forEach((lead) => {
      const status = lead.vapi_call_status || "Desconocido";
      counts[status] = (counts[status] || 0) + 1;
    });

    const colors: Record<string, string> = {
      Completado: "#22c55e",
      "Sin Respuesta": "#9ca3af",
      Ocupado: "#f97316",
      Fallido: "#ef4444",
      Desconocido: "#6b7280",
    };

    const data: StatusData[] = Object.entries(counts).map(([key, count]) => {
      return {
        label: key,
        count,
        color: colors[key] || colors["Desconocido"],
      };
    });

    return data.sort((a, b) => b.count - a.count);
  }, [leads]);

  const total = leads.length;

  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Estado de Llamadas
        </h2>
        <p className="text-gray-500 text-center py-8">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  // Calcular angulos para el grafico circular
  let cumulativePercent = 0;
  const slices = statusData.map((item) => {
    const percent = (item.count / total) * 100;
    const startAngle = cumulativePercent * 3.6; // Convertir a grados
    // eslint-disable-next-line react-hooks/immutability
    cumulativePercent += percent;
    const endAngle = cumulativePercent * 3.6;
    return { ...item, percent, startAngle, endAngle };
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Estado de Llamadas
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-40 h-40">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >
            {slices.map((slice, index) => {
              const radius = 40;
              const startX =
                50 + radius * Math.cos((slice.startAngle * Math.PI) / 180);
              const startY =
                50 + radius * Math.sin((slice.startAngle * Math.PI) / 180);
              const endX =
                50 + radius * Math.cos((slice.endAngle * Math.PI) / 180);
              const endY =
                50 + radius * Math.sin((slice.endAngle * Math.PI) / 180);
              const largeArc = slice.percent > 50 ? 1 : 0;

              const pathD =
                slice.percent === 100
                  ? `M 50 10 A 40 40 0 1 1 49.99 10`
                  : `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`;

              return (
                <path
                  key={index}
                  d={pathD}
                  fill={slice.color}
                  className="transition-all duration-300"
                />
              );
            })}

            <circle cx="50" cy="50" r="25" fill="white" />
          </svg>
        </div>
        <div className="flex-1 space-y-2">
          {slices.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 flex-1">{item.label}</span>
              <span className="text-sm font-medium text-gray-900">
                {item.count} ({item.percent.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 text-center">
        Total de llamadas: {total}
      </div>
    </div>
  );
}
