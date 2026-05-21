import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface ConversionChartProps {
  leads: ContactoBriscoResponse[];
}

interface ConversionData {
  label: string;
  count: number;
  color: string;
}

export default function ConversionChart({ leads }: ConversionChartProps) {
  const conversionData = useMemo(() => {
    let accepted = 0;
    let rejected = 0;

    leads.forEach((lead) => {
      if (lead.conversacion_lograda === true) {
        accepted++;
      } else {
        rejected++;
      }
    });

    const data: ConversionData[] = [
      { label: "Aceptó", count: accepted, color: "#22c55e" },
      { label: "Rechazó", count: rejected, color: "#ef4444" },
    ];

    return data;
  }, [leads]);

  const maxCount = Math.max(...conversionData.map((d) => d.count), 1);
  const total = leads.length;

  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          Conversación Lograda
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
        Conversación Lograda
      </h2>

      <div className="flex items-end justify-center gap-6 md:gap-8 h-40 md:h-48">
        {conversionData.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="text-xl md:text-2xl font-bold text-gray-900">{item.count}</div>
            <div
              className="w-14 md:w-20 rounded-t-md transition-all duration-300"
              style={{
                height: `${(item.count / maxCount) * 120}px`,
                backgroundColor: item.color,
              }}
            />
            <span className="text-xs md:text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-xs md:text-sm text-gray-500 text-center">
        Total de leads: {total}
      </div>
    </div>
  );
}
