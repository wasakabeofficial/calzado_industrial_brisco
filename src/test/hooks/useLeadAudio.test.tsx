import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useLeadAudio } from '@/presentation/hooks'
import { leadService } from '@/domain/services'

// Mock the service
vi.mock('@/domain/services', () => ({
  leadService: {
    getLeadAudio: vi.fn(),
  },
}))

// Mock window.open
const mockWindowOpen = vi.fn()
window.open = mockWindowOpen

describe('useLeadAudio Hook', () => {
  const mockAudioResponse = {
    audio: {
      url: 'https://docs.google.com/uc?export=download&id=1VRvUSy7-oxA7miQhV3FS5pd8pX1myqAc',
      name: 'test_audio.mp3',
      mimeType: 'audio/mpeg',
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches audio and opens Google Drive', async () => {
    vi.mocked(leadService.getLeadAudio).mockResolvedValue(mockAudioResponse)

    const { result } = renderHook(() => useLeadAudio())

    act(() => {
      result.current.fetchAudio('call-123')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://drive.google.com/file/d/1VRvUSy7-oxA7miQhV3FS5pd8pX1myqAc/view',
      '_blank',
      'noopener,noreferrer'
    )
  })

  it('handles error when fetch fails', async () => {
    vi.mocked(leadService.getLeadAudio).mockRejectedValue(new Error('Audio not found'))

    const { result } = renderHook(() => useLeadAudio())

    act(() => {
      result.current.fetchAudio('call-999')
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Audio not found')
  })

  it('opens correct URL when audio response has URL', async () => {
    const customResponse = {
      audio: {
        url: 'https://docs.google.com/uc?export=download&id=abc123XYZ',
        name: 'custom_audio.mp3',
        mimeType: 'audio/mpeg',
      },
    }
    vi.mocked(leadService.getLeadAudio).mockResolvedValue(customResponse)

    const { result } = renderHook(() => useLeadAudio())

    act(() => {
      result.current.fetchAudio('call-456')
    })

    await waitFor(() => {
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://drive.google.com/file/d/abc123XYZ/view',
        '_blank',
        'noopener,noreferrer'
      )
    })
  })
})