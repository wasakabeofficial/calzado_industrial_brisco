import { useNavigate } from "react-router";
import Table from "../ui/Table";
import InterestChart from "../ui/InterestChart";
import CallStatusChart from "../ui/CallStatusChart";
import ConversionChart from "../ui/ConversionChart";
import FollowUpActionChart from "../ui/FollowUpActionChart";
import ObjectionChart from "../ui/ObjectionChart";
import CallFrequencyChart from "../ui/CallFrequencyChart";
import { leadTableColumns } from "./leadColumns";
import { useLeadList } from "../../hooks/useLeadList";

export default function LeadTable() {
  const navigate = useNavigate();
  const { leads, loading, error } = useLeadList();

  if (loading) {
    return (
      <div className="w-full px-6 py-4 mx-auto max-w-8xl">
        <div className="p-8 text-center text-sm text-gray-500 bg-gray-50 rounded-xl">
          Cargando registros...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-6 py-4 mx-auto max-w-8xl">
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-4 mx-auto max-w-8xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InterestChart leads={leads} />
        <CallStatusChart leads={leads} />
        <ConversionChart leads={leads} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FollowUpActionChart leads={leads} />
        <ObjectionChart leads={leads} />
        <CallFrequencyChart leads={leads} />
      </div>

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <Table
          columns={leadTableColumns}
          data={leads}
          onRowClick={(lead) => navigate(`/lead/${lead.id_registro}`)}
          loading={loading}
          emptyMessage="No hay registros de leads disponibles en este momento."
        />
      </div>
    </div>
  );
}
