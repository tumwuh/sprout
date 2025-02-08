<script setup lang="ts">
import {useI18n} from "vue-i18n";

const router = useRouter()
const {t} = useI18n()
const {$pb, $dayjs} = useNuxtApp()
const sortBy = ref<string>('-created')

const filterBy = ref<string>('(status = "publish")')
const {data, status} = await useAsyncData('tournament', async () => $pb.collection('tournaments').getList(1, 10, {
  expand: 'sportType,managedBy',
  sort: sortBy.value,
  filter: filterBy.value
}), {
  watch: [sortBy, filterBy],
  lazy: true
})

const {data: sportType} = await useAsyncData('sportType', async () => $pb.collection('sportTypes').getList(1, 50))

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});
useSeoMeta({
  title: 'Daftar Turnamen',
  description: 'Cari tunamen yang menantang dirimu untuk berkompetisi',
})

const handleSortBy = (e: Event) => {
  const target = e.target as HTMLSelectElement
  sortBy.value = target.value
}

const handleSearch = (form: any) => {
  let tempFilterBy = ''
  tempFilterBy = `name ?~ "${form.data.keyword}"`
  tempFilterBy += ' && status = "publish"'
  if (form.data.sportType.length) {
    tempFilterBy += ' && ('
    form.data.sportType.forEach((item: any, index: number) => {
      tempFilterBy += `sportType = "${item}"`
      if (index < form.data.sportType.length - 1) {
        tempFilterBy += ' || '
      }
    })
    tempFilterBy += ')'
  }

  filterBy.value = tempFilterBy
}

const goToDetail = (slug: string) => {
  router.push(`/tournament/${slug}`)
}
</script>

<template>
  <section>
    <div class="flex pt-[70px] md:pt-[120px] flex-col md:flex-row min-h-[80vh] gap-8">
      <div class="w-full md:w-[250px] md:border-r-2 md:border-solid md:border-white px-4">
        <client-only>
          <vueform :endpoint="false" :display-errors="false" @submit="handleSearch">
            <TextElement label="Cari Turnamen" name="keyword">
              <template #addon-after>
                <Icon name="mdi-light:magnify" size="1.5em"/>
              </template>
            </TextElement>
            <StaticElement name="static">
              <span class="font-semibold text-lg">{{ t('sportType') }}</span>
            </StaticElement>
            <CheckboxgroupElement
                name="sportType"
                :items="sportType.items.map((item) => ({label: item.name, value: item.id}))"/>
            <ButtonElement
                name="search"
                class="static"
                :button-label="t('search')"
                :submits="true"
                size="lg"
                align="center"
                :full="true"
            />
          </vueform>
        </client-only>
      </div>
      <div>
        <div class="flex flex-col md:flex-row justify-between mb-6 px-2 ">
          <h1 class="text-2xl inline-block w-full md:min-w-[500px] font-bold mb-4">{{ t('tournamentList') }}</h1>
          <div class="flex w-full md:min-w-[500px] items-center justify-between md:justify-end px-2">
            <span class="inline-block mr-4">{{ t('sortBy') }}:</span>
            <select @change="handleSortBy" class="select select-sm select-bordered">
              <option value="-created">{{ t('newest') }}</option>
              <option value="startDate">{{ t('eventComingSoon') }}</option>
              <option value="-endDate">{{ t('eventFinished') }}</option>
            </select>
          </div>
        </div>
        <div v-if="status === 'success'" class="flex flex-wrap gap-4 px-4 my-8">
          <div v-for="item in data.items" class="card bg-base-100 shadow-xl cursor-pointer w-[350px]">
            <div class="flex justify-center items-center bg-white relative rounded-md" @click="goToDetail(item.slug)">
              <nuxt-img
                  provider="pocketbase"
                  fit="contain"
                  class="h-[200px]"
                  v-if="item.logo && item.logo.length > 0"
                  :src="`${item.collectionId}/${item.id}/${item.logo}`"
                  :placeholder="[50, 25]"
                  :alt="item.name"/>
              <nuxt-img
                  v-else
                  fit="cover"
                  src="/tumwuh-logo.png"
                  alt="tumwuh"/>
            </div>
            <article class="px-2 py-2">
              <div class="flex gap-4">
                <div>
                  <nuxt-img
                      provider="pocketbase"
                      fit="contain"
                      class="h-[40px] w-[40px] rounded-full bg-white"
                      v-if="item.expand?.managedBy?.avatar && item.expand?.managedBy?.avatar.length > 0"
                      :src="`${item.expand?.managedBy.collectionId}/${item.expand?.managedBy.id}/${item.expand?.managedBy.avatar}`"
                      :placeholder="[50, 25]"
                      :alt="item.expand?.managedBy.name"/>
                  <nuxt-img
                      v-else
                      fit="cover"
                      class="h-[40px] w-[40px] rounded-full bg-white"
                      src="/tumwuh-leaf.png"
                      :alt="item.expand?.managedBy.name"/>
                </div>
                <div class="flex-grow">
                    <span class="text-lg font-serif text-black dark:text-white">
                <nuxt-link :to="`/tournament/${item.slug}`">{{ item.name }}</nuxt-link>
              </span>
                  <div class="flex flex-wrap gap-2">
                    <div class="bg-base-100 text-black dark:text-white flex items-center gap-2">
                      <Icon name="iconoir:page-star" size="1em" class="mr-0.5"/>
                      {{ item.expand?.sportType.name }}
                    </div>
                    <div v-if="item.region" class="bg-base-100 text-black dark:text-white flex items-center gap-2">
                      <Icon name="iconnoir:globe" size="1em" class="mr-0.5"/>
                      {{ item.region }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-actions justify-between items-center">
                <time class="text-sm font-bold">{{ $dayjs(item.startDate).format('DD MMM YYYY') }} -
                  {{ $dayjs(item.endDate).format('DD MMM YYYY') }}
                </time>
                <nuxt-link :to="`/tournament/${item.slug}/register`" class="btn btn-sm btn-primary">Daftar</nuxt-link>
              </div>
            </article>
          </div>
        </div>
        <div v-else class="flex flex-wrap gap-4 px-4 my-8">
          <div v-for="item in [1,2,3,4,5,6]" :key="item" class="card bg-base-100 shadow-xl w-[350px]">
            <div class="h-[200px] skeleton flex justify-center items-center ">
            </div>
            <div class="px-2 py-2">
              <h2 class="card-title skeleton w-1/2 inline-block h-[24px]"></h2>
              <div class="flex flex-wrap gap-2 mb-2">
                <div class="w-full skeleton h-[24px]"></div>
              </div>
              <div class="card-actions justify-between items-end ">
                <div class="text-sm skeleton h-[24px] w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>