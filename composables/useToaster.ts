// composables/useToaster.ts
import {ref} from 'vue'

export function useToaster() {
    const isVisible = ref(false)
    const message = ref('')
    const variant = ref<'success' | 'error' | 'info'>('success')

    const showToaster = (msg: string, duration = 3000, newVariant: 'success' | 'error' | 'info') => {
        message.value = msg
        isVisible.value = true
        variant.value = newVariant
        setTimeout(() => {
            isVisible.value = false
        }, 3000)
    }

    return {
        isVisible,
        message,
        showToaster,
        variant
    }
}