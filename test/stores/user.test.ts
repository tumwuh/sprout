import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '~/stores/user'
import type { TUser } from '~/composables/useAuth'

describe('useUserStore', () => {
  let store: ReturnType<typeof useUserStore>
  let newUser: TUser

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useUserStore()
    newUser = {
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      collectionId: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy',
      collectionName: 'testCollection',
      username: 'testuser',
      verified: false,
      emailVisibility: true,
      email: 'test@example.com',
      created: new Date(),
      updated: new Date(),
      name: 'Test User',
      role: 'admin'
    }
  })

  it('should initialize user as null', () => {
    expect(store.user).toBe(null)
  })

  it('should set user correctly', () => {
    store.setUser(newUser)
    expect(store.user).toEqual(newUser)
  })

  it('should set user to null', () => {
    store.setUser(null)
    expect(store.user).toBe(null)
  })
})