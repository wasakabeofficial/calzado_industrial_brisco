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
      <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
          Acción de Seguimiento
        </h2>
        <p className="text-gray-400 text-center py-8">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
        Acción de Seguimiento
      </h2>

      <div className="space-y-3 mb-4">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-28 md:w-36 text-xs md:text-sm text-gray-300 truncate shrink-0">
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