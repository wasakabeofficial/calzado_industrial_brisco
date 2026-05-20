import { useState, useCallback } from "react";
import { leadService } from "../../domain/services";

const GOOGLE_DRIVE_BASE_URL = import.meta.env.VITE_GOOGLE_DRIVE_BASE_URL;

interface UseLeadAudioResult {
  loading: boolean;
  error: string | null;
  fetchAudio: (callId: string) => Promise<void>;
}

export function useLeadAudio(): UseLeadAudioResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAudio = useCallback(async (callId: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await leadService.getLeadAudio(callId);

      if (data && data.audio?.url) {
        const urlParts = data.audio.url.split("id=");
        const audioId = urlParts[1] ? urlParts[1].split("&")[0] : null;

        if (audioId) {
          const gdUrl = `${GOOGLE_DRIVE_BASE_URL}${audioId}/view`;
          window.open(gdUrl, "_blank", "noopener,noreferrer");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar el audio");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchAudio,
  };
}
