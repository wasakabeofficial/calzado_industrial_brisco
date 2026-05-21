import { useMemo } from "react";
import type { ContactoBriscoResponse } from "../../../domain/entities";
import VerticalBarChart from "./VerticalBarChart";

interface ConversionChartProps {
  leads: ContactoBriscoResponse[];
}

export default function ConversionChart({ leads }: ConversionChartProps) {
  const data = useMemo(() => {
    let accepted = 0;
    let rejected = 0;
    leads.forEach((lead) => {
      if (lead.conversion_lograda === true) accepted++;
      else rejected++;
    });
    return [
      { label: "Aceptó", count: accepted, color: "#22c55e" },
      { label: "Rechazó", count: rejected, color: "#ef4444" },
    ];
  }, [leads]);

  return (
    <VerticalBarChart
      title="Conversión Lograda"
      data={data}
      total={leads.length}
      footerLabel="Total de leads"
    />
  );
}
