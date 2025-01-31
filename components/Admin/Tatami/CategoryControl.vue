<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
const {t} = useI18n()
const route = useRoute()
const props = defineProps({
  tournamentId: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  }
})

const {
  data: listCategory,
  status: listCategoryStatus
} = useAsyncData('listCategory', async () => $pb.collection('tournamentCategories').getFullList({
  filter: `tournament = "${props.tournamentId}"`,
  expand: 'scoring'
}), {
  server: false,
  lazy: true,
})

const highLightMatch = async (id: string) => {
 if (id !== props.categoryId) {
   await $pb.collection('tatami').update(route.params.id as string, {
     category: id
   })
 }
}
</script>

<template>
  <div class="flex flex-col h-[90vh] overflow-y-auto w-[20vw]">
    <div class="text-left">
      <h3 class="font-bold text-2xl">{{ t('listCategory') }}: </h3>
    </div>
    <div v-if="listCategoryStatus === 'success'" class="flex flex-col gap-2">
      <div v-for="item in listCategory" :key="item.id" class="px-2 py-4 text-left rounded bg-base-200">
        <h3 class="font-sans font-medium text-md mb-2 ">{{ item.name }}</h3>
        <button class="btn btn-ghost btn-sm" @click="highLightMatch(item.id)">
          <Icon name="iconoir:eye" width="24" height="24" />
          {{t('highlightMatch')}}
        </button>
      </div>
    </div>
    <div v-else class="flex flex-col gap-2">
      <div v-for="item in [1,2,3,4,5,6]" :key="item" class="px-2 py-4 text-left rounded bg-base-200">
        <div class="w-36 h-4 skeleton mb-2"></div>
        <div class="w-14 h-4 skeleton"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>