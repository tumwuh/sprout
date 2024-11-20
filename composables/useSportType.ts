const useSportType = () => {
    const {$pb} = useNuxtApp()

    const toggleStatus = async (item: any) => {
        const updatedItem = {
            ...item,
            isActive: !item.isActive
        }
       return  await $pb.collection('sportTypes').update(item.id, updatedItem)
    }


    return {
        toggleStatus
    }
}

export default useSportType