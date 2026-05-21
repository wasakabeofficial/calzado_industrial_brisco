import type { CampanaFilters } from "../../../domain/entities";
import { emptyCampanaFilters } from "../../../domain/entities";

interface CampanaFiltersBarProps {
  filters: CampanaFilters;
  onChange: (filters: CampanaFilters) => void;
}

export function CampanaFiltersBar({
  filters,
  onChange,
}: CampanaFiltersBarProps) {
  const update = (key: keyof CampanaFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clear = () => onChange(emptyCampanaFilters);

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Filtros</h3>
        {hasFilters && (
          <button
            onClick={clear}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filters.titulo ?? ""}
          onChange={(e) => update("titulo", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={filters.estado ?? ""}
          onChange={(e) => update("estado", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todos los estados</option>
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
        </select>

        <input
          type="date"
          value={filters.fechaInicio ?? ""}
          onChange={(e) => update("fechaInicio", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="date"
          value={filters.fechaFin ?? ""}
          onChange={(e) => update("fechaFin", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
