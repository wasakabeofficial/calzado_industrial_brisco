import { useState, useCallback } from "react";
import { leadsService } from "../services/leadsService";

interface UseTranscripcionResult {
  transcripcion: string | null;
  loading: boolean;
  error: string | null;
  fetchTranscripcion: (callId: string) => Promise<void>;
  clearTranscripcion: () => void;
}

export function useTranscripcion(): UseTranscripcionResult {
  const [transcripcion, setTranscripcion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTranscripcion = useCallback(async (callId: string) => {
    try {
      setLoading(true);
      setError(null);
      setTranscripcion(null);
      const data = await leadsService.getTranscripcion(callId);
      setTranscripcion(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar transcripción",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const clearTranscripcion = useCallback(() => {
    setTranscripcion(null);
    setError(null);
  }, []);

  return {
    transcripcion,
    loading,
    error,
    fetchTranscripcion,
    clearTranscripcion,
  };
}
