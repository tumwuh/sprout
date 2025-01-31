<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
const route = useRoute()
const showAddMatch = ref(false)
const isSubmitting = ref(false)
const {t} = useI18n()
const {data: tatami, status, refresh} = await useAsyncData('tatami', async () => $pb.collection('tatami').getFullList({
  filter: `tournament = "${route.params.id}"`,
}), {
  server: false,
  lazy: true
})

const handleSubmitTatami = async (form$: any) => {
  isSubmitting.value = true
  await $pb.collection('tatami').create({
    name: form$.data.name,
    tournament: route.params.id
  })
  isSubmitting.value = false
  showAddMatch.value = false
  await refresh()
}

const removeTatami = async (id: string) => {
  await $pb.collection('tatami').delete(id)
  await refresh()
}

</script>

<template>
  <section class="py-12">
    <div v-if="status === 'success'" class="flex flex-wrap gap-4">
      <div v-for="item in tatami" :key="item.id"
           class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[300px]">
       <div class="flex justify-between">
         <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.name }}</h5>
         <div class="inline-block tooltip cursor-pointer" @click="removeTatami(item.id)" :data-tip="t('removeTatami')">
           <Icon name="iconoir:trash" size="1em" />
         </div>
       </div>
        <nuxt-link :to="`/admin/tatami/${item.id}`"
                   class="btn btn-primary btn-sm">
          {{ t('openTatamiMatch') }}
        </nuxt-link>
      </div>
      <client-only>
        <div v-if="showAddMatch" class="mb-4">
          <vueform :endpoint="false" validate-on="submit" :display-errors="false"
                   @submit="handleSubmitTatami">
            <TextElement
                name="name"
                :placeholder="t('name')"
                :disabled="isSubmitting"
                rules="required|min:3|max:50"
            />
            <button-element
                name="submit"
                :submits="true"
                :loading="isSubmitting"
                :button-label="t('save')"
                :full="true"
                size="sm"
            ></button-element>
          </vueform>
        </div>
        <div
            v-else
            @click="showAddMatch = true"
            :data-tip="t('addNewTatami')"
            class="flex items-center justify-center cursor-pointer tooltip text-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[300px] min-h-[40px]">
          <Icon name="iconoir:plus" size="2.5em"/>
        </div>
      </client-only>
    </div>
    <div v-else class="flex flex-wrap gap-4">
      <div v-for="item in [1,2,3,4,5,6]" :key="item"
           class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[300px]">
        <h5 class="mb-2 skeleton h-[20px] w-2/4"></h5>
        <div class="skeleton h-[30px] w-1/4"></div>
      </div>
    </div>
  </section>
</template>
