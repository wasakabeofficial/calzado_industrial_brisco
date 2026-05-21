export interface CampanaFilters {
  titulo?: string;
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

export const emptyCampanaFilters: CampanaFilters = {
  titulo: "",
  estado: "",
  fechaInicio: "",
  fechaFin: "",
};
