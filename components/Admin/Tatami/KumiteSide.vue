<script setup lang="ts">
const props = defineProps({
  side: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="flex flex-col justify-between text-center text-white font-bold text-4xl h-full" :class="{
    'bg-blue-500': side === 'AO',
    'bg-red-500': side === 'AKA',
  }">
    <h3>{{ side }}</h3>
    <div
        class="flex items-center"
        :class="{
          'flex-row-reverse': side === 'AKA',
        }"
    >
      <div class="flex flex-col gap-4 px-4">
        <button class="btn btn-outline btn-sm border-2 border-white text-white">IPPON</button>
        <button class="btn btn-outline btn-sm border-2 border-white text-white">WAZA-ARI</button>
        <button class="btn btn-outline btn-sm border-2 border-white text-white">YUKO</button>
        <button class="btn btn-outline btn-sm border-2 border-white text-white">-1</button>
      </div>
      <div class="flex-grow">
        <div
            class="text-8xl"
            :class="{
          'text-right mr-16': side === 'AKA',
          'text-left ml-16': side === 'AO',
            }"
        >0
        </div>
        <div
            class="flex gap-2 mt-8"
            :class="{
          'flex-row-reverse': side === 'AKA',
            }"
        >
          <button class="btn btn-outline btn-circle btn-sm border-2 border-white text-white text-xs">1C</button>
          <button class="btn btn-outline btn-circle btn-sm border-2 border-white text-white text-xs">2C</button>
          <button class="btn btn-outline btn-circle btn-sm border-2 border-white text-white text-xs">3C</button>
          <button class="btn btn-outline btn-circle btn-sm border-2 border-white text-white text-xs">HC</button>
          <button class="btn btn-outline btn-circle btn-sm border-2 border-white text-white text-xs">H</button>
        </div>
      </div>
    </div>

    <div
        class="flex items-center"
        :class="{
        'flex-row-reverse': side === 'AKA',
        }"
    >

      <div class="order-first px-4 py-2">
        <user-avatar :avatar="''" collection-id="sad" item-id="asd" width="50px" height="50px"></user-avatar>
      </div>
      <div
          class="order-last flex flex-col"
          :class="{
        'text-left': side === 'AO',
        'text-right': side === 'AKA',
        }"
      >
        <div
            class="text-2xl flex items-center gap-2"
            :class="{
              'flex-row-reverse': side === 'AKA',
            }"
        >
          <span>asdas</span>
          <button
            class="btn btn-outline btn-circle btn-sm border-2 border-white text-white text-xs">S</button>
        </div>
        <span class="text-lg">syaausdasdokjs yas</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>