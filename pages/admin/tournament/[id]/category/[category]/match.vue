<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
const route = useRoute()
const {t} = useI18n()

definePageMeta({
  layout: "admin",
  middleware: ["is-admin", "only-organizer"],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});

const {data} = await useAsyncData('category-data',
    async () => $pb.collection('tournamentCategories').getOne(route.params.category as string, {
      expand: 'scoring'
    })
)

useSeoMeta({
  title: 'Pertandingan Pada Kategori',
  description: 'Kelola pertandingan mu',
})
</script>

<template>
  <section>
    <div>
      <h1 class="text-3xl font-semibold">{{ t('match') }}</h1>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard">{{ t('dashboard') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/tournament">{{ t('tournamentTitle') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/admin/tournament/${route.params.id}`">{{ t('tournamentDetail') }}</nuxt-link>
          </li>
          <li>
            {{ t('match') }}
          </li>
        </ul>
      </div>
    </div>
    <admin-tournament-category-registrant
        :id="route.params.category as string"
        :scoring-type="data?.expand?.scoring?.name ?? ''"
    ></admin-tournament-category-registrant>
    <admin-tournament-kata-round
        v-if="data?.expand?.scoring?.name === 'Kata'"
        :category-id="route.params.category as string"
    ></admin-tournament-kata-round>
    <admin-tournament-kumite-round
        v-else-if="data?.expand?.scoring?.name === 'Kumite'"
        :category-id="route.params.category as string"
    ></admin-tournament-kumite-round>
  </section>
</template>