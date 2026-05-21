import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface FollowUpActionChartProps {
  leads: ContactoBriscoResponse[];
}

interface ActionData {
  label: string;
  count: number;
  color: string;
}

export default function FollowUpActionChart({
  leads,
}: FollowUpActionChartProps) {
  const actionData = useMemo(() => {
    const counts: Record<string, number> = {};

    leads.forEach((lead) => {
      const action = lead.accion_seguimiento ?? "SIN_ACCION";
      counts[action] = (counts[action] || 0) + 1;
    });

    const labels: Record<string, string> = {
      ENVIAR_COTIZACION: "Enviar Cotización",
      ENVIAR_CATALOGO: "Enviar Catálogo",
      REPROGRAMAR_LLAMADA: "Reprogramar Llamada",
      ARCHIVAR: "Archivar",
      SIN_ACCION: "Sin Acción",
    };

    const colors: Record<string, string> = {
      ENVIAR_COTIZACION: "#3b82f6",
      ENVIAR_CATALOGO: "#8b5cf6",
      REPROGRAMAR_LLAMADA: "#f59e0b",
      ARCHIVAR: "#6b7280",
      SIN_ACCION: "#9ca3af",
    };

    const data: ActionData[] = Object.entries(counts).map(([key, count]) => ({
      label: labels[key] || key,
      count,
      color: colors[key] || "#9ca3af",
    }));

    return data.sort((a, b) => b.count - a.count);
  }, [leads]);

  const maxCount = Math.max(...actionData.map((d) => d.count), 1);

  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          Acción de Seguimiento
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
        Acción de Seguimiento
      </h2>
      <div className="space-y-2 md:space-y-3">
        {actionData.map((item) => (
          <div key={item.label} className="flex items-center gap-2 md:gap-3">
            <span className="w-24 md:w-40 text-xs md:text-sm text-gray-600 truncate">
              {item.label}
            </span>
            <div className="flex-1 h-5 md:h-6 bg-gray-100 rounded overflow-hidden">
              <div
                className="h-full rounded transition-all duration-300"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <span className="w-6 md:w-8 text-xs md:text-sm font-medium text-gray-900 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-xs md:text-sm text-gray-500">
        Total de leads: {leads.length}
      </div>
    </div>
  );
}
