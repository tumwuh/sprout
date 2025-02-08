<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
const route = useRoute()
const {t} = useI18n()
const {
  data: tatami,
  refresh: refreshTatami,
  error: tatamiError
} = await useAsyncData('detailTatami', async () => $pb.collection('tatami').getOne(route.params.id as string, {
  expand: 'tournament,category,scoring',
}))


if (tatamiError.value) {
  throw createError({
    statusCode: 404,
    message: t('generalDataNotFoundMessage'),
    statusMessage: t('generalDataNotFound')
  })
}

onMounted(() => {
  if (tatami.value) {
    $pb.collection('tatami').subscribe(tatami.value.id as string, function (e) {
      refreshTatami()
    }, {});
  }

})

onUnmounted(() => {
  if (tatami.value) {
    $pb.collection('tatami').unsubscribe(tatami.value.id as string)
  }
})


definePageMeta({
  layout: "plain",
  middleware: ["is-admin", "only-organizer"],
})

useSeoMeta({
  title: tatami.value?.name,
})

</script>

<template>
  <section class="text-center p-4 h-screen w-screen">
    <div class="flex gap-4">
      <admin-tatami-category-control
          :tournamentId="tatami!.expand?.tournament.id"
          :categoryId="tatami!.category"
      ></admin-tatami-category-control>
      <div class="flex flex-grow flex-col">
        <div class="w-full h-1/2">
          <h1 class="text-3xl capitalize font-bold">{{ tatami?.expand?.tournament.name }}</h1>
          <admin-tatami-scoring-detail></admin-tatami-scoring-detail>
        </div>
        <div class="w-full h-1/2">
          <admin-tatami-group-match :categoryId="tatami!.category"></admin-tatami-group-match>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>