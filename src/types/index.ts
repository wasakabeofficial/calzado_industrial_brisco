export interface Lead {
  id_registro: number;
  id_cliente: number;
  vapi_call_id: string;
  nombre_completo: string;
  telefono: number;
  nombre_empresa: string;
  fecha_ultima_compra: string | null;
  producto_ultima_compra: string | null;
  vapi_call_status: string;
  status_procesos: string;
  interes_cliente: string;
  descripcion_interes_cliente: string | null;
  conversacion_lograda: boolean;
  accion_seguimiento: string;
  descripcion_accion_seguimiento: string | null;
  resumen_llamada: string | null;
  objeccion_principal: string;
  descripcion_objeccion_principal: string | null;
  created_at: string;
}

export interface TranscripcionData {
  texto?: {
    transcripcion_limpia?: string;
  };
}
