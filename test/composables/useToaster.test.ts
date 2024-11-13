import { describe, it, expect, vi } from 'vitest'
import { useToaster } from '@/composables/useToaster'

describe('useToaster', () => {
  it('should initialize with default values', () => {
    const { isVisible, message } = useToaster()
    expect(isVisible.value).toBe(false)
    expect(message.value).toBe('')
  })

  it('should show toaster with message and hide after duration', () => {
    const { isVisible, message, showToaster } = useToaster()
    const testMessage = 'Test message'
    const testDuration = 3000

    vi.useFakeTimers()

    showToaster(testMessage, testDuration, "success")

    expect(message.value).toBe(testMessage)
    expect(isVisible.value).toBe(true)

    vi.advanceTimersByTime(testDuration)
    expect(isVisible.value).toBe(false)

    vi.useRealTimers()
  })
})