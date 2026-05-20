import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading } from '@/presentation/components'

describe('Loading Component', () => {
  it('renders with default size', () => {
    render(<Loading />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('renders with small size', () => {
    render(<Loading size="sm" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('renders with large size', () => {
    render(<Loading size="lg" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })
})