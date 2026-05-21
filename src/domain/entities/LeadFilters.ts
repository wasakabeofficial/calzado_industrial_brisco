export interface LeadFilters {
  proceso: string;
  empresa: string;
  cliente: string;
  fechaInicio: string;
  fechaFin: string;
  interes: string;
  duracion: string;
  razonTerminado: string;
}

export const emptyFilters: LeadFilters = {
  proceso: "",
  empresa: "",
  cliente: "",
  fechaInicio: "",
  fechaFin: "",
  interes: "",
  duracion: "",
  razonTerminado: "",
};
