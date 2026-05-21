import type { ContactoBriscoResponse, LeadFilters } from "../entities";

export function filterLeads(
  leads: ContactoBriscoResponse[],
  filters: LeadFilters,
): ContactoBriscoResponse[] {
  return leads.filter((lead) => {
    const status = lead.status_procesos ?? "";
    const empresa = lead.nombre_empresa ?? "";
    const cliente = lead.nombre_completo ?? "";
    const interes = lead.interes_cliente ?? "";
    const createdAt =
      lead.created_at ?? lead.fecha_ultima_compra ?? new Date().toISOString();

    if (
      filters.proceso &&
      !status.toLowerCase().includes(filters.proceso.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.empresa &&
      !empresa.toLowerCase().includes(filters.empresa.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.cliente &&
      !cliente.toLowerCase().includes(filters.cliente.toLowerCase())
    ) {
      return false;
    }
    if (filters.fechaInicio && createdAt < `${filters.fechaInicio}T00:00:00`) {
      return false;
    }
    if (filters.fechaFin && createdAt > `${filters.fechaFin}T23:59:59`) {
      return false;
    }
    if (
      filters.interes &&
      !interes.toLowerCase().includes(filters.interes.toLowerCase())
    ) {
      return false;
    }

    // Filtro por duración
    if (filters.duracion) {
      const d = lead.duracion_llamada;
      if (d === undefined || d === null || d === "" || d === "N/A") {
        return false;
      }
      const valor = typeof d === "number" ? d : parseFloat(d);
      if (isNaN(valor) || valor < 0) return false;
      const min = Math.floor(valor);
      const seg = Math.round((valor - min) * 100);
      const totalSeg = min * 60 + seg;

      const ranges: Record<string, [number, number]> = {
        "0-30s": [0, 30],
        "31-60s": [31, 60],
        "1-2 min": [61, 120],
        "2-5 min": [121, 300],
        "5+ min": [301, Infinity],
      };

      const [lo, hi] = ranges[filters.duracion] ?? [-1, -1];
      if (totalSeg < lo || totalSeg > hi) return false;
    }

    // Filtro por razón de terminación
    if (
      filters.razonTerminado &&
      !(lead.razon_terminado_llamada ?? "")
        .toLowerCase()
        .includes(filters.razonTerminado.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}
