<script setup lang="ts">

import {useI18n} from "vue-i18n";
import useDataTableFunction from "~/composables/useDataTableFunction";

definePageMeta({
  layout: "setting",
  middleware: ['auth-needed'],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});

const {$pb, $dayjs} = useNuxtApp()
const {user} = useUserStore()
const {t} = useI18n()
const {currentPage, itemPerPage, updatePage} = useDataTableFunction()
const router = useRouter()
const loading = ref(false)

useSeoMeta({
  title: 'Daftar pendaftaran saya',
  description: 'Daftar pendaftaran turnamen yang telah kamu daftarkan',
})

const {data, status} = await useAsyncData('tournamentRegistration',
    async () => $pb.collection('tournamentRegistration').getList(currentPage.value, itemPerPage.value, {
      filter: `team = "${user!.id}"`,
      expand: 'tournament,participants'
    }), {
      watch: [currentPage],
      server: false
    })

const downloadInvoice = async (id: string) => {
  loading.value = true
  const data = await $pb.collection('tournamentRegistration').getOne(id, {
    expand: 'tournament'
  })
  const participation = await $pb.collection('participants').getFullList({
    filter: `registration = "${id}"`,
    expand: 'category,athletes,team'
  })
  const blob = await generateInvoice(data, participation)
  const url = blob.toString()
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.download = `invoice.pdf`
  a.click()
  loading.value = false
}


</script>

<template>
  <section>
    <data-table
        :status="status"
        :data="data?.items ?? []"
        :col-span="9"
        :current-page="currentPage"
        :total-items="data?.totalItems"
        @change-page="updatePage"
        :item-per-page="itemPerPage"
    >
      <template #thead>
        <tr>
          <th></th>
          <th>{{ t('name') }}</th>
          <th class="text-center">{{ t('registrationCount') }}</th>
          <th class="text-center">{{ t('eventDate') }}</th>
          <th class="text-center">{{ t('lastDateRegistration') }}</th>
          <th class="text-center">{{ t('isValid') }}</th>
          <th class="text-center">{{ t('validationTime') }}</th>
          <th class="text-center">{{ t('feeRegistrationTotal') }}</th>
          <th></th>
        </tr>
      </template>
      <template v-slot="slotProps">
        <td>{{ slotProps.index + 1 }}</td>
        <td><span class="w-full">{{ slotProps.item?.expand?.tournament?.name ?? '' }}</span></td>
        <td class="text-center"> {{ slotProps.item.participantCount }}</td>
        <td class="text-center">{{
            $dayjs(slotProps.item?.expand?.tournament?.startDate).format('DD MMM, YY') ?? ''
          }}
        </td>
        <td class="text-center">
          {{ $dayjs(slotProps.item?.expand?.tournament?.registrationEndDate).format('DD MMM, YY') ?? '' }}
        </td>
        <td class="text-center">{{ slotProps.item.isValid ? t('yes') : t('no') }}</td>
        <td class="text-center">
          {{ slotProps.item.validatedDate ? $dayjs(slotProps.item.validatedDate).format('DD MMM, YY') : '-' }}
        </td>
        <td class="text-center">{{ formatToRupiah(slotProps.item.totalFee) }}</td>
        <td>
          <div class="flex gap-2">
            <div class="tooltip tooltip-left" :data-tip="t('detailRegistration')">
              <button @click="router.push(`registration/${slotProps.item.id}/list-participation`)"
                      class="btn btn-xs btn-ghost">
                <Icon name="tabler:eye" size="1.5em"/>
              </button>
            </div>
            <div class="tooltip tooltip-left" :data-tip="t('printInvoice')">
              <button @click.once="downloadInvoice(slotProps.item.id)" class="btn btn-xs  btn-ghost"
                      :class="{'cursor-wait': loading}">
                <Icon name="tabler:file" size="1.5em"/>
              </button>
            </div>
            <setting-upload-proof :registrationId="slotProps.item.id"/>
          </div>
        </td>
      </template>
    </data-table>
  </section>
</template>

<style scoped>

</style>