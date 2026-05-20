import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useLeadDetail } from '@/presentation/hooks'
import { leadService } from '@/domain/services'

// Mock the service
vi.mock('@/domain/services', () => ({
  leadService: {
    getLeadById: vi.fn(),
  },
}))

describe('useLeadDetail Hook', () => {
  const mockLead = {
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
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches lead on mount with valid id', async () => {
    vi.mocked(leadService.getLeadById).mockResolvedValue(mockLead)

    const { result } = renderHook(() => useLeadDetail(1))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.lead).toEqual(mockLead)
    expect(result.current.error).toBeNull()
  })

  it('handles error when fetch fails', async () => {
    vi.mocked(leadService.getLeadById).mockRejectedValue(new Error('Not found'))

    const { result } = renderHook(() => useLeadDetail(999))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Not found')
    expect(result.current.lead).toBeNull()
  })

  it('handles lead not found when id is 0', async () => {
    // When id is 0, the service still tries to fetch and returns an error
    const { result } = renderHook(() => useLeadDetail(0))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.lead).toBeNull()
  })
})