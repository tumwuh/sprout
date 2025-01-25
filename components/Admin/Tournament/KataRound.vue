<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useEventBus, useMagicKeys} from "@vueuse/core";
import {refreshMatchGroup} from "~/uniqueEventKey";

const {escape} = useMagicKeys()

watch(escape, (v) => {
  if (v) {
    showAddRound.value = false
  }
})
const {$pb} = useNuxtApp()
const {t} = useI18n()
const isSubmitting = ref(false)
const showAddRound = ref(false)
const bus = useEventBus(refreshMatchGroup)


const route = useRoute()
const {data: roundGroup, status, refresh} = await useAsyncData(`kataRoundGroup-${route.params.category}`,
    async () => await $pb.collection('kataRoundGroup').getFullList({
      filter: `category="${route.params.category}"`,
      sort: 'created'
    }), {
      server: true
    })


bus.on(async () => {
  await refresh()
})
const handleSubmitRound = async (form$: any) => {
  isSubmitting.value = true
  try {
    await $pb.collection('kataRoundGroup').create({
      name: form$.data.name,
      category: route.params.category
    })
    await refresh()
  } catch (e) {
    console.error(e)
  } finally {
    showAddRound.value = false
    form$.reset()
    form$.el$('name').clear()
    isSubmitting.value = false
  }
}

const deleteRound = async (id: string) => {
  try {
    document.body.style.cursor = 'wait'
    await $pb.collection('kataRoundGroup').delete(id)
    await refresh()
  } catch (e) {
    console.error(e)
  } finally {
    document.body.style.cursor = 'default'
  }
}
</script>

<template>
  <section class="max-h-[50vh] mt-[40px] max-w-[80vw] overflow-x-auto">
    <div class="flex min-h-[20vh] gap-4">
      <div v-for="(item) in roundGroup" :key="item.id" class="min-w-[600px]">
        <div
            class="border-b-4 border-base-300 flex justify-between items-center px-2 py-4 capitalize font-semibold mb-2">
          <span>{{ item.name }}</span>
          <div class="tooltip tooltip-left" :data-tip="t('deleteRound')">
            <button class="btn btn-circle btn-sm" @click="deleteRound(item.id)">
              <Icon name="lucide:trash-2" size="1em"/>
            </button>
          </div>
        </div>
        <admin-tournament-kata-match-group :round="item.id"></admin-tournament-kata-match-group>
      </div>
      <client-only>
        <div v-if="showAddRound" class="w-[400px] px-8 py-2 flex items-start">
          <vueform :endpoint="false" validate-on="submit" :display-errors="false"
                   @submit="handleSubmitRound">
            <TextElement
                name="name"
                :placeholder="t('name')"
                :disabled="isSubmitting"
                :columns="{
                default: 12,
              }"
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
        <div v-else class="min-w-[300px] flex items-start">
          <div class="btn btn-wide" @click="showAddRound = true">
            {{ t('addNewRound') }}
            <Icon name="lucide:circle-plus" size="1.5em"/>
          </div>
        </div>
      </client-only>
    </div>
  </section>
</template>

<style scoped>

</style>