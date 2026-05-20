import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import Table from "./Table";
import { leadsColumns } from "./leadsColumns";
import type { Lead } from "./Lead";

export default function LeadsTable() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchLeads() {
    try {
      const { data, error } = await supabase
        .from("leads_brisco")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeads();
  }, []);

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
    <div className="w-full px-6 py-4 mx-auto max-w-8xl">
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <Table
          columns={leadsColumns}
          data={leads}
          onRowClick={(lead) => navigate(`/lead/${lead.id_registro}`)}
          loading={loading}
          emptyMessage="No hay registros de leads disponibles en este momento."
        />
      </div>
    </div>
  );
}
