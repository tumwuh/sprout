<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['tabsChange'])


const handleClick = (index: number) => {
  emit('tabsChange', index)
}

</script>

<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li v-for="(item, index) in data" :key="item.key" class="me-2" @click="handleClick(index)">
        <span class="tab-item group" :class="{active: item.active}">
          <Icon :name="item.icon" size="1.5em" class="mr-2" />
         <span class="font-semibold"> {{item.label}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>