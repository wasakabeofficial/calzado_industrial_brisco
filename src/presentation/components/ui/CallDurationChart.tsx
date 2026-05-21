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

interface CallDurationChartProps {
  leads: ContactoBriscoResponse[];
}

export default function CallDurationChart({ leads }: CallDurationChartProps) {
  const chartData = useMemo(() => {
    const durationCounts: Record<string, number> = {
      "0-30s": 0,
      "31-60s": 0,
      "1-2 min": 0,
      "2-5 min": 0,
      "5+ min": 0,
      "Sin dato": 0,
    };

    leads.forEach((lead) => {
      const duracion = lead.duracion_llamada;

      // Si no hay dato, es string vacío o "N/A"
      if (duracion === undefined || duracion === null || duracion === "" || duracion === "N/A") {
        durationCounts["Sin dato"]++;
        return;
      }

      // Convertir a número (segundos)
      const segundos = typeof duracion === "number" ? duracion : parseFloat(duracion);

      if (isNaN(segundos) || segundos < 0) {
        durationCounts["Sin dato"]++;
        return;
      }

      if (segundos <= 30) durationCounts["0-30s"]++;
      else if (segundos <= 60) durationCounts["31-60s"]++;
      else if (segundos <= 120) durationCounts["1-2 min"]++;
      else if (segundos <= 300) durationCounts["2-5 min"]++;
      else durationCounts["5+ min"]++;
    });

    return Object.entries(durationCounts)
      .map(([rango, cantidad]) => ({ rango, cantidad }))
      .filter((item) => item.cantidad > 0);
  }, [leads]);

  if (leads.length === 0 || chartData.length === 0) {
    return (
      <div className="bg-white p-4 md:p-6">
        <h2 className="text-base md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          Duración de Llamadas
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
        Duración de Llamadas
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
              dataKey="rango"
              tick={{ fontSize: 10, fill: "#000000", fontWeight: "bold" }}
              axisLine={{ stroke: "#000000", strokeWidth: 1.5 }}
              tickLine={false}
              width={80}
            />
            <Tooltip formatter={(value) => `${value} llamadas`} />
            <Bar
              dataKey="cantidad"
              barSize={20}
              radius={[4, 4, 4, 4]}
              fill="#6320EE"
              label={{
                position: "right",
                fill: "#6320EE",
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
