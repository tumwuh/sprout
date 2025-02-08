<script setup lang="ts">

import {useI18n} from "vue-i18n";

const {$pb} = useNuxtApp()
const route = useRoute()
const {t} = useI18n()

</script>

<template>
  <section class="w-full">
    <admin-tatami-kumite-scoring-panel></admin-tatami-kumite-scoring-panel>
  </section>
</template>

<style scoped>

</style>