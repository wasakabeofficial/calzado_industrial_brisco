import { useState, useCallback } from "react";
import { leadService } from "../services/leadsService";

interface UseLeadTranscriptionResult {
  transcription: string | null;
  loading: boolean;
  error: string | null;
  fetchTranscription: (callId: string) => Promise<void>;
  clearTranscription: () => void;
}

export function useLeadTranscription(): UseLeadTranscriptionResult {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTranscription = useCallback(async (callId: string) => {
    try {
      setLoading(true);
      setError(null);
      setTranscription(null);
      const data = await leadService.getLeadTranscription(callId);
      setTranscription(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error loading transcription",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const clearTranscription = useCallback(() => {
    setTranscription(null);
    setError(null);
  }, []);

  return {
    transcription,
    loading,
    error,
    fetchTranscription,
    clearTranscription,
  };
}