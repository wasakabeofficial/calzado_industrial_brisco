import { useState } from "react";
import { useNavigate } from "react-router";
import { leadTableColumns } from "../components/leadColumns";
import { useLeadList } from "../hooks";
import { Table, Loading, LeadFiltersBar } from "../components";
import { emptyFilters, type LeadFilters } from "../../domain/entities";

export default function Clientes() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<LeadFilters>(emptyFilters);
  const { leads, loading, error } = useLeadList(filters);

  if (loading) {
    return (
      <div className="w-full px-4 md:px-6 py-4 mx-auto max-w-8xl">
        <div className="flex flex-col items-center justify-center min-h-100 bg-gray-50 rounded-xl">
          <Loading size="lg" />
          <p className="mt-4 text-sm text-gray-500 font-medium">
            Cargando clientes...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 md:px-6 py-4 mx-auto max-w-8xl">
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 py-4 mx-auto max-w-8xl space-y-4 md:space-y-6">
      <LeadFiltersBar filters={filters} onChange={setFilters} />

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <Table
          columns={leadTableColumns}
          data={leads}
          onRowClick={(lead) => navigate(`/lead/${lead.id_cliente}`)}
          loading={loading}
          emptyMessage="No hay clientes disponibles en este momento."
        />
      </div>
    </div>
  );
}
