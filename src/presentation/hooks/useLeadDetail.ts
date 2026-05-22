import { useState, useEffect, useCallback } from "react";
import type { ContactoBriscoResponse } from "../../domain/entities";
import { leadService } from "../../data/services";
import { clearCache } from "../../data/repositories";

interface UseLeadDetailResult {
  lead: ContactoBriscoResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLeadDetail(leadId: number): UseLeadDetailResult {
  const [lead, setLead] = useState<ContactoBriscoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLead = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadService.getLeadById(leadId);
      setLead(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  const refetch = useCallback(async () => {
    clearCache();
    await fetchLead();
  }, [fetchLead]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLead();
  }, [fetchLead]);

  return { lead, loading, error, refetch };
}
