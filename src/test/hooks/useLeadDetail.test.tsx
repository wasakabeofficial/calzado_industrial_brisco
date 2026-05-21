import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useLeadDetail } from "@/presentation/hooks";
import { leadService } from "@/domain/services";
import { mockLeads } from "../mocks/leads";

// Mock the service
vi.mock("@/domain/services", () => ({
  leadService: {
    getLeadById: vi.fn(),
  },
}));

describe("useLeadDetail Hook", () => {
  const mockLead = mockLeads[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches lead on mount with valid id", async () => {
    vi.mocked(leadService.getLeadById).mockResolvedValue(mockLead);

    const { result } = renderHook(() => useLeadDetail(1));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.lead).toEqual(mockLead);
    expect(result.current.error).toBeNull();
  });

  it("handles error when fetch fails", async () => {
    vi.mocked(leadService.getLeadById).mockRejectedValue(
      new Error("Not found"),
    );

    const { result } = renderHook(() => useLeadDetail(999));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Not found");
    expect(result.current.lead).toBeNull();
  });

  it("handles lead not found when id is 0", async () => {
    // When id is 0, the service still tries to fetch and returns an error
    const { result } = renderHook(() => useLeadDetail(0));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.lead).toBeNull();
  });
});
