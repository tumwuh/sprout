const useDataTableFunction = (startPage: number = 1, startItemPerPage: number = 10) => {
    const currentPage = ref(startPage)
    const itemPerPage = ref(startItemPerPage)

    const updatePage = (page: number) => {
        currentPage.value = page
    }

    return {
        currentPage,
        itemPerPage,
        updatePage
    }
}

export default useDataTableFunction