<script setup lang="ts">
 const props = defineProps<{
   size: "sm" | "md" | "lg" | "xl";
 }>()
</script>

<template>
  <div class="bg-gray-500 flex justify-center items-center text-sm mr-2" :class="{
    'w-[24px] h-[24px]': props.size === 'sm',
    'w-[48px] h-[48px]': props.size === 'md',
    'w-[96px] h-[96px]': props.size === 'lg',
    'w-[192px] h-[192px]': props.size === 'xl',
  }">
    Logo
  </div>
</template>

<style scoped>

</style>