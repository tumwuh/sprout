<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
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

useSeoMeta({
  title: data.name,
  description: data.description,
})
</script>

<template>
  <section>
    <Head>
      <Title>{{ data.name }}</Title>
    </Head>
   tournament detail
  </section>
</template>

<style scoped>

</style>