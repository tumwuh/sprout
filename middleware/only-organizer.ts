import { useSession } from 'h3'
import { defineNuxtRouteMiddleware, navigateTo, useRequestEvent } from 'nuxt/app'
import {useI18n} from "vue-i18n";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!process.server) {
        return
    }

    const {t} = useI18n()

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
        throw createError({statusCode: 401, message: t('onlyAdminMessage'), statusMessage: t('generalUnauthorized')})
    }
})