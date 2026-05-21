import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useLeadList } from "@/presentation/hooks";
import { leadService } from "@/data/services";
import type { LeadFilters } from "@/domain/entities";
import { mockLeads } from "../mocks/leads";

// Mock the service
vi.mock("@/data/services", () => ({
  leadService: {
    getAllLeads: vi.fn(),
  },
}));

describe("useLeadList Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches leads on mount", async () => {
    vi.mocked(leadService.getAllLeads).mockResolvedValue(mockLeads);

    const { result } = renderHook(() => useLeadList());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.leads).toEqual(mockLeads);
    expect(result.current.error).toBeNull();
  });

  it("handles error when fetch fails", async () => {
    vi.mocked(leadService.getAllLeads).mockRejectedValue(
      new Error("Fetch failed"),
    );

    const { result } = renderHook(() => useLeadList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Fetch failed");
    expect(result.current.leads).toEqual([]);
  });

  it("refetches when filters change", async () => {
    vi.mocked(leadService.getAllLeads).mockResolvedValue(mockLeads);

    const filters: LeadFilters = {
      proceso: "nuevo",
      empresa: "Tech",
      cliente: "",
      fechaInicio: "",
      fechaFin: "",
      interes: "",
      duracion: "",
      razonTerminado: "",
    };

    const { result } = renderHook(() => useLeadList(filters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(leadService.getAllLeads).toHaveBeenCalledWith(filters);
  });

  it("provides refetch function", async () => {
    vi.mocked(leadService.getAllLeads).mockResolvedValue(mockLeads);

    const { result } = renderHook(() => useLeadList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const refetch = result.current.refetch;
    refetch();

    expect(leadService.getAllLeads).toHaveBeenCalledTimes(2);
  });
});
