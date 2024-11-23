import dayjs from 'dayjs'

import 'dayjs/locale/id'
dayjs.locale('id') // use locale
export default defineNuxtPlugin((nuxtApp) => {
  // Make dayjs available globally
  nuxtApp.provide('dayjs', dayjs)
})