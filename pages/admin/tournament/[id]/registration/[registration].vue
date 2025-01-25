<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {baseApiUrl} = useRuntimeConfig().public
definePageMeta({
  layout: "admin",
  middleware: ["is-admin", "only-organizer"],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});

const {t} = useI18n()

useSeoMeta({
  title: t('tournamentRegistration'),
  description: 'Daftar peserta yang telah kamu daftarkan',
})

const {$pb, $dayjs} = useNuxtApp()
const {currentPage, itemPerPage, updatePage} = useDataTableFunction()
const route = useRoute()
const {user} = useUserStore()
const {data, status, refresh} = await useAsyncData('tournamentRegistration',
    async () => await $pb.collection('participants').getList(currentPage.value, itemPerPage.value, {
      filter: `registration = "${route.params.registration}"`,
      expand: 'category,athletes,team'
    }), {
      watch: [currentPage],
      server: true
    })


const calculateAge = (dob: string, minAge: number, maxAge: number): boolean => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= minAge && age <= maxAge
}


</script>

<template>
  <section>
    <div>
      <h1 class="text-3xl font-semibold">{{ t('tournamentRegistration') }}</h1>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard">{{ t('dashboard') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/tournament">{{ t('tournamentTitle') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/admin/tournament/${route.params.id}`">{{ t('tournamentDetail') }}</nuxt-link>
          </li>
          <li>
            {{ t('tournamentRegistration') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="content-card mb-8">
      <data-table :status="status"
                  :data="data?.items ?? []"
                  :col-span="8"
                  :current-page="currentPage"
                  :total-items="data?.totalItems"
                  @change-page="updatePage"
                  :item-per-page="itemPerPage"
      >
        <template #thead>
          <tr>
            <th></th>
            <th>{{ t('teamName') }}</th>
            <th>{{ t('athlete') }}</th>
            <th>{{ t('category') }}</th>
            <th>{{ t('registartionFee') }}</th>
            <th>{{ t('registrationAt') }}</th>
            <th></th>
          </tr>
        </template>
        <template v-slot="slotProps">
          <td>{{ slotProps.index + 1 }}</td>
          <td>{{ slotProps.item?.expand?.team?.name }}</td>
          <td>
            <div class="flex flex-col gap-2">
              <div v-for="item in slotProps.item?.expand?.athletes" :key="item.id" class="flex items-center gap-4">
                <div class="w-8 rounded-full border-base-300 border-solid border-2 contain-content">
                  <nuxt-img v-if="item.avatar !== ''"
                            :src="`${baseApiUrl}/api/files/${item.collectionId}/${item.id}/${item.avatar}`"/>
                  <nuxt-img v-else :src="`https://api.dicebear.com/9.x/pixel-art/svg?seed=${item?.name}`"/>
                </div>
                <span>{{ item?.name }}</span>
                <div
                    v-if="slotProps.item?.expand?.category?.isAgeRestriction && !calculateAge(item.dob, slotProps.item?.expand?.category?.minAge, slotProps.item?.expand?.category?.maxAge)"
                    class="tooltip" :data-tip="t('thisAthleteNotYetMetAgeRequirement')">
                  <Icon name="lucide:info" size="1.5em"/>
                </div>
              </div>
            </div>
          </td>
          <td>
            {{ slotProps.item?.expand?.category?.name }}
          </td>
          <td>
            {{
              formatToRupiah(slotProps.item?.expand?.category?.registrationFee)
            }}
          </td>
          <td>{{ $dayjs(slotProps.item?.created).format('DD MMM, YY') }}</td>
          <td>

          </td>
        </template>
      </data-table>
    </div>
  </section>
</template>
