import { useState } from "react";
import { useLeadList } from "../hooks";
import {
  CallFrequencyChart,
  CallStatusChart,
  ConversionChart,
  FollowUpActionChart,
  InterestChart,
  ObjectionChart,
  LeadFiltersBar,
  Loading,
} from "../components";
import { emptyFilters, type LeadFilters } from "../../domain/entities";

export default function Dashboard() {
  const [filters, setFilters] = useState<LeadFilters>(emptyFilters);
  const { leads, loading, error } = useLeadList(filters);

  if (loading) {
    return (
      <div className="w-full px-4 md:px-6 py-4 mx-auto max-w-8xl">
        <div className="flex flex-col items-center justify-center min-h-100 bg-gray-50 rounded-xl">
          <Loading size="lg" />
          <p className="mt-4 text-sm text-gray-500 font-medium">
            Cargando registros...
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <InterestChart leads={leads} />
        <CallStatusChart leads={leads} />
        <ConversionChart leads={leads} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <FollowUpActionChart leads={leads} />
        <ObjectionChart leads={leads} />
        <CallFrequencyChart leads={leads} />
      </div>
    </div>
  );
}
