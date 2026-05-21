import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface ConversionChartProps {
  leads: ContactoBriscoResponse[];
}

const COLORS = {
  accepted: "#22c55e",
  rejected: "#ef4444",
};

const BAR_MAX_HEIGHT = 160;

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
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
          Conversión Lograda
        </h2>
        <p className="text-gray-400 text-center py-8 text-sm">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
        Conversión Lograda
      </h2>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] md:text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-center gap-8 md:gap-12" style={{ height: `${BAR_MAX_HEIGHT}px` }}>
        {chartData.map((item) => {
          const barHeight = item.count > 0 ? Math.max((item.count / maxCount) * (BAR_MAX_HEIGHT - 20), 8) : 0;
          return (
            <div key={item.label} className="flex flex-col items-center gap-1 group relative">
              <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              <div
                className="w-14 md:w-20 rounded-t-sm transition-all duration-300 relative"
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
              <span className="text-[9px] md:text-[10px] text-gray-400 whitespace-nowrap">{item.label}</span>
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