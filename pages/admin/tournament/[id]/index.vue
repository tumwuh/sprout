<script setup lang="ts">
import {useI18n} from "vue-i18n";

definePageMeta({
  layout: "admin",
  middleware: ["is-admin", "only-organizer"],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});

const {$pb} = useNuxtApp()
const {baseApiUrl} = useRuntimeConfig().public
const {t} = useI18n()
const route = useRoute()



useSeoMeta({
  title: 'Tournament Detail',
  description: 'Daftar pendaftar pada turnamen yang kamu kelola',
})

const {data: tournament}: {
  data: any
} = await useAsyncData('tournamentDetail', async () => $pb.collection('tournaments').getOne(route.params.id as string, {}), {
  server: true
})


const activeTab = ref(0)
const dataTabs = ref([
  {key: 'registrant', label: t('registrant'), active: true, icon: 'uil:create-dashboard'},
  {key: 'category', label: t('category'), icon: 'lucide:file-spreadsheet'},
  {key: 'tatami', label: t('tatami'), icon: 'lucide:file-sliders'},
])


const handleTabChange = (tab: number) => {
  activeTab.value = tab
  dataTabs.value[tab].active = true
  dataTabs.value.forEach((item, index) => {
    if (index !== tab) {
      item.active = false
    }
  })
}


</script>

<template>
  <section>
    <div>
      <h1 class="text-3xl font-semibold">{{ t('tournamentDetail') }}</h1>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard">{{ t('dashboard') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/tournament">{{ t('tournamentTitle') }}</nuxt-link>
          </li>
          <li>
            {{ tournament?.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="max-h-[78vh] overflow-y-auto">
      <div class="content-card mb-8">
        <div class="flex flex-col md:flex-row items-start gap-16 ">
          <div class="md:w-[450px] inline-block">
            <nuxt-img :src="`${baseApiUrl}/api/files/${tournament?.collectionId}/${tournament?.id}/${tournament?.pamflet}`" :alt="tournament?.name"
                      class="w-[450px] h-[450px] object-contain rounded-lg"/>
          </div>
          <div class="text-left">
            <h1 class="text-left text-2xl font-bold mb-4">{{ tournament?.name }}</h1>
            <div class="md:max-w-[40vw] md:max-h-[450px] overflow-y-auto text-justify" v-html="tournament?.description"></div>
          </div>
        </div>
        <div class="mt-4">
          <tabs @tabs-change="handleTabChange" :data="dataTabs"/>
          <div class="min-h-[20vh]">
            <transition name="slide-right">
              <admin-tournament-registrant-data  v-if="activeTab === 0"/>
            </transition>
            <transition name="slide-right">
              <tournament-category-tab :tournament-id="route.params.id as string" :is-for-organizer="true" v-if="activeTab === 1"/>
            </transition>
            <transition name="slide-right">
              <admin-tournament-tatami  :is-for-organizer="true" v-if="activeTab === 2"/>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>