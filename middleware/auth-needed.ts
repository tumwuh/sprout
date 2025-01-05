import { useSession } from 'h3'
import { defineNuxtRouteMiddleware, navigateTo, useRequestEvent } from 'nuxt/app'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!process.server) {
        return
    }
    const nuxtApp = useNuxtApp();
    const userStore = useUserStore(nuxtApp.$pinia);


    const { sessionPassword } = useRuntimeConfig()
    const event = useRequestEvent()

    if (!event) {
        return navigateTo('/503')
    }

    const session = await useSession(event, {
        password: sessionPassword,
        name: 'my-detail'
    })

    if (!session.data.user) {
        return navigateTo('/login')
    }


    userStore.$patch({
        user: session.data.user.model,
    });
})