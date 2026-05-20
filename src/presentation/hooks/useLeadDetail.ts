import { useState, useEffect, useCallback } from "react";
import type { Lead } from "../../domain/entities";
import { leadService } from "../../domain/services";

interface UseLeadDetailResult {
  lead: Lead | null;
  loading: boolean;
  error: string | null;
  fetchLead: () => Promise<void>;
}

export function useLeadDetail(leadId: number): UseLeadDetailResult {
  const [lead, setLead] = useState<Lead | null>(null);
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLead();
  }, [fetchLead]);

  return { lead, loading, error, fetchLead };
}
