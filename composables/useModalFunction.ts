import {useMagicKeys} from "@vueuse/core";

const useModalFunction = () => {
    const {escape} = useMagicKeys()
    const showModal = ref(false)


    const openModal = () => {
        showModal.value = true
    }

    const closeModal = () => {
        showModal.value = false
    }

    watch(escape, (v) => {
        if (v) {
            showModal.value = false
        }
    })


    return {
        showModal,
        openModal,
        closeModal
    }
}

export default useModalFunction