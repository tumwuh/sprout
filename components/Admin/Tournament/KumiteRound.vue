<script setup lang="ts">
import useBracketMatch from "~/composables/useBracketMatch";
import {useEventBus} from "@vueuse/core";
import {generateKumiteDone, generateKumiteMatch} from "~/uniqueEventKey";


const {$pb} = useNuxtApp()
const route = useRoute()
const generateKumiteMatchBus = useEventBus(generateKumiteMatch)
const generateKumiteDoneBus = useEventBus(generateKumiteDone)
const {
  data,
  status,
  refresh
} = await useAsyncData('kumite-round', async () => {
  const roundQuery = $pb.collection('kumiteRound').getFullList({
    filter: `category = '${route.params.category}'`,
  })
  const matchQuery = $pb.collection('kumiteMatch').getFullList({
    filter: `category = '${route.params.category}'`,
    expand: 'sides'
  })
  const contestantsQuery = $pb.collection('participants').getFullList({
    filter: `category = '${route.params.category}'`,
    expand: 'athletes,team',
    requestKey: 'contestants'
  })
  return Promise.all([roundQuery, matchQuery, contestantsQuery])
}, {
  server: false,
})

const bracketRef = useTemplateRef('bracket')

const renderBracket = async () => {
  if (data.value) {
    const {createBracket} = await import('bracketry');
    const preparedData = prepareKumiteMatchData(data.value[2])
    const processedMatch = JSON.parse(JSON.stringify(data.value[1])).map(e => ({...e, sides: e.expand.sides}))
    const processedRound = JSON.parse(JSON.stringify(data.value[0]))
    Object.values(preparedData.contestant).forEach(e => {
      e.players = [e.player]
    })

    const tournamentData = {
      rounds: processedRound,
      matches: processedMatch,
      contestants: preparedData.contestant,
    };


    createBracket(tournamentData, bracketRef.value as HTMLElement, bracketStyle);
  }
}

watch(data, () => {
  renderBracket()
})

watch(bracketRef, () => {
  renderBracket()
})

generateKumiteMatchBus.on(async () => {
  if (data.value) {
    if (data.value[0].length) {
      const needDeleteRound = data.value[0].map(e => $pb.collection('kumiteRound').delete(e.id, {requestKey: `delete-round-${e.id}`}))
      await Promise.all(needDeleteRound)
    }
    const preparedData = prepareKumiteMatchData(data.value[2])
    const insertRoundReq = preparedData.round.map((e: any) => $pb.collection('kumiteRound').create({
      ...e,
      category: route.params.category,
      tournament: route.params.id
    }, {requestKey: `create-round-${e.roundIndex}`}))
    const insertRoundRes = await Promise.all(insertRoundReq)
    for (const match of preparedData.match) {
      const sides = await Promise.all(match.sides.map((e) => $pb.collection('kumiteSide').create({
        ...e,
        round: insertRoundRes[0].id,
      }, {requestKey: `create-side-${e.contestantId}`})))
      await $pb.collection('kumiteMatch').create({
        ...match,
        category: route.params.category,
        round: insertRoundRes[0].id,
        sides: sides.map(e => e.id)
      }, {requestKey: `create-match-${match.roundIndex}-${match.order}`});
    }
    generateKumiteDoneBus.emit()
    await refresh()
  }

})
const {bracketStyle} = useBracketMatch()
</script>

<template>
  <section v-if="status === 'success'" class="content-card max-h-[700px]">
    <div ref="bracket" class="w-full"></div>
  </section>
  <section v-if="status === 'pending' || status === 'idle'" class="content-card h-[500px] skeleton"></section>
</template>

<style scoped>

</style>