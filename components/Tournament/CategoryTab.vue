<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const {$pb} = useNuxtApp()
const route = useRoute()
const props = defineProps({
  tournamentId: {
    type: String,
    required: true
  },
  isForOrganizer: {
    type: Boolean,
    default: false
  }
})

const {data, status} = await useAsyncData('category', async () => $pb.collection('tournamentCategories').getList(1, 50, {
  filter: `tournament = "${props.tournamentId}"`,
}), {
  server: false,
  lazy: true
})

</script>

<template>
  <section class="py-12">
    <div v-if="status === 'success'" class="flex flex-wrap gap-4">
      <div v-for="item in data?.items" :key="item.id"
           class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[300px]">
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
        <nuxt-link v-if="!props.isForOrganizer" :to="`/tournament/${route.params.slug}/register?category=${item.id}`"
                   class="btn btn-primary btn-sm">
          {{ t('register') }}
        </nuxt-link>
        <nuxt-link v-else :to="`/admin/tournament/${props.tournamentId}/category/${item.id}/match`"
                   class="btn btn-primary btn-sm">
          {{ t('match') }}
        </nuxt-link>
      </div>
    </div>
    <div v-else class="flex flex-wrap gap-4">
      <div v-for="item in [1,2,3,4,5,6]" :key="item"
           class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[300px]">
        <h5 class="mb-2 skeleton h-[20px] w-2/4"></h5>
        <div class="flex flex-wrap mb-4 gap-2">
          <div class="skeleton h-[20px] w-3/4"></div>
        </div>
        <div class="skeleton h-[30px] w-1/4"></div>
      </div>
    </div>
  </section>
</template>