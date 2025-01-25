<script setup lang="ts">
import {useI18n} from "vue-i18n";

const router = useRouter()
const {t} = useI18n()
const {$pb, $dayjs} = useNuxtApp()
const sortBy = ref<string>('-created')

const filterBy = ref<string>('(status = "publish")')
const {data, status} = await useAsyncData('tournament', async () => $pb.collection('tournaments').getList(1, 50, {
  expand: 'sportType,managedBy.name',
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
  tempFilterBy += ' && (status = "published")'
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
      <div class="w-full md:w-[400px] md:border-r-2 md:border-solid md:border-white px-4">
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
        <div v-if="status === 'success'" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 my-8">
          <div v-for="item in data.items" class="card bg-base-100 shadow-xl cursor-pointer w-[400]">
            <div class="h-[200px] flex justify-center items-center bg-white relative" @click="goToDetail(item.slug)">
              <nuxt-img
                  provider="pocketbase"
                  v-if="item.logo && item.logo.length > 0"
                  :src="`${item.collectionId}/${item.id}/${item.logo}`"
                  :alt="item.name"/>
              <nuxt-img
                  v-else
                  src="/tumwuh-logo.png"
                  alt="tumwuh"/>
            </div>
            <div class="card-body">
              <h2 class="card-title w-1/2">
                <nuxt-link :to="`/tournament/${item.slug}`">{{ item.name }}</nuxt-link>
              </h2>
              <div class="flex flex-wrap gap-2">
                <div class="badge badge-primary text-white dark:text-black">
                  <Icon name="mdi-light:sitemap" size="1.5em" class="mr-0.5"/>
                  {{ item.expand.sportType.name }}
                </div>
                <div class="badge badge-primary text-white dark:text-black">
                  <Icon name="meteor-icons:globe" size="1.5em" class="mr-0.5"/>
                  {{ item.region }}
                </div>
              </div>
              <div class="card-actions justify-between items-center">
                <div class="text-sm">{{ $dayjs(item.startDate).format('DD MMM YYYY') }} -
                  {{ $dayjs(item.endDate).format('DD MMM YYYY') }}
                </div>
                <nuxt-link :to="`/tournament/${item.slug}/register`" class="btn btn-sm btn-primary">Daftar</nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 px-4 my-8">
          <div v-for="item in [1,2,3,4,5,6]" :key="item" class="card bg-base-100 shadow-xl">
            <div class="h-[200px] skeleton flex justify-center items-center ">
            </div>
            <div class="card-body">
              <h2 class="card-title skeleton w-1/2 inline-block h-[24px]"></h2>
              <div class="flex flex-wrap gap-2">
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