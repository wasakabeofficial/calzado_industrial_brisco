import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "@/presentation/components/ui/Table";

interface TestLead {
  id: number;
  name: string;
  email: string;
  status: string;
}

describe("Table Component", () => {
  const mockData: TestLead[] = [
    { id: 1, name: "Juan Pérez", email: "juan@test.com", status: "active" },
    {
      id: 2,
      name: "María García",
      email: "maria@test.com",
      status: "inactive",
    },
    { id: 3, name: "Carlos López", email: "carlos@test.com", status: "active" },
  ];

  const columns = [
    { key: "id" as keyof TestLead, header: "ID" },
    { key: "name" as keyof TestLead, header: "Nombre" },
    { key: "email" as keyof TestLead, header: "Email" },
    { key: "status" as keyof TestLead, header: "Estado" },
  ];

  it("renders table with data", () => {
    render(<Table columns={columns} data={mockData} />);

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("María García")).toBeInTheDocument();
    expect(screen.getByText("Carlos López")).toBeInTheDocument();
  });

  it("renders empty message when no data", () => {
    render(<Table columns={columns} data={[]} emptyMessage="No hay datos" />);

    expect(screen.getByText("No hay datos")).toBeInTheDocument();
  });

  it("calls onRowClick when row is clicked", () => {
    const mockClick = vi.fn();
    render(<Table columns={columns} data={mockData} onRowClick={mockClick} />);

    fireEvent.click(screen.getByText("Juan Pérez"));
    expect(mockClick).toHaveBeenCalledWith(mockData[0]);
  });

  it("shows pagination when there are many items", () => {
    const manyItems = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@test.com`,
      status: "active",
    }));

    render(<Table columns={columns} data={manyItems} itemsPerPage={10} />);

    expect(
      screen.getByText("Mostrando 1 - 10 de 25 registros"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /siguiente/i }),
    ).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<Table columns={columns} data={[]} loading={true} />);

    expect(screen.getByText("Cargando datos...")).toBeInTheDocument();
  });

  it("renders custom column rendering", () => {
    const columnsWithRender = [
      { key: "id" as keyof TestLead, header: "ID" },
      {
        key: "status" as keyof TestLead,
        header: "Estado",
        render: (item: TestLead) => (
          <span
            data-testid={`status-${item.id}`}
            className={
              item.status === "active" ? "text-green-600" : "text-red-600"
            }
          >
            {item.status}
          </span>
        ),
      },
    ];

    render(<Table columns={columnsWithRender} data={mockData} />);

    expect(screen.getByTestId("status-1")).toHaveTextContent("active");
    expect(screen.getByTestId("status-2")).toHaveTextContent("inactive");
  });

  it("navigates between pages", () => {
    const manyItems = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@test.com`,
      status: "active",
    }));

    render(<Table columns={columns} data={manyItems} itemsPerPage={10} />);

    const nextButton = screen.getByRole("button", { name: /siguiente/i });
    fireEvent.click(nextButton);

    expect(
      screen.getByText("Mostrando 11 - 20 de 25 registros"),
    ).toBeInTheDocument();
  });

  it("navigates to previous page", () => {
    const manyItems = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@test.com`,
      status: "active",
    }));

    render(<Table columns={columns} data={manyItems} itemsPerPage={10} />);

    const nextButton = screen.getByRole("button", { name: /siguiente/i });
    fireEvent.click(nextButton);

    const prevButton = screen.getByRole("button", { name: /anterior/i });
    fireEvent.click(prevButton);

    expect(
      screen.getByText("Mostrando 1 - 10 de 25 registros"),
    ).toBeInTheDocument();
  });
});
