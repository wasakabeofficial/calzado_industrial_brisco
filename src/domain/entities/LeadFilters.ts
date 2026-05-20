export interface LeadFilters {
  proceso: string;
  empresa: string;
  cliente: string;
  fechaInicio: string;
  fechaFin: string;
  interes: string;
}

export const emptyFilters: LeadFilters = {
  proceso: "",
  empresa: "",
  cliente: "",
  fechaInicio: "",
  fechaFin: "",
  interes: "",
};