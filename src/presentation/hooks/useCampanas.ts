import { useState, useEffect, useCallback } from "react";
import type { Campana, CampanaFilters } from "../../domain/entities";
import { emptyCampanaFilters } from "../../domain/entities";
import { campanaService } from "../../domain/services";

interface UseCampanasResult {
  campanas: Campana[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function filterCampanas(campanas: Campana[], filters: CampanaFilters): Campana[] {
  return campanas.filter((c) => {
    if (filters.titulo && !c.titulo?.toLowerCase().includes(filters.titulo.toLowerCase())) {
      return false;
    }
    if (filters.estado && c.estado !== filters.estado) {
      return false;
    }
    if (filters.fechaInicio && c.tiempo_inicial && c.tiempo_inicial < `${filters.fechaInicio}T00:00:00`) {
      return false;
    }
    if (filters.fechaFin && c.tiempo_final && c.tiempo_final > `${filters.fechaFin}T23:59:59`) {
      return false;
    }
    return true;
  });
}

export function useCampanas(filters: CampanaFilters = emptyCampanaFilters): UseCampanasResult {
  const [campanas, setCampanas] = useState<Campana[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampanas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await campanaService.getAll();
      const filtered = filterCampanas(data, filters);
      setCampanas(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCampanas();
  }, [fetchCampanas]);

  return { campanas, loading, error, refetch: fetchCampanas };
}
