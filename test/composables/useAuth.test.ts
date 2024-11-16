import {describe, it, expect, vi} from 'vitest';
import {mockNuxtImport} from '@nuxt/test-utils/runtime'

import useAuth, {type TUser} from '~/composables/useAuth';

const {useMockNuxtApp} = vi.hoisted(() => {
    return {
        useMockNuxtApp: () => ({
            $pb: {
                authStore: {
                    isValid: true
                },
                collection: (name: string) => ({
                    create: (data: TUser) => Promise.resolve(data),
                    authWithPassword: (email: string, password: string) => Promise.resolve({record: {id: '123'}})
                })
            },
        })
    }
})
mockNuxtImport('useNuxtApp', () => useMockNuxtApp);

describe('useAuth', () => {
    it('should have a valid user object', () => {
        const {user} = useAuth();
        expect(user.isValid).toBe(true);
    });

    it('should register a new user', async () => {
        const {registerUser} = useAuth();
        const newUser: TUser = {
            collectionId: '123',
            collectionName: 'users',
            username: 'testuser',
            verified: false,
            emailVisibility: true,
            email: 'test@example.com',
            created: new Date(),
            updated: new Date(),
            name: 'Test User',
            role: 'team'
        };

        const createdUser = await registerUser(newUser);
        expect(createdUser).toEqual(newUser);
    });

    it('should authenticate a user with email and password', async () => {
        const {authWithEmailPassword} = useAuth();
        const authResult = await authWithEmailPassword('test@example.com', 'password123');
        expect(authResult).toEqual({record: {id: '123'}});
    });

});