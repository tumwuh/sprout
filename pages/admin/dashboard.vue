<script setup lang="ts">

definePageMeta({
  layout: "admin",
  middleware: ["is-admin"],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});
</script>

<template>
  <section>
    <h1>Dashboard</h1>
  </section>
</template>

<style scoped>

</style>