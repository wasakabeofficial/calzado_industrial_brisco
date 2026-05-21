import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CallStatusChart from "@/presentation/components/charts/CallStatusChart";
import { mockLeads } from "@/test/mocks/leads";

describe("CallStatusChart Component", () => {
  it("renders with data", () => {
    render(<CallStatusChart leads={mockLeads} />);
    expect(screen.getByText(/Estado de Llamadas/i)).toBeInTheDocument();
  });

  it("renders with empty data", () => {
    render(<CallStatusChart leads={[]} />);
    expect(screen.getByText(/Estado de Llamadas/i)).toBeInTheDocument();
  });
});
