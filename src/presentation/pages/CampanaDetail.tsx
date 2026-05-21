import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useCampanaDetail } from "../hooks";
import { Loading } from "../components";

export default function CampanaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const rowNumber = Number(id);
  const { campana, loading, error, update } = useCampanaDetail(rowNumber);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
    tiempo_inicial: "",
    tiempo_final: "",
  });

  const startEdit = () => {
    if (!campana) return;
    setForm({
      titulo: campana.titulo ?? "",
      descripcion: campana.descripcion ?? "",
      estado: campana.estado ?? "ACTIVO",
      tiempo_inicial: campana.tiempo_inicial ?? "",
      tiempo_final: campana.tiempo_final ?? "",
    });
    setEditing(true);
  };

  const handleSave = async () => {
    await update({
      titulo: form.titulo,
      descripcion: form.descripcion,
      estado: form.estado,
      tiempo_inicial: form.tiempo_inicial,
      tiempo_final: form.tiempo_final,
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="w-full px-6 py-4 mx-auto max-w-8xl">
        <div className="flex flex-col items-center justify-center min-h-100 bg-gray-50 rounded-xl">
          <Loading size="lg" />
          <p className="mt-4 text-sm text-gray-500 font-medium">
            Cargando campaña...
          </p>
        </div>
      </div>
    );
  }

  if (error || !campana) {
    return (
      <div className="w-full px-6 py-4 mx-auto max-w-8xl">
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          Error: {error || "Campaña no encontrada"}
        </div>
        <button
          onClick={() => navigate("/campanas")}
          className="mt-4 px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
        >
          ← Volver a campañas
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-4 mx-auto max-w-8xl space-y-6">
      <button
        onClick={() => navigate("/campanas")}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        ← Volver a campañas
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Detalle de Campaña
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
              campana.estado === "ACTIVO"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {campana.estado}
          </span>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
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
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
                rows={4}
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
                  value={form.tiempo_final}
                  onChange={(e) =>
                    setForm({ ...form, tiempo_final: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Título</p>
              <p className="text-lg font-medium text-gray-900">
                {campana.titulo}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="text-gray-900">{campana.descripcion}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Inicio</p>
                <p className="text-gray-900">
                  {campana.tiempo_inicial
                    ? new Date(campana.tiempo_inicial).toLocaleString("es-MX")
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fin</p>
                <p className="text-gray-900">
                  {campana.tiempo_final
                    ? new Date(campana.tiempo_final).toLocaleString("es-MX")
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={startEdit}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Editar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
