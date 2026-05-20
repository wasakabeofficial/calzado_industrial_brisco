import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useLeadList } from '@/presentation/hooks'
import { leadService } from '@/domain/services'
import type { LeadFilters } from '@/domain/entities'

// Mock the service
vi.mock('@/domain/services', () => ({
  leadService: {
    getAllLeads: vi.fn(),
  },
}))

describe('useLeadList Hook', () => {
  const mockLeads = [
    {
      id_registro: 1,
      id_cliente: 101,
      vapi_call_id: 'call-123',
      nombre_completo: 'Juan Pérez',
      telefono: 5551234567,
      nombre_empresa: 'Tech Solutions',
      fecha_ultima_compra: '2025-01-15',
      producto_ultima_compra: 'Botas industriales',
      vapi_call_status: 'completed',
      status_procesos: 'nuevo',
      interes_cliente: 'alto',
      descripcion_interes_cliente: 'Interesado en catálogo completo',
      conversacion_lograda: true,
      accion_seguimiento: 'llamar_semana',
      descripcion_accion_seguimiento: 'Seguimiento en 7 días',
      resumen_llamada: 'Cliente interesado',
      objeccion_principal: 'ninguna',
      descripcion_objeccion_principal: null,
      created_at: '2026-05-20T10:00:00',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches leads on mount', async () => {
    vi.mocked(leadService.getAllLeads).mockResolvedValue(mockLeads)

    const { result } = renderHook(() => useLeadList())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.leads).toEqual(mockLeads)
    expect(result.current.error).toBeNull()
  })

  it('handles error when fetch fails', async () => {
    vi.mocked(leadService.getAllLeads).mockRejectedValue(new Error('Fetch failed'))

    const { result } = renderHook(() => useLeadList())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Fetch failed')
    expect(result.current.leads).toEqual([])
  })

  it('refetches when filters change', async () => {
    vi.mocked(leadService.getAllLeads).mockResolvedValue(mockLeads)

    const filters: LeadFilters = {
      proceso: 'nuevo',
      empresa: 'Tech',
      cliente: '',
      fechaInicio: '',
      fechaFin: '',
      interes: '',
    }

    const { result } = renderHook(() => useLeadList(filters))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(leadService.getAllLeads).toHaveBeenCalledWith(filters)
  })

  it('provides refetch function', async () => {
    vi.mocked(leadService.getAllLeads).mockResolvedValue(mockLeads)

    const { result } = renderHook(() => useLeadList())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const refetch = result.current.refetch
    refetch()

    expect(leadService.getAllLeads).toHaveBeenCalledTimes(2)
  })
})