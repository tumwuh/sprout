<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const {$pb} = useNuxtApp()
const currentPage = ref(1)
const {toggleStatus} = useSportType()

const {data, status, refresh} = await useAsyncData('sportTypes',
    async () => $pb.collection('sportTypes').getList(currentPage.value, 10, {}), {
      watch: currentPage,
      lazy: true,
      server: false
    })

definePageMeta({
  middleware: ["is-admin", "only-admin"],
  layout: "admin",
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
})

const handleToggle = async (item: any) => {
  toggleStatus(item)
      .then(() => {
        refresh()
      })
}

</script>

<template>
  <section>
    <div>
      <h1 class="text-3xl font-semibold">{{ t('sportTypeTitle') }}</h1>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard">{{ t('dashboard') }}</nuxt-link>
          </li>
          <li>{{ t('sportTypeTitle') }}</li>
        </ul>
      </div>
    </div>
    <div class="content-card">
      <div class="flex justify-end">
        <nuxt-link to="sport-type/new" class="btn btn-primary btn-md">
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
              <th>{{ t('status') }}</th>
              <th></th>
            </tr>
          </template>
          <template v-slot="slotProps">
            <td>{{ slotProps.index + 1 }}</td>
            <td> {{ slotProps.item.name }}</td>
            <td> {{ slotProps.item.isActive ? 'Aktif' : 'Tidak Atif' }}</td>
            <td>
              <div class="flex justify-end gap-2">
                <div class="tooltip tooltip-left "
                     :data-tip="t(slotProps.item.isActive ? 'deactivateSportType' : 'activateSportType')">
                  <button class="btn btn-xs btn-error" @click="toggleStatus(slotProps.item)">
                    <Icon name="lineicons:power-button" size="1.5em"/>
                  </button>
                </div>
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