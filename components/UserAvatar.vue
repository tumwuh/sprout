<script setup lang="ts">
const props = defineProps({
  avatar: {
    type: String,
    required: true,
  },
  collectionId: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <nuxt-img
      v-if="avatar && avatar.length > 0"
      :src="`${collectionId}/${itemId}/${avatar}`"
      alt="Profile picture"
      :height="height"
      :width="width"

      class="rounded-full"></nuxt-img>
  <nuxt-img
      v-else
      src="/tumwuh-leaf.png"
      fit="contain"
      alt="Profile picture"
      :height="height"
      class="bg-white"></nuxt-img>
</template>

<style scoped>

</style>