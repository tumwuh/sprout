<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  status: {
    type: String,
    default: false
  },
  data: {
    type: Array,
    default: []
  },
  colSpan: {
    type: Number,
    default: 3
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalItems: {
    type: Number,
    default: 0
  },
  itemPerPage: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['changePage'])

const changePage = (page: number) => {
  emit('changePage', page)
}

</script>
<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <slot name="thead"></slot>
      </thead>
      <tbody v-if="props.status === 'success' && props.data?.length">
        <tr v-for="(item, index) in data" :key="item.id">
          <slot :item="item" :index="index"></slot>
        </tr>
      </tbody>
      <tbody v-else-if="status === 'success' && data.length === 0">
        <tr>
          <td :colspan="colSpan" class="text-center">{{ t('noData') }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="colSpan" class="text-center"><div class="skeleton w-full h-[30px]"></div></td>
        </tr>
        <tr>
          <td :colspan="colSpan" class="text-center"><div class="skeleton w-full h-[30px]"></div></td>
        </tr>
        <tr>
          <td :colspan="colSpan" class="text-center"><div class="skeleton w-full h-[30px]"></div></td>
        </tr>
        <tr>
          <td :colspan="colSpan" class="text-center"><div class="skeleton w-full h-[30px]"></div></td>
        </tr>
        <tr>
          <td :colspan="colSpan" class="text-center"><div class="skeleton w-full h-[30px]"></div></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="data.length && totalItems" class="join flex justify-end mt-4">
    <button
        v-for="(item, index) in paginationGenerator(currentPage, props.itemPerPage, totalItems ?? 0)"
        :key="index"
        @click="changePage(item)"
        class="join-item btn btn-sm"
        :disabled="item === '...'"
        :class="{'btn-primary': item === currentPage}"
    >{{ item }}</button>
  </div>
</template>

