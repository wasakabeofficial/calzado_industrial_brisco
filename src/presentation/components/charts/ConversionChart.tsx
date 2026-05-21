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
    let sinDato = 0;
    leads.forEach((lead) => {
      if (lead.conversion_lograda === true) accepted++;
      else if (lead.conversion_lograda === false) rejected++;
      else sinDato++;
    });

    // Si ningún lead tiene dato real de conversión, mostrar vacío
    if (accepted === 0 && rejected === 0) return [];

    return [
      ...(accepted > 0 ? [{ label: "Aceptó", count: accepted, color: "#22c55e" }] : []),
      ...(rejected > 0 ? [{ label: "Rechazó", count: rejected, color: "#ef4444" }] : []),
      ...(sinDato > 0 ? [{ label: "Sin dato", count: sinDato, color: "#9ca3af" }] : []),
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
