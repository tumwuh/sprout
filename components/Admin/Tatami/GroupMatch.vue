<script setup lang="ts">

const props = defineProps({
  categoryId: {
    type: String,
    required: true
  }
})

const {$pb} = useNuxtApp()

const {data} = await useAsyncData('category-data',
    async () => $pb.collection('tournamentCategories').getOne(props.categoryId, {
      expand: 'scoring'
    }),
    {
      server: false,
      lazy: true,
      watch: [props]
    }
)
</script>

<template>
  <section>
    <admin-tournament-kata-round
        v-if="data?.expand?.scoring?.name === 'Kata'"
        :category-id="categoryId"
    ></admin-tournament-kata-round>
    <admin-tournament-kumite-round
        v-else-if="data?.expand?.scoring?.name === 'Kumite'"
        :category-id="categoryId"
    ></admin-tournament-kumite-round>
  </section>
</template>