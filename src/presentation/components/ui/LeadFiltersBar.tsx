import { useState, useEffect } from "react";
import type { LeadFilters } from "../../../domain/entities";
import { emptyFilters } from "../../../domain/entities";

interface LeadFiltersBarProps {
  filters: LeadFilters;
  onChange: (filters: LeadFilters) => void;
}

export function LeadFiltersBar({ filters, onChange }: LeadFiltersBarProps) {
  const [localFilters, setLocalFilters] = useState<LeadFilters>(filters);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (field: keyof LeadFilters, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onChange(localFilters);
  };

  const handleClear = () => {
    setLocalFilters(emptyFilters);
    onChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");
  const hasLocalFilters = Object.values(localFilters).some((v) => v !== "");

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        Filtros
        {hasActiveFilters && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            Activos
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Proceso */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tipo Proceso
            </label>
            <select
              value={localFilters.proceso}
              onChange={(e) => handleChange("proceso", e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="nuevo">Nuevo</option>
              <option value="seguimiento">Seguimiento</option>
              <option value="convirtio">Convirtió</option>
              <option value="no_interes">Sin Interés</option>
            </select>
          </div>

          {/* Empresa */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Empresa
            </label>
            <input
              type="text"
              placeholder="Buscar empresa..."
              value={localFilters.empresa}
              onChange={(e) => handleChange("empresa", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Cliente */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Cliente
            </label>
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={localFilters.cliente}
              onChange={(e) => handleChange("cliente", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Fecha Inicio */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Desde
            </label>
            <input
              type="date"
              value={localFilters.fechaInicio}
              onChange={(e) => handleChange("fechaInicio", e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Fecha Fin */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Hasta
            </label>
            <input
              type="date"
              value={localFilters.fechaFin}
              onChange={(e) => handleChange("fechaFin", e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Interés */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Interés
            </label>
            <select
              value={localFilters.interes}
              onChange={(e) => handleChange("interes", e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="alto">Alto</option>
              <option value="medio">Medio</option>
              <option value="bajo">Bajo</option>
              <option value="ninguno">Ninguno</option>
            </select>
          </div>

          {/* Botones Aplicar / Limpiar */}
          <div className="flex items-end gap-2">
            <button
              onClick={handleApply}
              disabled={!hasLocalFilters}
              className="flex-1 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Aplicar
            </button>
            <button
              onClick={handleClear}
              disabled={!hasLocalFilters}
              className="flex-1 text-sm text-red-600 hover:text-red-800 py-2 disabled:text-gray-300"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
