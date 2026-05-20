import { useState, useEffect, useCallback } from "react";
import type { Lead } from "../types";
import { leadService } from "../services/leadsService";

interface UseLeadListResult {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLeadList(): UseLeadListResult {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadService.getAllLeads();
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeads();
  }, [fetchLeads]);

  return { leads, loading, error, refetch: fetchLeads };
}