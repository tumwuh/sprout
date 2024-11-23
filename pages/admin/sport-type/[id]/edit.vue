<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Toaster from "~/components/Toaster.vue";
import {useToaster} from "~/composables/useToaster";

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
const route = useRoute()
const router = useRouter()
const isSubmitting = ref(false)
const deletedItem = ref<string[]>([])
const {isVisible, message, showToaster, variant} = useToaster()

const {data, status} = await useAsyncData('sportTypes',
    async () => $pb.collection('sportTypes').getOne(route.params.id as string, {
      expand: 'scoring'
    }), {
      lazy: true,
      server: false
    })

const handleSubmit = async (form: any) => {
  isSubmitting.value = true;
  const updateData: {[key: string]: any} = {
    name: form.name,
    description: form.description.en,
  }

  if (deletedItem.value.length > 0) {
    await Promise.all(deletedItem.value.map(async (id) => $pb.collection('scoringTypes').delete(id)))
  }

  const records = await Promise.all(form.scoringTypes.map(async (scoring: any) => {
    if (scoring.id) {
      return await $pb.collection('scoringTypes').update(scoring.id, {
        name: scoring.name,
        description: scoring.description.en,
        sportType: route.params.id as string
      })
    } else {
      return await $pb.collection('scoringTypes').create({
        name: scoring.name,
        description: scoring.description.en,
        sportType: route.params.id as string
      })
    }
  }))

  updateData.scoring = records.map((record: any) => record.id)

  await $pb.collection('sportTypes').update(route.params.id as string, updateData)

  isSubmitting.value = false;
  showToaster(t('successUpdateSportType'), 3000, 'success')
  setTimeout(() => {
    router.push('/admin/sport-type')
  }, 1000)
}

const handleScoringDelete = async (id: string) => {
  deletedItem.value.push(id)
}

const formValue = computed(() => {
  return {
    name: data.value?.name,
    description: data.value?.description,
    scoring: data.value?.expand?.scoring
  }
})
</script>

<template>
  <div>
    <toaster :is-visible="isVisible" :message="message" :variant="variant"/>
    <section>
      <h1 class="text-3xl font-semibold">{{ t('editSportType') }}</h1>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard">{{ t('dashboard') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/sport-type">{{ t('sportTypeTitle') }}</nuxt-link>
          </li>
          <li>{{ t('editSportType') }}</li>
        </ul>
      </div>
      <div class="flex justify-center ">
        <div class="content-card w-full max-h-[77vh] overflow-auto">
          <admin-sport-type-form v-if="status === 'success'" :is-submitting="isSubmitting" :default="formValue"
                                 :status="status"
                                 @submit="handleSubmit" @scoring-delete="handleScoringDelete"/>
          <div v-else>
            <div class="flex items-center justify-center h-[77vh] skeleton"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>