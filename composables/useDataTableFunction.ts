const useDataTableFunction = (startPage: number = 1, startItemPerPage: number = 10) => {
    const currentPage = ref(startPage)
    const itemPerPage = ref(startItemPerPage)

    const updatePage = (page: number) => {
        currentPage.value = page
    }

    const updateItemPerPage = (page: number) => {
        itemPerPage.value = page
    }

    return {
        currentPage,
        itemPerPage,
        updatePage,
        updateItemPerPage
    }
}

export default useDataTableFunction