export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
        console.log(error);
        showError(error as unknown as Error)

    }
})
