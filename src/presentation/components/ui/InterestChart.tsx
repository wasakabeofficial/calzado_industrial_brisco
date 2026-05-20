import { useMemo } from "react";
import type { Lead } from "../../../domain/entities";

interface InterestChartProps {
  leads: Lead[];
}

interface InterestData {
  label: string;
  count: number;
  color: string;
}

export default function InterestChart({ leads }: InterestChartProps) {
  const interestData = useMemo(() => {
    const counts: Record<string, number> = {};

    leads.forEach((lead) => {
      const interest = lead.interes_cliente?.toUpperCase() || "NINGUNO";
      counts[interest] = (counts[interest] || 0) + 1;
    });

    const colors: Record<string, string> = {
      ALTO: "bg-orange-500",
      MEDIO: "bg-blue-500",
      BAJO: "bg-green-500",
      NINGUNO: "bg-gray-400",
    };

    const data: InterestData[] = Object.entries(counts).map(
      ([label, count]) => ({
        label: label === "NINGUNO" ? "Sin interés" : label,
        count,
        color: colors[label] || "bg-gray-400",
      }),
    );

    return data.sort((a, b) => b.count - a.count);
  }, [leads]);

  const maxCount = Math.max(...interestData.map((d) => d.count), 1);

  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Interés de Clientes
        </h2>
        <p className="text-gray-500 text-center py-8">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Interés de Clientes
      </h2>
      <div className="space-y-3">
        {interestData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-24 text-sm text-gray-600">{item.label}</span>
            <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
              <div
                className={`h-full ${item.color} transition-all duration-300 rounded`}
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
            <span className="w-8 text-sm font-medium text-gray-900 text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
        Total de leads: {leads.length}
      </div>
    </div>
  );
}
