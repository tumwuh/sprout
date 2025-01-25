<script setup lang="ts">
import {useMagicKeys} from "@vueuse/core";
import {useI18n} from "vue-i18n";

const props = defineProps({
  round: {
    type: String,
    required: true
  }
})
const {$pb} = useNuxtApp()
const {escape} = useMagicKeys()
const showAddMatch = ref(false)
const isSubmitting = ref(false)
const {t} = useI18n()

watch(escape, (v) => {
  if (v) {
    showAddMatch.value = false
  }
})

const {data: matchGroup, status, refresh} = await useAsyncData(`kataGroup-${props.round}`,
    async () => await $pb.collection('kataGroup').getFullList({
      filter: `round="${props.round}"`,
      requestKey: props.round
    }), {
      server: false,
    })


const handleSubmitMatch = async (form$: any) => {
  isSubmitting.value = true
  try {
    await $pb.collection('kataGroup').create({
      name: form$.data.name,
      round: props.round
    })
    await refresh()
  } catch (e) {
    console.error(e)
  } finally {
    showAddMatch.value = false
    form$.reset()
    form$.el$('name').clear()
    isSubmitting.value = false
  }
}


</script>

<template>
  <div v-if="status === 'success'">
    <div v-for="item in matchGroup" :key="item.id" class="content-card">
      <div class="font-bold flex justify-between">
        <span>
        {{ item.name }}
        </span>
      </div>
      <div class="max-w-[600px]">
        <admin-tournament-kata-match :group="item.id"></admin-tournament-kata-match>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="skeleton h-[200px] w-full content-card mb-2"></div>
  </div>

  <client-only>
    <div v-if="showAddMatch" class="mb-4">
      <vueform :endpoint="false" validate-on="submit" :display-errors="false"
               @submit="handleSubmitMatch">
        <TextElement
            name="name"
            :placeholder="t('name')"
            :disabled="isSubmitting"
            rules="required|min:3|max:50"
        />
        <button-element
            name="submit"
            :submits="true"
            :loading="isSubmitting"
            :button-label="t('save')"
            :full="true"
            size="sm"
        ></button-element>
      </vueform>
    </div>
  </client-only>
  <div class="btn btn-wide w-full mb-12" @click="showAddMatch = true">
    {{ t('addKataMatch') }}
    <Icon name="lucide:circle-plus" size="1.5em"/>
  </div>
</template>

<style scoped>

</style>