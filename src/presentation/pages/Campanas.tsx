import { useCampanas } from "../hooks";
import { campanaTableColumns, Table, Loading } from "../components";

export default function Campanas() {
  const { campanas, loading, error } = useCampanas();

  if (loading) {
    return (
      <div className="w-full px-6 py-4 mx-auto max-w-8xl">
        <div className="flex flex-col items-center justify-center min-h-100 bg-gray-50 rounded-xl">
          <Loading size="lg" />
          <p className="mt-4 text-sm text-gray-500 font-medium">
            Cargando campañas...
          </p>
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
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <Table
          columns={campanaTableColumns}
          data={campanas}
          loading={loading}
          emptyMessage="No hay campañas disponibles en este momento."
        />
      </div>
    </div>
  );
}
