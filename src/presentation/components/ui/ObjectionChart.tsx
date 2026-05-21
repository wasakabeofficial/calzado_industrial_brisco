import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface ObjectionChartProps {
  leads: ContactoBriscoResponse[];
}

interface ObjectionData {
  label: string;
  count: number;
  color: string;
}

export default function ObjectionChart({ leads }: ObjectionChartProps) {
  const objectionData = useMemo(() => {
    const counts: Record<string, number> = {};

    leads.forEach((lead) => {
      const objection = lead.objeccion_principal ?? "NINGUNA";
      counts[objection] = (counts[objection] || 0) + 1;
    });

    const labels: Record<string, string> = {
      PRECIO: "Precio",
      YA_TIENE_PROVEEDOR: "Ya tiene proveedor",
      STOCK_ACTUAL_LLENO: "Stock lleno",
      TIEMPO_ENTREGA: "Tiempo de entrega",
      NINGUNA: "Ninguna",
    };

    const colors: Record<string, string> = {
      PRECIO: "#ef4444",
      YA_TIENE_PROVEEDOR: "#f97316",
      STOCK_ACTUAL_LLENO: "#eab308",
      TIEMPO_ENTREGA: "#3b82f6",
      NINGUNA: "#22c55e",
    };

    const data: ObjectionData[] = Object.entries(counts).map(
      ([key, count]) => ({
        label: labels[key] || key,
        count,
        color: colors[key] || "#9ca3af",
      }),
    );

    return data.sort((a, b) => b.count - a.count);
  }, [leads]);

  const maxCount = Math.max(...objectionData.map((d) => d.count), 1);

  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          Objeción Principal
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
        Objeción Principal
      </h2>

      <div className="flex items-end justify-center gap-3 md:gap-4 h-36 md:h-48">
        {objectionData.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="text-lg md:text-xl font-bold text-gray-900">{item.count}</div>
            <div
              className="w-10 md:w-14 rounded-t-md transition-all duration-300"
              style={{
                height: `${(item.count / maxCount) * 100}px`,
                backgroundColor: item.color,
              }}
            />
            <span className="text-[10px] md:text-xs text-gray-600 text-center max-w-14 md:max-w-16 truncate">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-xs md:text-sm text-gray-500 text-center">
        Total de leads: {leads.length}
      </div>
    </div>
  );
}
