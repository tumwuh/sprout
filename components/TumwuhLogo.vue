<script setup lang="ts">
 const props = defineProps<{
   size: "sm" | "md" | "lg" | "xl";
 }>()
</script>

<template>
  <div class="flex justify-center items-center text-sm mr-2 bg-[url('/tumwuh-logo.png')] dark:bg-[url('/tumwuh-logo-dark.png')] bg-contain bg-no-repeat bg-center" :class="{
    'w-[24px] h-[24px]': props.size === 'sm',
    'w-[48px] h-[48px]': props.size === 'md',
    'w-[120px] h-[48px]': props.size === 'lg',
    'w-[192px] h-[192px]': props.size === 'xl',
  }">
  </div>
</template>

<style scoped>

</style>