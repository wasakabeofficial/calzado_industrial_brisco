import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface CallFrequencyChartProps {
  leads: ContactoBriscoResponse[];
}

interface FrequencyData {
  fecha: string;
  llamadas: number;
}

export default function CallFrequencyChart({ leads }: CallFrequencyChartProps) {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};

    leads.forEach((lead) => {
      if (lead.created_at) {
        const date = new Date(lead.created_at);
        const dayKey = date.toISOString().split("T")[0];
        counts[dayKey] = (counts[dayKey] || 0) + 1;
      }
    });

    const data: FrequencyData[] = Object.entries(counts)
      .map(([date, llamadas]) => {
        const d = new Date(date);
        const fecha = `${String(d.getDate()).padStart(2, "0")}-${String(
          d.getMonth() + 1,
        ).padStart(2, "0")}-${String(d.getFullYear()).slice(-2)}`;
        return { fecha, llamadas };
      })
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.fecha.split("-").map(Number);
        const [dayB, monthB, yearB] = b.fecha.split("-").map(Number);
        const dateA = new Date(2000 + yearA, monthA - 1, dayA);
        const dateB = new Date(2000 + yearB, monthB - 1, dayB);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(-10);

    return data;
  }, [leads]);

  if (leads.length === 0 || chartData.length === 0) {
    return (
      <div className="bg-white p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          Frecuencia de Llamadas
        </h2>
        <p className="text-gray-500 text-center py-8">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  const maxLlamadas = Math.max(...chartData.map((d) => d.llamadas), 9);

  return (
    <div className="bg-white p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
        Frecuencia de Llamadas
      </h2>

      <div className="h-48 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#CCCCCC"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="fecha"
              tick={{ fontSize: 10, fill: "#000000", fontWeight: "bold" }}
              axisLine={{ stroke: "#000000", strokeWidth: 1.5 }}
              tickLine={false}
              interval={0}
              label={{
                value: "Fecha",
                position: "bottom",
                fill: "#000000",
                fontWeight: "bold",
                fontSize: 11,
                offset: 0,
              }}
            />
            <YAxis
              domain={[0, maxLlamadas]}
              ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              tick={{ fontSize: 10, fill: "#000000", fontWeight: "bold" }}
              axisLine={{ stroke: "#000000", strokeWidth: 1.5 }}
              tickLine={false}
              width={25}
              label={{
                value: "No. Llamadas",
                angle: -90,
                position: "left",
                fill: "#000000",
                fontWeight: "bold",
                fontSize: 11,
              }}
            />
            <Line
              type="linear"
              dataKey="llamadas"
              stroke="#6320EE"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#C1E866",
                stroke: "#6320EE",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 4,
                fill: "#C1E866",
                stroke: "#6320EE",
                strokeWidth: 2,
              }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-xs md:text-sm text-gray-500 text-center">
        Total de llamadas: {leads.length}
      </div>
    </div>
  );
}
