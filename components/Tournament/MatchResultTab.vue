<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const {$pb} = useNuxtApp()
const props = defineProps({
  tournamentId: {
    type: String,
    required: true
  }
})
const {data, status} = await useAsyncData('category', async () => $pb.collection('tournamentCategories').getList(1, 50, {
  filter: `tournament = "${props.tournamentId}"`,
  expand: ['scoring']
}))
</script>

<template>
  <section class="grid grid-cols-1 gap-8 py-12">
    <div v-for="item in data.items" :key="item.id" class="collapse collapse-plus bg-base-200">
      <input type="radio" name="tournamentRegistrant"/>
      <div class="collapse-title text-xl font-medium">{{ item.name }}</div>
      <div class="collapse-content">
        <tournament-kumite-match :categoryId="item.id"/>
      </div>
    </div>
  </section>
</template>