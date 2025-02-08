<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
</script>

<template>
  <div class="flex h-full justify-center w-full">
    <div class="text-white flex justify-between w-full px-2 items-center">
      <div class="tooltip cursor-pointer" :data-tip="t('addSecond')">
        <Icon name="lucide:arrow-up" size="3em" />
      </div>
     <span class="text-4xl lg:text-6xl"> {{timerFormat(180000)}}</span>
      <div class="tooltip cursor-pointer" :data-tip="t('subtractSecond')">
        <Icon name="lucide:arrow-down" size="3em" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>