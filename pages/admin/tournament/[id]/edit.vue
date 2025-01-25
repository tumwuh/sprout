<script setup lang="ts">
import {useToaster} from "~/composables/useToaster";
import slugify from "slugify";
import {faker} from "@faker-js/faker";
import {useI18n} from "vue-i18n";

definePageMeta({
  middleware: ["is-admin", "only-admin"],
  layout: "admin",
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
})

const {t} = useI18n()
const {$pb} = useNuxtApp()
const router = useRouter()
const route = useRoute()
const deletedItem = ref<string[]>([])
const {isVisible, message, showToaster, variant} = useToaster()


const {
  data: defaultValue,
  status
} = await useAsyncData('tournament', () => $pb.collection('tournaments').getOne(route.params.id as string, {
  expand: 'categories'
}), {
  lazy: true,
  server: false
})


const isSubmitting = ref(false)

const handleCategoryDelete = async (id: string) => {
  deletedItem.value.push(id)
}


const handleSubmit = async (form: any) => {
  isSubmitting.value = true
  try {
    const tournamentFormData = new FormData()
    let tournamentCategories = []
    for (const key in form) {
      if (key === 'categories') {
        tournamentCategories = form[key]
      } else if (key === 'description') {
        tournamentFormData.append(key, form[key].en)
      } else if (key === 'logo' || key === 'pamflet') {
        if (form[key] instanceof File) {
          tournamentFormData.append(key, form[key])
        }
      } else {
        tournamentFormData.append(key, form[key])
      }
    }


    if (deletedItem.value.length > 0) {
      await Promise.all(deletedItem.value.map(async (id) => {
        await $pb.collection('tournamentCategories').delete(id, {requestKey: id})
      }))
    }

    if (tournamentCategories.length > 0) {
      const records = await Promise.all(tournamentCategories.map(async (category: any) => {
        const categoryData = {...category, tournament: route.params.id}
        if (category.id) {
          return await $pb.collection('tournamentCategories').update(category.id, categoryData, {requestKey: category.id})
        } else {
          return await $pb.collection('tournamentCategories').create(categoryData, {requestKey: category.name})
        }
      }))
      records.forEach((record: any) => {
        if (record.id) {
          tournamentFormData.append('categories', record.id)
        }
      })
    }

    await $pb.collection('tournaments').update(route.params.id as string, tournamentFormData)

    showToaster(t('successCreateTournament'), 3000, 'success')
    await router.push('/admin/tournament')
  } catch (e) {
    showToaster(t('failedCreateTournament'), 3000, 'error')
  } finally {
    isSubmitting.value = false
  }

}
</script>

<template>
  <div>
    <toaster :is-visible="isVisible" :message="message" :variant="variant"/>
    <section>
      <h1 class="text-3xl font-semibold">{{ t('addSportType') }}</h1>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard">{{ t('dashboard') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/tournament">{{ t('tournamentTitle') }}</nuxt-link>
          </li>
          <li>{{ t('tournamentForm') }}</li>
        </ul>
      </div>
      <div class="flex justify-center">
        <div class="content-card w-full h-[77vh] overflow-auto">
          <tournament-form v-if="status === 'success'" @category-delete="handleCategoryDelete"
                           :is-submitting="isSubmitting" @submit="handleSubmit"
                           :default="defaultValue"/>
          <div v-else>
            <div class="flex items-center justify-center h-[77vh] skeleton"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>