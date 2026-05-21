import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeadFiltersBar } from "@/presentation/components";
import type { LeadFilters } from "@/domain/entities";

describe("LeadFiltersBar Component", () => {
  const mockOnChange = vi.fn();

  const defaultFilters: LeadFilters = {
    proceso: "",
    empresa: "",
    cliente: "",
    fechaInicio: "",
    fechaFin: "",
    interes: "",
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the toggle button", () => {
    render(<LeadFiltersBar filters={defaultFilters} onChange={mockOnChange} />);
    expect(
      screen.getByRole("button", { name: /filtros/i }),
    ).toBeInTheDocument();
  });

  it("shows filters when expanded", () => {
    render(<LeadFiltersBar filters={defaultFilters} onChange={mockOnChange} />);
    const button = screen.getByRole("button", { name: /filtros/i });
    fireEvent.click(button);
    expect(screen.getByText("Tipo Proceso")).toBeInTheDocument();
  });

  it("calls onChange when filter changes and apply is clicked", () => {
    render(<LeadFiltersBar filters={defaultFilters} onChange={mockOnChange} />);
    const button = screen.getByRole("button", { name: /filtros/i });
    fireEvent.click(button);
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "nuevo" } });
    const applyButton = screen.getByRole("button", { name: /aplicar/i });
    fireEvent.click(applyButton);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("shows active badge when filters are applied", () => {
    const filtersWithData: LeadFilters = {
      ...defaultFilters,
      proceso: "nuevo",
    };
    render(
      <LeadFiltersBar filters={filtersWithData} onChange={mockOnChange} />,
    );
    expect(screen.getByText(/activos/i)).toBeInTheDocument();
  });

  it("clears filters when clear button is clicked", () => {
    const filtersWithData: LeadFilters = {
      ...defaultFilters,
      proceso: "nuevo",
    };
    render(
      <LeadFiltersBar filters={filtersWithData} onChange={mockOnChange} />,
    );
    const button = screen.getByRole("button", { name: /filtros/i });
    fireEvent.click(button);
    const clearButton = screen.getByRole("button", { name: /limpiar/i });
    fireEvent.click(clearButton);
    expect(mockOnChange).toHaveBeenCalledWith(defaultFilters);
  });
});
