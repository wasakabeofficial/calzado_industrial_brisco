import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ContactoBriscoResponse } from "../../../domain/entities";

interface CallEndReasonChartProps {
  leads: ContactoBriscoResponse[];
}

export default function CallEndReasonChart({ leads }: CallEndReasonChartProps) {
  const chartData = useMemo(() => {
    const reasonCounts: Record<string, number> = {};

    leads.forEach((lead) => {
      const razon = lead.razon_terminado_llamada;
      if (!razon || razon === "N/A") {
        reasonCounts["Sin dato"] = (reasonCounts["Sin dato"] || 0) + 1;
        return;
      }

      // Normalizar razon comunes
      const razonNormalizada = razon
        .toLowerCase()
        .trim()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      reasonCounts[razonNormalizada] =
        (reasonCounts[razonNormalizada] || 0) + 1;
    });

    return Object.entries(reasonCounts)
      .map(([razon, cantidad]) => ({ razon, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad) // Ordenar por cantidad descendente
      .slice(0, 8); // Top 8 razones
  }, [leads]);

  if (leads.length === 0 || chartData.length === 0) {
    return (
      <div className="bg-white p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          Razones de Terminación
        </h2>
        <p className="text-gray-500 text-center py-8">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-6">
      <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
        Razones de Terminación de Llamada
      </h2>

      <div className="h-48 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#f5f5f5" />
            <XAxis
              dataKey="cantidad"
              tick={{ fontSize: 10, fill: "#000000", fontWeight: "bold" }}
              axisLine={{ stroke: "#000000", strokeWidth: 1.5 }}
              tickLine={false}
            />
            <YAxis
              dataKey="razon"
              tick={{ fontSize: 10, fill: "#000000", fontWeight: "bold" }}
              axisLine={{ stroke: "#000000", strokeWidth: 1.5 }}
              tickLine={false}
              width={120}
            />
            <Tooltip formatter={(value) => `${value} llamadas`} />
            <Bar
              dataKey="cantidad"
              barSize={20}
              radius={[4, 4, 4, 4]}
              fill="#10B981"
              label={{
                position: "right",
                fill: "#10B981",
                fontWeight: "bold",
                fontSize: 12,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 text-xs md:text-sm text-gray-500 text-center">
        Total de llamadas analizadas: {leads.length}
      </div>
    </div>
  );
}
