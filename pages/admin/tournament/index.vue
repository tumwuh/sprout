<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const {$pb, $dayjs} = useNuxtApp()
const {user} = useUserStore()
const currentPage = ref(1)

const {data, status, refresh} = await useAsyncData('tournaments',
    async () => $pb.collection('tournaments').getList(currentPage.value, 10, {
      filter: `managedBy = "${user!.id}"`
    }), {
      watch: [currentPage],
      lazy: true,
      server: false
    })

definePageMeta({
  middleware: ["is-admin", "only-organizer"],
  layout: "admin",
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
})

const activateTournament = async (id: string) => {
  await $pb.collection('tournaments').update(id, {
    status: 'publish'
  })
  refresh()
}


</script>

<template>
  <section>
    <div>
      <h1 class="text-3xl font-semibold">{{ t('tournamentTitle') }}</h1>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard">{{ t('dashboard') }}</nuxt-link>
          </li>
          <li>{{ t('tournamentTitle') }}</li>
        </ul>
      </div>
    </div>
    <div class="content-card">
      <div class="flex justify-end">
        <nuxt-link to="tournament/new" class="btn btn-primary btn-md">
          <Icon name="mdi-light:plus" size="1.5em"/>
          {{ t('addData') }}
        </nuxt-link>
      </div>
      <client-only>
        <data-table :status="status" :data="data?.items ?? []" :col-span="7">
          <template #thead>
            <tr>
              <th></th>
              <th>{{ t('name') }}</th>
              <th>Status</th>
              <th>Tanggal Acara</th>
              <th>Tanggal Pendaftaran</th>
              <th>Kontak</th>
              <th></th>
            </tr>
          </template>
          <template v-slot="slotProps">
            <td>{{ slotProps.index + 1 }}</td>
            <td><div class="flex items-center">
              <nuxt-img provider="pocketbase"
                        :src="`${slotProps.item.collectionId}/${slotProps.item.id}/${slotProps.item.logo}`"
                        width="50" height="50" class="rounded-md mr-2"/>
              <span>{{ slotProps.item.name }}</span>
            </div></td>
            <td> {{ slotProps.item.status }} </td>
            <td> {{ $dayjs(slotProps.item.startDate).format('MMMM DD, YY') }} - {{ $dayjs(slotProps.item.endDate).format('MMMM DD, YY') }} </td>
            <td> {{ $dayjs(slotProps.item.registrationStartDate).format('MMMM DD, YY') }} - {{ $dayjs(slotProps.item.registrationEndDate).format('MMMM DD, YY') }} </td>
            <td>{{ slotProps.item.contactPerson }}</td>
            <td>
              <div class="flex justify-end gap-2">
                <div v-if="slotProps.item.status === 'draft'" class="tooltip tooltip-left" :data-tip="t('activatedData')">
                  <button @click="activateTournament(slotProps.item.id)" class="btn btn-xs btn-success">
                    <Icon name="mdi-light:check-circle" size="1.5em"/>
                  </button>
                </div>
              </div>
              <div class="flex justify-end gap-2">
                <div class="tooltip tooltip-left" :data-tip="t('changeData')">
                  <nuxt-link :to="`/admin/tournament/${slotProps.item.id}/edit`" class="btn btn-xs btn-warning">
                    <Icon name="mdi-light:pencil" size="1.5em"/>
                  </nuxt-link>
                </div>
              </div>
            </td>
          </template>
        </data-table>
      </client-only>
    </div>
  </section>
</template>