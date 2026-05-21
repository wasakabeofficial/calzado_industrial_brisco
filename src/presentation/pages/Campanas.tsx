import { useState } from "react";
import { useNavigate } from "react-router";
import { useCampanas, useCampanaCreate } from "../hooks";
import { campanaTableColumns, Table, Loading, Modal } from "../components";

export default function Campanas() {
  const navigate = useNavigate();
  const { campanas, loading, error, refetch } = useCampanas();
  const { create, loading: creating } = useCampanaCreate();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    estado: "ACTIVO",
    tiempo_inicial: "",
    tiempo_final: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create({
      titulo: form.titulo,
      descripcion: form.descripcion,
      estado: form.estado,
      tiempo_inicial: form.tiempo_inicial,
      tiempo_final: form.tiempo_final,
    });
    setShowForm(false);
    setForm({ titulo: "", descripcion: "", estado: "ACTIVO", tiempo_inicial: "", tiempo_final: "" });
    refetch();
  };

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
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Nueva Campaña
        </button>
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Nueva Campaña">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              required
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              required
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inicio
              </label>
              <input
                type="datetime-local"
                required
                value={form.tiempo_inicial}
                onChange={(e) =>
                  setForm({ ...form, tiempo_inicial: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fin
              </label>
              <input
                type="datetime-local"
                required
                value={form.tiempo_final}
                onChange={(e) =>
                  setForm({ ...form, tiempo_final: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {creating ? "Creando..." : "Crear"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <Table
          columns={campanaTableColumns}
          data={campanas}
          onRowClick={(campana) => navigate(`/campanas/${campana.row_number}`)}
          loading={loading}
          emptyMessage="No hay campañas disponibles en este momento."
        />
      </div>
    </div>
  );
}
