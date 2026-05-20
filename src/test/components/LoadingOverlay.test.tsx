import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading, LoadingOverlay } from '@/presentation/components'

describe('LoadingOverlay Component', () => {
  it('renders with default message', () => {
    render(<LoadingOverlay />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<LoadingOverlay message="Cargando datos..." />)
    expect(screen.getByText('Cargando datos...')).toBeInTheDocument()
  })
})