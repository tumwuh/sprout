<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
const {webUrl} = useRuntimeConfig().public
const {t} = useI18n()
const route = useRoute()
const {data} : {data: any} = await useAsyncData('tournamentDetail', async () => $pb.collection('tournaments').getFirstListItem(`slug = "${route.params.slug}"`, {
  expand: 'sportType'
}))

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});

// useSeoMeta({
//   title: data.name,
//   description: data.description,
//   ogTitle: data.name,
//   ogDescription: 'This is my amazing site, let me tell you all about it.',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
// })
</script>

<template>
  <section>
    <Head>
      <Title>{{ data.name }}</Title>
      <meta name="description" :content="htmlToCleanText(data.description)" />
      <meta property="og:title" :content="data.name" />
      <meta property="og:description" :content="htmlToCleanText(data.description)" />
      <meta property="og:image" :content="data.logo" />
      <meta property="twitter:card" content="summary_large_image" />
      <link rel="canonical" :href="`${webUrl}${route.fullPath}`">
    </Head>
   tournament detail
  </section>
</template>

<style scoped>

</style>