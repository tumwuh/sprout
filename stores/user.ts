import type {TUser} from "~/composables/useAuth";
import {defineStore} from "pinia";
import {ref} from "vue";

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