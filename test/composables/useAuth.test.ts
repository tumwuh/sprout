import { describe, it, expect, vi, beforeEach } from 'vitest'
import { pb } from '~/pocketbase.config'
import useAuth, { type TUser } from '@/composables/useAuth'
import {faker} from "@faker-js/faker";

vi.mock('~/pocketbase.config', () => ({
  pb: {
    collection: vi.fn().mockReturnThis(),
    create: vi.fn(),
    authWithPassword: vi.fn(),
    authStore: {
      model: null,
      token: null,
      isValid: false
    }
  }
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

describe('useAuth', () => {
  let newUser: TUser
  let email: string
  let password: string

  beforeEach(() => {
    email = 'test@example.com'
    password = 'testpassword'
    newUser = {
      id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      collectionId: "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
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
    const { user } = useAuth()
    expect(user.model).toBe(null)
  })

  it('should register user correctly', async () => {
    const { registerUser } = useAuth()
    // @ts-ignore
    pb.create.mockResolvedValueOnce(newUser)
    await registerUser(newUser)
    expect(pb.collection).toHaveBeenCalledWith('users')
    // @ts-ignore
    expect(pb.create).toHaveBeenCalledWith(newUser)
  })

  it('should authenticate with email and password', async () => {
    const { authWithEmailPassword } = useAuth()
    // @ts-ignore
    pb.authWithPassword.mockResolvedValueOnce({
      token: faker.string.alpha(20),
      record: newUser
    })

    await authWithEmailPassword(email, password)

    expect(pb.collection).toHaveBeenCalledWith('users')
    // @ts-ignore
    expect(pb.authWithPassword).toHaveBeenCalledWith(email, password)
  })

  it('should handle authentication errors', async () => {
    const { authWithEmailPassword } = useAuth()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const error = new Error('Authentication failed')
    // @ts-ignore
    pb.authWithPassword.mockRejectedValueOnce(error)

    await authWithEmailPassword(email, password)

    expect(consoleSpy).toHaveBeenCalledWith(error)
    consoleSpy.mockRestore()
  })
})