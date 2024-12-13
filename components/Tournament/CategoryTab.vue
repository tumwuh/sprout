<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const {$pb} = useNuxtApp()
const route = useRoute()
const props = defineProps({
  tournamentId: {
    type: String,
    required: true
  }
})

const {data, status} = await useAsyncData('category', async () => $pb.collection('tournamentCategories').getList(1, 50, {
  filter: `tournament = "${props.tournamentId}"`
}))

</script>

<template>
  <section class="py-12">
    <div v-if="status === 'success'" class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="item in data.items" :key="item.id"
           class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.name }}</h5>
        <div class="flex flex-wrap mb-4 gap-2">
          <div class="badge badge-primary text-white">
            {{ item.isIndividual ? t('individual') : t('team') }}
          </div>
          <div v-if="item.isAgeRestriction" class="badge badge-primary text-white">
            {{ item.minAge }} - {{ item.maxAge }} {{ t('year') }}
          </div>
          <div v-if="!item.isIndividual" class="badge badge-primary text-white">
            {{ item.minTeamMember }} - {{ item.maxTeamMember }}/{{ t('teamSingular') }}
          </div>
          <div class="badge badge-primary text-white">
            {{
              item.registrationFee ? new Intl.NumberFormat('ID', {style: 'currency', currency: 'IDR'}).format(
                  item.registrationFee,
              ) : t('free')
            }}
          </div>
        </div>
        <nuxt-link :to="`/tournament/${route.params.slug}/registration`"
                   class="btn btn-primary btn-sm">
          {{ t('register') }}
        </nuxt-link>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="item in [1,2,3,4,5,6]" :key="item"
           class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 skeleton h-[20px] w-2/4"></h5>
        <div class="flex flex-wrap mb-4 gap-2">
          <div class="skeleton h-[20px] w-3/4"></div>
        </div>
        <div class="skeleton h-[30px] w-1/4"></div>
      </div>
    </div>
  </section>
</template>