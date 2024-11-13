import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'id',
        messages: {
            id: {
                registerSuccess: 'Pendaftaran anda berhasil!',
                registerError: 'Pendaftaran anda gagal!',
                loginSuccess: 'Login berhasil!',
                loginError: 'Login gagal!'
            }
        }
    })

    vueApp.use(i18n)
})