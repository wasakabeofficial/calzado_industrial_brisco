import { useState, useCallback } from "react";
import { campanaService } from "../../domain/services";
import type { Campana } from "../../domain/entities";

interface UseCampanaCreateResult {
  loading: boolean;
  error: string | null;
  create: (data: Omit<Campana, "row_number">) => Promise<void>;
}

export function useCampanaCreate(): UseCampanaCreateResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Campana, "row_number">) => {
    try {
      setLoading(true);
      setError(null);
      await campanaService.create(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, create };
}
