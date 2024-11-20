<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const {$pb} = useNuxtApp()
const {user} = useUserStore()
const currentPage = ref(1)

const {data, status, refresh} = await useAsyncData('tournaments',
    async () => $pb.collection('tournaments').getList(currentPage.value, 10, {
      filter: `managedBy = "${user!.id}"`
    }), {
      watch: currentPage.value,
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
        <data-table :status="status" :data="data?.items ?? []" :col-span="4">
          <template #thead>
            <tr>
              <th></th>
              <th>{{ t('name') }}</th>
              <th>Status</th>
              <th></th>
            </tr>
          </template>
          <template v-slot="slotProps">
            <td>{{ slotProps.index + 1 }}</td>
            <td></td>
            <td></td>
            <td>
              <div class="flex justify-end gap-2">
                <div class="tooltip tooltip-left" :data-tip="t('changeData')">
                  <nuxt-link :to="`sport-type/${slotProps.item.id}/edit`" class="btn btn-xs btn-warning">
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