// vueform.config.(js|ts)

import id from '@vueform/vueform/locales/id'
import tailwind from '@vueform/vueform/dist/tailwind'
import { defineConfig } from '@vueform/vueform'
// @ts-ignore
import MaskPlugin from '@vueform/plugin-mask'

export default defineConfig({
    theme: tailwind,
    locales: { id },
    locale: 'id',
    messageBag: false,
    endpoints: {
        uploadTempFile: false
    },
    plugins: [
        MaskPlugin,
    ]
})