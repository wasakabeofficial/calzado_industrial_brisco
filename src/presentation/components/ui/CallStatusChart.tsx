import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface CallStatusChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS: Record<string, string> = {
  Completado: "#22c55e",
  "Sin Respuesta": "#6b7280",
  Ocupado: "#f59e0b",
  Fallido: "#ef4444",
  Desconocido: "#8b5cf6",
};

export default function CallStatusChart({ leads }: CallStatusChartProps) {
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const status = lead.vapi_call_status ?? "Desconocido";
      counts[status] = (counts[status] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([label, count]) => ({
        label,
        count,
        color: COLORS[label] || "#6b7280",
        percent: (count / leads.length) * 100,
      }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const total = leads.length;

  if (total === 0) {
    return (
      <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
          Estado de Llamadas
        </h2>
        <p className="text-gray-400 text-center py-8">No hay datos disponibles</p>
      </div>
    );
  }

  // Generar slices del donut
  let cumulative = 0;
  const slices = statusData.map((item) => {
    const start = cumulative * 3.6;
    cumulative += item.percent;
    const end = cumulative * 3.6;
    return { ...item, startAngle: start, endAngle: end };
  });

  return (
    <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
        Estado de Llamadas
      </h2>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 md:w-36 md:h-36">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {slices.map((slice, i) => {
              const r = 38;
              const sr = (slice.startAngle * Math.PI) / 180;
              const er = (slice.endAngle * Math.PI) / 180;
              const x1 = 50 + r * Math.cos(sr);
              const y1 = 50 + r * Math.sin(sr);
              const x2 = 50 + r * Math.cos(er);
              const y2 = 50 + r * Math.sin(er);
              const large = slice.percent > 50 ? 1 : 0;
              const d =
                slice.percent >= 99.9
                  ? "M 50 12 A 38 38 0 1 1 49.99 12"
                  : `M 50 50 L ${x1} ${y1} A 38 38 0 ${large} 1 ${x2} ${y2} Z`;
              return <path key={i} d={d} fill={slice.color} className="transition-all duration-300" />;
            })}
            <circle cx="50" cy="50" r="24" fill="#1a1a2e" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white">{total}</span>
          </div>
        </div>

        <div className="w-full space-y-1.5">
          {statusData.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-300 flex-1 truncate">{item.label}</span>
              <span className="text-xs font-medium text-white">
                {item.count} ({item.percent.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}