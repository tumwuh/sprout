<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
const {webUrl, baseApiUrl} = useRuntimeConfig().public
const {t} = useI18n()
const route = useRoute()
const {data}: { data: any } = await useAsyncData('tournamentDetail', async () => $pb.collection('tournaments').getFirstListItem(`slug = "${route.params.slug}"`, {
  expand: 'sportType'
}))
if (!data.value){
  throw createError({statusCode: 404, message: t('tournamentNotFound')})
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

</script>

<template>
  <section class="pt-[70px] md:pt-[120px] min-h-[80vh] mx-[10vw]">
    <Head>
      <Title>{{ data.name }}</Title>
      <meta name="description" :content="htmlToCleanText(data.description)"/>
      <meta name="og:title" :content="data.name"/>
      <meta name="og:type" content="website"/>
      <meta name="og:url" :content="`${webUrl}${route.fullPath}`"/>
      <meta name="og:site_name" content="Tumwuh"/>
      <meta name="og:description" :content="htmlToCleanText(data.description)"/>
      <meta name="og:image" :content="`${baseApiUrl}/api/files/${data.collectionId}/${data.id}/${data.pamflet}`"/>
      <meta name="twitter:title" :content="data.name"/>
      <meta name="twitter:description" :content="htmlToCleanText(data.description)"/>
      <meta name="twitter:image" :content="`${baseApiUrl}/api/files/${data.collectionId}/${data.id}/${data.pamflet}`"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <link rel="canonical" :href="`${webUrl}${route.fullPath}`">
    </Head>
    <div class="flex flex-col md:flex-row items-start gap-16 ">
      <figure class="md:w-[450px] inline-block">
        <nuxt-img :src="`${baseApiUrl}/api/files/${data.collectionId}/${data.id}/${data.pamflet}`" :alt="data.name"
                  class="w-[450px] h-[450px] object-contain rounded-lg"/>
      </figure>
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
