import type {TUser} from "~/composables/useAuth";

export const useUserStore = defineStore('userStore', () => {
    const user = ref<TUser | null>(null)
    const setUser = (newUser: TUser | null) => {
        user.value = newUser
    }

    return {
        user,
        setUser
    }
})