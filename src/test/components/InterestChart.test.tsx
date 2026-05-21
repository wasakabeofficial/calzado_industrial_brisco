import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InterestChart from '@/presentation/components/charts/InterestChart'
import { mockLeads } from '@/test/mocks/leads'

describe('InterestChart Component', () => {
  it('renders with data', () => {
    render(<InterestChart leads={mockLeads} />)
    expect(screen.getByText(/Interés de Clientes/i)).toBeInTheDocument()
  })

  it('renders with empty data', () => {
    render(<InterestChart leads={[]} />)
    expect(screen.getByText(/Interés de Clientes/i)).toBeInTheDocument()
  })
})
