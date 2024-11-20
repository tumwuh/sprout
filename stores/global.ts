export const useGlobalStore = defineStore('globalStore', () => {

    const breadcrumbs = ref<Array<{ text: string, link: string }>>([])

    const setBreadcrumbs = (newBreadcrumbs: Array<{ text: string, link: string }>) => {
        breadcrumbs.value = newBreadcrumbs
    }

    return {
        breadcrumbs,
        setBreadcrumbs
    }
})