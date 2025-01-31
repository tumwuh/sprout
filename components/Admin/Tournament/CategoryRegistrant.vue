<script setup lang="ts">
import prepareKataMatchData from "~/utils/prepareKataMatchData";
import {useI18n} from "vue-i18n";
import {useEventBus} from "@vueuse/core";
import {generateKumiteDone, generateKumiteMatch, refreshMatchGroup} from "~/uniqueEventKey";

const refreshMatchGroupBus = useEventBus(refreshMatchGroup)
const generateKumiteMatchBus = useEventBus(generateKumiteMatch)
const generateKumiteDoneBus = useEventBus(generateKumiteDone)

const {$pb} = useNuxtApp()
const route = useRoute()
const isDrawing = ref(false)
const {
  showModal: showDrawValidation,
  openModal: openDrawValidation,
  closeModal: closeDrawValidation
} = useModalFunction()
const {t} = useI18n()
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  scoringType: {
    type: String,
    required: true
  }
})

const {data: roundGroup, refresh: refreshGroup} = await useAsyncData('kataRoundGroup-participant',
    async () => await $pb.collection('kataRoundGroup').getFullList({
      filter: `category="${route.params.category}"`,
      sort: 'created',
      requestKey: 'participant'
    }), {
      server: true
    })
const {data, status} = await useAsyncData('participants',
    async () => $pb.collection('participants').getFullList({
      filter: `category = "${props.id}"`,
      expand: 'registration, team, athletes'
    }), {
      lazy: true,
      server: false
    })

const drawKataTournament = async () => {
  const allMatch = prepareKataMatchData(data.value!, route.params.category as string, route.params.id as string)
  if (roundGroup.value && roundGroup.value.length) {
    const roundNeedToDelete = roundGroup.value.map(e => $pb.collection('kataRoundGroup').delete(e.id))
    await Promise.all(roundNeedToDelete)
  }

  const roundNeedToCreate = await $pb.collection('kataRoundGroup').create(allMatch.firstRound)
  for (const e of allMatch.match) {
    const match = await $pb.collection('kataGroup').create({
      name: e.name,
      round: roundNeedToCreate.id,
      category: e.category,
    });
    const contestantIds = []
    for (const a of e.contestants) {
      const contestant = await $pb.collection('kataContestant').create({...a, group: match.id});
      contestantIds.push(contestant.id)
    }
    await $pb.collection('kataGroup').update(match.id, {
      contestant: contestantIds
    })
  }
}

const drawKumiteTournament = async () => {
  generateKumiteMatchBus.emit()
}

generateKumiteDoneBus.on(async () => {
  closeDrawValidation()
  isDrawing.value = false
})

const generateAllData = async () => {
  if (data.value) {
    isDrawing.value = true
    if (props.scoringType === 'Kata') {
      await drawKataTournament()
      closeDrawValidation()
      isDrawing.value = false
      refreshMatchGroupBus.emit()
      await refreshGroup()
    } else if (props.scoringType === 'Kumite') {
      await drawKumiteTournament()
    }
  }
}

</script>

<template>
  <section class="mb-[40px]">
    <modal :isOpen="showDrawValidation" :title="t('doDraw')" @on-close="closeDrawValidation">
      <template #content>
        <p>{{ t('areYouSureWantToDraw') }}</p>
      </template>
      <template #action>
        <button @click="closeDrawValidation" class="btn btn-md">
          <Icon name="iconoir:cancel" size="1.5em"/>
          {{ t('no') }}
        </button>
        <button @click="generateAllData" class="btn btn-md btn-primary">
          <Icon v-if="isDrawing" name="svg-spinners:180-ring" size="1.5em"/>
          <Icon v-else name="iconoir:check" size="1.5em"/>
          {{ t('yes') }}
        </button>
      </template>
    </modal>
    <h1 class="text-md font-semibold">Daftar Pendaftar Kategori: </h1>
    <div v-if="status === 'success'">
      <div v-if="data?.length" class="flex gap-4 w-full overflow-x-auto max-w-[80vw] mt-2 py-4 ">
        <div v-for="item in data" :key="item.id"
             class="card card-side bg-base-100 shadow-sm py-2 px-4 flex gap-2 items-center">
          <nuxt-img
              v-if="item.expand?.team.avatar !== ''"
              provider="pocketbase"
              class="rounded-full w-[50px] h-[50px] bg-white border-2 border-solid border-base-300"
              :src="`${item.expand!.team.collectionId}/${item.expand!.team.id}/${item.expand!.team.avatar}`"
              :alt="item.expand?.team.name"/>
          <nuxt-img
              v-else
              class="rounded-full w-[50px] h-[50px] bg-white"
              src="/tumwuh-leaf.png"
              alt="team"/>
          <div class="w-[200px] flex flex-col ">
            <div class="flex justify-between">
              <h2 class="text-lg font-bold">{{ item.expand?.team.name }} </h2>
              <div v-if="!item.isValid" class="tooltip" :data-tip="t('notYetValid')">
                <Icon name="iconoir:warning-circle" size="1em"/>
              </div>
            </div>

            <span>{{ item.expand?.athletes.map((e: any) => e.name.split(' ')[0]).join(',') }}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <span>{{ t('noRegistrant') }}</span>
      </div>
    </div>
    <div v-else class="flex gap-4 w-full overflow-x-auto max-w-[80vw] mt-2 py-4 relative">
      <div v-for="item in [1,2,3,4,5]" :key="item"
           class="card card-side bg-base-100 shadow-sm py-2 px-4 flex gap-2 items-center">
        <div class="rounded-full w-[50px] h-[50px] skeleton"></div>
        <div class="w-[200px] flex flex-col ">
          <div class="w-[200px] h-[24px] skeleton mb-2"></div>
          <div class="w-[200px] h-[50px] skeleton"></div>
        </div>
      </div>
    </div>
    <button v-if="status === 'success' && data?.length" class="btn btn-primary" @click="openDrawValidation">
      <Icon name="iconoir:hexagon-dice" size="1em"/>
      {{ t('doDraw') }}
    </button>
  </section>
</template>

<style scoped>

</style>