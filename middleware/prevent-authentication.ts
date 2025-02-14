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

   if (session.data.user) {
       if (session.data.user.role === 'team') {
           return navigateTo('/')
       }

       if (session.data.user.role === 'admin' || session.data.user.role === 'organizer') {
           return navigateTo('/admin')
       }
   }
})