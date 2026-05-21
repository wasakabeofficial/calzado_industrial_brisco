import { useState, useEffect, useCallback } from "react";
import type { Campana } from "../../domain/entities";
import { campanaService } from "../../domain/services";

interface UseCampanaDetailResult {
  campana: Campana | null;
  loading: boolean;
  error: string | null;
  update: (data: Partial<Campana>) => Promise<void>;
  refetch: () => void;
}

export function useCampanaDetail(rowNumber: number): UseCampanaDetailResult {
  const [campana, setCampana] = useState<Campana | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampana = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const all = await campanaService.getAll();
      const found = all.find((c) => c.row_number === rowNumber);
      if (!found) throw new Error(`Campaña con ID ${rowNumber} no encontrada`);
      setCampana(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [rowNumber]);

  const update = useCallback(
    async (data: Partial<Campana>) => {
      await campanaService.update(rowNumber, data);
      await fetchCampana();
    },
    [rowNumber, fetchCampana],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCampana();
  }, [fetchCampana]);

  return { campana, loading, error, update, refetch: fetchCampana };
}
