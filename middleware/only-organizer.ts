import { useSession } from 'h3'
import { defineNuxtRouteMiddleware, navigateTo, useRequestEvent } from 'nuxt/app'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!process.server) {
        return
    }

    const { sessionPassword } = useRuntimeConfig()
    const event = useRequestEvent()

    if (!event) {
        return navigateTo('/503')
    }

    const session = await useSession(event, {
        password: sessionPassword,
        name: 'my-detail'
    })

    if (session.data.user.model.role !== 'organizer') {
        throw createError({statusCode: 401, message: 'Hanya admin yang dizinkan mengakses menu ini, anda tidak berhak mengasesnya !', statusMessage: 'Anda tidak diizinkan'})
    }
})