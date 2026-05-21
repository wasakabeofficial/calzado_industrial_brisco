import type { Campana } from "../../domain/entities";

export const campanaTableColumns = [
  { key: "titulo" as keyof Campana, header: "Título" },
  {
    key: "descripcion" as keyof Campana,
    header: "Descripción",
    render: (campana: Campana) => (
      <span className="text-sm text-gray-600 max-w-md truncate block">
        {campana.descripcion ?? "N/A"}
      </span>
    ),
  },
  {
    key: "tiempo_inicial" as keyof Campana,
    header: "Inicio",
    render: (campana: Campana) =>
      campana.tiempo_inicial
        ? new Date(campana.tiempo_inicial).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
  },
  {
    key: "tiempo_final" as keyof Campana,
    header: "Fin",
    render: (campana: Campana) =>
      campana.tiempo_final
        ? new Date(campana.tiempo_final).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A",
  },
  {
    key: "estado" as keyof Campana,
    header: "Estado",
    render: (campana: Campana) => {
      const estado = campana.estado ?? "N/A";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase border ${
            estado === "ACTIVO"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : estado === "PAUSADO"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          {estado}
        </span>
      );
    },
  },
];
