<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
const {webUrl, baseApiUrl} = useRuntimeConfig().public
const {t} = useI18n()
const route = useRoute()
const {data}: { data: any } = await useAsyncData('tournamentDetail', async () => $pb.collection('tournaments').getFirstListItem(`slug = "${route.params.slug}"`, {
  expand: 'sportType'
}), {
  server: true
})
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('tournamentNotFound'),
    message: t('tournamentNotFoundDescription')
  })
}
const activeTab = ref(0)
const dataTabs = ref([
  {key: 'category', label: t('category'), active: true, icon: 'uil:create-dashboard'},
  {key: 'registrant', label: t('registrant'), active: false, icon: 'uil:users-alt'},
  {key: 'standings', label: t('standings'), active: false, icon: 'basil:clipboard-alt-outline'},
  {key: 'matchResult', label: t('matchResult'), active: false, icon: 'bx:sitemap'},
  {key: 'gallery', label: t('gallery'), active: false, icon: 'basil:image-outline'}
])

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});
const handleTabChange = (tab: number) => {
  activeTab.value = tab
  dataTabs.value[tab].active = true
  dataTabs.value.forEach((item, index) => {
    if (index !== tab) {
      item.active = false
    }
  })
}

useSeoMeta({
  title: data.value.name,
  ogTitle: data.value.name,
  description: htmlToCleanText(data.value.description.slice(0, 160)),
  ogDescription: htmlToCleanText(data.value.description.slice(0, 160)),
  ogImage: `${baseApiUrl}/api/files/${data.value.collectionId}/${data.value.id}/${data.value.pamflet}`,
  ogSiteName: 'Tumwuh',
  ogUrl: `${webUrl}${route.fullPath}`,
  twitterTitle: data.value.name,
  twitterDescription: htmlToCleanText(data.value.description.slice(0, 160)),
  twitterImage: `${baseApiUrl}/api/files/${data.value.collectionId}/${data.value.id}/${data.value.pamflet}`,
  twitterCard: 'summary_large_image',
})

</script>

<template>
  <section class="pt-[70px] md:pt-[120px] min-h-[80vh] mx-[10vw]">
    <Head>
      <Title>{{ data.name }}</Title>
      <link rel="canonical" :href="`${webUrl}${route.fullPath}`">
    </Head>
    <div class="flex flex-col md:flex-row items-start gap-16 ">
      <div class="md:w-[450px] inline-block">
        <nuxt-img :src="`${baseApiUrl}/api/files/${data.collectionId}/${data.id}/${data.pamflet}`" :alt="data.name"
                  class="w-[450px] h-[450px] object-contain rounded-lg"/>
      </div>
      <div class="text-left">
        <h1 class="text-left text-2xl font-bold mb-4">{{ data.name }}</h1>
        <div class="md:max-w-[40vw] md:max-h-[450px] overflow-y-auto text-justify" v-html="data.description"></div>
      </div>
    </div>
    <div class="mt-4">
      <tabs @tabs-change="handleTabChange" :data="dataTabs"/>
      <transition name="slide-right">
        <tournament-category-tab :tournament-id="data.id" v-if="activeTab === 0"/>
      </transition>
      <transition name="slide-right">
        <tournament-registrant-tab :tournament-id="data.id" v-if="activeTab === 1"/>
      </transition>
      <transition name="slide-right">
        <tournament-standings-tab v-if="activeTab === 2"/>
      </transition>
      <transition name="slide-right">
        <tournament-match-result-tab :tournament-id="data.id" v-if="activeTab === 3"/>
      </transition>
      <transition name="slide-right">
        <tournament-gallery-tab v-if="activeTab === 4"/>
      </transition>
    </div>
  </section>
</template>
