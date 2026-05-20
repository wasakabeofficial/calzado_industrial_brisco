import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InterestChart from '@/presentation/components/ui/InterestChart'
import type { Lead } from '@/domain/entities'

describe('InterestChart Component', () => {
  const mockLeads: Lead[] = [
    {
      id_registro: 1,
      id_cliente: 101,
      vapi_call_id: 'call-1',
      nombre_completo: 'Juan',
      telefono: 5551234,
      nombre_empresa: 'Empresa 1',
      fecha_ultima_compra: null,
      producto_ultima_compra: null,
      vapi_call_status: 'completed',
      status_procesos: 'nuevo',
      interes_cliente: 'alto',
      descripcion_interes_cliente: null,
      conversacion_lograda: true,
      accion_seguimiento: 'llamar',
      descripcion_accion_seguimiento: null,
      resumen_llamada: null,
      objeccion_principal: 'ninguna',
      descripcion_objeccion_principal: null,
      created_at: '2026-05-20',
    },
    {
      id_registro: 2,
      id_cliente: 102,
      vapi_call_id: 'call-2',
      nombre_completo: 'María',
      telefono: 5555678,
      nombre_empresa: 'Empresa 2',
      fecha_ultima_compra: null,
      producto_ultima_compra: null,
      vapi_call_status: 'completed',
      status_procesos: 'nuevo',
      interes_cliente: 'medio',
      descripcion_interes_cliente: null,
      conversacion_lograda: true,
      accion_seguimiento: 'llamar',
      descripcion_accion_seguimiento: null,
      resumen_llamada: null,
      objeccion_principal: 'ninguna',
      descripcion_objeccion_principal: null,
      created_at: '2026-05-20',
    },
    {
      id_registro: 3,
      id_cliente: 103,
      vapi_call_id: 'call-3',
      nombre_completo: 'Carlos',
      telefono: 5559012,
      nombre_empresa: 'Empresa 3',
      fecha_ultima_compra: null,
      producto_ultima_compra: null,
      vapi_call_status: 'completed',
      status_procesos: 'nuevo',
      interes_cliente: 'alto',
      descripcion_interes_cliente: null,
      conversacion_lograda: true,
      accion_seguimiento: 'llamar',
      descripcion_accion_seguimiento: null,
      resumen_llamada: null,
      objeccion_principal: 'ninguna',
      descripcion_objeccion_principal: null,
      created_at: '2026-05-20',
    },
  ]

  it('renders with data', () => {
    render(<InterestChart leads={mockLeads} />)
    expect(screen.getByText(/Interés de Clientes/i)).toBeInTheDocument()
  })

  it('renders with empty data', () => {
    render(<InterestChart leads={[]} />)
    expect(screen.getByText(/Interés de Clientes/i)).toBeInTheDocument()
  })
})