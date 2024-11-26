import { describe, it, expect, vi } from 'vitest'

describe('useSportType', () => {
  it('should toggle the status of the item', async () => {
    const mockUpdate = vi.fn().mockResolvedValue(true)
    const $pb = {
      collection: vi.fn().mockReturnValue({
        update: mockUpdate
      })
    }
    vi.stubGlobal('useNuxtApp', () => ({ $pb }))

    const { toggleStatus } = useSportType()
    const item = { id: '1', isActive: true }

    const result = await toggleStatus(item)

    expect(mockUpdate).toHaveBeenCalledWith('1', { ...item, isActive: false })
    expect(result).toBe(true)
  })
})