import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useLeadTranscription } from "@/presentation/hooks";
import { leadService } from "@/data/services";

// Mock the service
vi.mock("@/data/services", () => ({
  leadService: {
    getLeadTranscription: vi.fn(),
  },
}));

describe("useLeadTranscription Hook", () => {
  const mockTranscriptionText =
    "Esta es una transcripción de prueba de la llamada.";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches transcription successfully", async () => {
    vi.mocked(leadService.getLeadTranscription).mockResolvedValue(
      mockTranscriptionText,
    );

    const { result } = renderHook(() => useLeadTranscription());

    act(() => {
      result.current.fetchTranscription("call-123");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transcription).toBe(mockTranscriptionText);
    expect(result.current.error).toBeNull();
  });

  it("handles error when fetch fails", async () => {
    vi.mocked(leadService.getLeadTranscription).mockRejectedValue(
      new Error("Fetch failed"),
    );

    const { result } = renderHook(() => useLeadTranscription());

    act(() => {
      result.current.fetchTranscription("call-123");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Fetch failed");
    expect(result.current.transcription).toBeNull();
  });

  it("clears transcription", async () => {
    vi.mocked(leadService.getLeadTranscription).mockResolvedValue(
      mockTranscriptionText,
    );

    const { result } = renderHook(() => useLeadTranscription());

    act(() => {
      result.current.fetchTranscription("call-123");
    });

    await waitFor(() => {
      expect(result.current.transcription).toBe(mockTranscriptionText);
    });

    act(() => {
      result.current.clearTranscription();
    });

    expect(result.current.transcription).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
