import { useMemo } from "react";

interface BarItem {
  label: string;
  count: number;
  color: string;
}

interface VerticalBarChartProps {
  title: string;
  data: BarItem[];
  total: number;
  footerLabel?: string;
  emptyMessage?: string;
}

const BAR_MAX_HEIGHT = 160;

export default function VerticalBarChart({
  title,
  data,
  total,
  footerLabel = "Total",
  emptyMessage = "No hay datos disponibles",
}: VerticalBarChartProps) {
  const maxCount = useMemo(() => Math.max(...data.map((d) => d.count), 1), [data]);

  if (total === 0 || data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
          {title}
        </h2>
        <p className="text-gray-400 text-center py-8 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
        {title}
      </h2>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] md:text-xs text-gray-500 truncate max-w-[120px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div
        className="flex items-end justify-center gap-3 md:gap-4"
        style={{ height: `${BAR_MAX_HEIGHT}px` }}
      >
        {data.map((item) => {
          const barHeight =
            item.count > 0
              ? Math.max((item.count / maxCount) * (BAR_MAX_HEIGHT - 20), 8)
              : 0;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 group relative"
            >
              <span className="text-sm font-semibold text-gray-900">
                {item.count}
              </span>
              <div
                className="w-10 md:w-14 rounded-t-sm transition-all duration-300 relative"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: item.color,
                }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                  <div className="bg-gray-900 text-white text-[10px] rounded px-1.5 py-1 whitespace-nowrap shadow-lg">
                    {item.label}: {item.count}
                  </div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                </div>
              </div>
              <span className="text-[9px] md:text-[10px] text-gray-400 whitespace-nowrap max-w-12 md:max-w-16 truncate">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-[10px] md:text-xs text-gray-400 text-center">
        {footerLabel}: {total}
      </div>
    </div>
  );
}