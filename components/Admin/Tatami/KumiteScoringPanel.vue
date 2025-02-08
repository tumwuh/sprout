<script setup lang="ts">

</script>

<template>
<section class="relative">
  <div class="w-[25vw] h-[20vh] absolute left-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%] rounded">
    <admin-tatami-timer-watch></admin-tatami-timer-watch>
  </div>
  <div class="grid grid-cols-2 h-[42vh]">
    <admin-tatami-kumite-side side="AO"></admin-tatami-kumite-side>
    <admin-tatami-kumite-side side="AKA"></admin-tatami-kumite-side>
  </div>
</section>
</template>

<style scoped>

</style>