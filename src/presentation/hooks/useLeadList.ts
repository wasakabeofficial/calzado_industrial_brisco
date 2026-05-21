import { useState, useEffect, useCallback } from "react";
import type {
  ContactoBriscoResponse,
  LeadFilters,
} from "../../domain/entities";
import { emptyFilters } from "../../domain/entities";
import { leadService } from "../../data/services";

interface UseLeadListResult {
  leads: ContactoBriscoResponse[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLeadList(
  filters: LeadFilters = emptyFilters,
): UseLeadListResult {
  const [leads, setLeads] = useState<ContactoBriscoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadService.getAllLeads(filters);
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeads();
  }, [fetchLeads]);

  return { leads, loading, error, refetch: fetchLeads };
}
