import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface FollowUpActionChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS: Record<string, string> = {
  ENVIAR_COTIZACION: "#3b82f6",
  ENVIAR_CATALOGO: "#8b5cf6",
  REPROGRAMAR_LLAMADA: "#f59e0b",
  ARCHIVAR: "#6b7280",
  SIN_ACCION: "#9ca3af",
};

const LABELS: Record<string, string> = {
  ENVIAR_COTIZACION: "Enviar Cotización",
  ENVIAR_CATALOGO: "Enviar Catálogo",
  REPROGRAMAR_LLAMADA: "Reprogramar Llamada",
  ARCHIVAR: "Archivar",
  SIN_ACCION: "Sin Acción",
};

const BAR_MAX_HEIGHT = 160;

export default function FollowUpActionChart({ leads }: FollowUpActionChartProps) {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((lead) => {
      const key = lead.accion_seguimiento ?? "SIN_ACCION";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([key, count]) => ({
        label: LABELS[key] || key,
        count,
        color: COLORS[key] || "#9ca3af",
      }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
          Acción de Seguimiento
        </h2>
        <p className="text-gray-400 text-center py-8 text-sm">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
        Acción de Seguimiento
      </h2>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] md:text-xs text-gray-500 truncate max-w-[120px]">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-center gap-3 md:gap-4" style={{ height: `${BAR_MAX_HEIGHT}px` }}>
        {chartData.map((item) => {
          const barHeight = item.count > 0 ? Math.max((item.count / maxCount) * (BAR_MAX_HEIGHT - 20), 8) : 0;
          return (
            <div key={item.label} className="flex flex-col items-center gap-1 group relative">
              <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              <div
                className="w-10 md:w-14 rounded-t-sm transition-all duration-300 relative"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: item.color,
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                  <div className="bg-gray-900 text-white text-[10px] rounded px-1.5 py-1 whitespace-nowrap shadow-lg">
                    {item.label}: {item.count} leads
                  </div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                </div>
              </div>
              <span className="text-[9px] md:text-[10px] text-gray-400 whitespace-nowrap max-w-12 md:max-w-16 truncate">{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 text-[10px] md:text-xs text-gray-400 text-center">
        Total de leads: {leads.length}
      </div>
    </div>
  );
}