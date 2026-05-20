import { useState, useEffect, useCallback } from "react";
import type { Lead } from "../types";
import { leadsService } from "../services/leadsService";

interface UseLeadsResult {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLeads(): UseLeadsResult {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadsService.getAll();
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
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
