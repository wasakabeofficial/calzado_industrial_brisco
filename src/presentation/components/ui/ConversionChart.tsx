import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface ConversionChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS = {
  accepted: "#22c55e",
  rejected: "#ef4444",
};

export default function ConversionChart({ leads }: ConversionChartProps) {
  const chartData = useMemo(() => {
    let accepted = 0;
    let rejected = 0;
    leads.forEach((lead) => {
      if (lead.conversion_lograda === true) accepted++;
      else rejected++;
    });
    return [
      { label: "Aceptó", count: accepted, color: COLORS.accepted },
      { label: "Rechazó", count: rejected, color: COLORS.rejected },
    ];
  }, [leads]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  if (leads.length === 0) {
    return (
      <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
          Conversión Lograda
        </h2>
        <p className="text-gray-400 text-center py-8">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] border border-gray-700/30 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-4">
        Conversión Lograda
      </h2>

      <div className="flex items-end justify-center gap-8 md:gap-12 h-36 md:h-44">
        {chartData.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-white">{item.count}</span>
            <div
              className="w-14 md:w-20 rounded-t-md transition-all duration-500"
              style={{
                height: `${Math.max((item.count / maxCount) * 120, item.count > 0 ? 20 : 0)}px`,
                backgroundColor: item.color,
              }}
            />
            <span className="text-xs md:text-sm text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4 pt-3 border-t border-gray-700/30">
        {chartData.map((item) => (
          <div key={`legend-${item.label}`} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-700/30 text-xs md:text-sm text-gray-400 text-center">
        Total de leads: {leads.length}
      </div>
    </div>
  );
}