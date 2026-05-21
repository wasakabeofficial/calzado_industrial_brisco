import { useState, useEffect, useCallback } from "react";
import type { Campana } from "../../domain/entities";
import { campanaService } from "../../domain/services";

interface UseCampanasResult {
  campanas: Campana[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCampanas(): UseCampanasResult {
  const [campanas, setCampanas] = useState<Campana[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampanas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await campanaService.getAll();
      setCampanas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCampanas();
  }, [fetchCampanas]);

  return { campanas, loading, error, refetch: fetchCampanas };
}
