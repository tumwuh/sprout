<script setup lang="ts">

import {useI18n} from "vue-i18n";

const route = useRoute()
const isLoading = ref(false)

const selectedId = ref('')
const {showModal, openModal, closeModal} = useModalFunction()
const {currentPage, itemPerPage, updatePage} = useDataTableFunction()
const {$pb, $dayjs} = useNuxtApp()
const {t} = useI18n()
const {data, status, refresh} = await useAsyncData('tournamentRegistration',
    async () => $pb.collection('tournamentRegistration').getList(currentPage.value, itemPerPage.value, {
      filter: `tournament = "${route.params.id}"`,
      expand: 'tournament,participants',
      sort: '-created'
    }), {
      watch: [currentPage],
      server: false,
      lazy: true
    })


const getImageUrl = async (record: any) => {
  const fileToken = await $pb.files.getToken();
  const url = $pb.files.getUrl(record, record.paymentProof, {'token': fileToken});
  window.open(url, '_blank');
}

const showValidateConfirmation = (id: string) => {
  selectedId.value = id
  openModal()
}

const validateRegistration = async () => {
  isLoading.value = true
  await $pb.collection('tournamentRegistration').update(selectedId.value, {
    isValid: true,
  })
  selectedId.value = ''
  closeModal()
  await refresh()
}

</script>

<template>
  <section>
    <modal :is-open="showModal" @on-close="closeModal" :title="t('validateRegistration')">
      <template #content>
        <p>{{ t('validateRegistrationConfirmation') }}</p>
      </template>
      <template #action>
        <button :disabled="isLoading" @click="closeModal" class="btn btn-md ">
          <Icon name="iconoir:cancel" size="1.5em"/>
          {{ t('no') }}
        </button>
        <button @click.once="validateRegistration" class="btn btn-md btn-primary">
          <Icon v-if="isLoading" name="svg-spinners:180-ring" size="1.5em"/>
          <Icon v-else name="iconoir:check" size="1.5em"/>
          {{ t('yes') }}
        </button>
      </template>
    </modal>
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
        <td class="text-center">{{ slotProps.item.isValid ? t('yes') : t('no') }}</td>
        <td class="text-center">
          {{ slotProps.item.validatedDate ? $dayjs(slotProps.item.validatedDate).format('DD MMM, YY') : '-' }}
        </td>
        <td class="text-center">{{ formatToRupiah(slotProps.item.totalFee) }}</td>
        <td>
          <div class="flex gap-2">
            <div v-if="slotProps.item?.paymentProof?.length > 0" class="tooltip tooltip-left"
                 :data-tip="t('seePaymentProof')">
              <button @click="getImageUrl(slotProps.item)" class="btn btn-sm btn-ghost">
                <Icon name="tabler:file" size="1.5em"/>
              </button>
            </div>
            <div v-if="!slotProps.item.isValid" class="tooltip tooltip-left" :data-tip="t('validateRegistration')">
              <button @click="showValidateConfirmation(slotProps.item.id)" class="btn btn-sm  btn-ghost ">
                <Icon name="iconoir:database-script" size="1.5em"/>
              </button>
            </div>
            <div class="tooltip tooltip-left" :data-tip="t('detailRegistration')">
              <nuxt-link :to="`${route.params.id}/registration/${slotProps.item.id}`" class="btn btn-sm  btn-ghost ">
                <Icon name="lucide:eye" size="1.5em"/>
              </nuxt-link>
            </div>
          </div>
        </td>
      </template>
    </data-table>
  </section>
</template>

<style scoped>

</style>