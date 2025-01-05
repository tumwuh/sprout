<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {baseApiUrl} = useRuntimeConfig().public
definePageMeta({
  layout: "setting",
  middleware: ['auth-needed'],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});

useSeoMeta({
  title: 'Daftar peserta',
  description: 'Daftar peserta yang telah kamu daftarkan',
})

const {$pb, $dayjs} = useNuxtApp()
const {currentPage, itemPerPage, updatePage} = useDataTableFunction()
const isLoading = ref(false)
const selectedId = ref('')
const {showModal, openModal, closeModal} = useModalFunction()
const {t} = useI18n()
const {user} = useUserStore()
const {data, status, refresh} = await useAsyncData('tournamentRegistration',
    async () => await $pb.collection('participants').getList(currentPage.value, itemPerPage.value, {
      filter: `team = "${user!.id}"`,
      expand: 'category,athletes'
    }), {
      watch: [currentPage],
      server: false
    })

const deleteRegistration = async () => {
  isLoading.value = true
  await $pb.collection('participants').delete(selectedId.value)
  selectedId.value = ''
  closeModal()
  await refresh()
}

const showDeleteConfirmation = (id: string) => {
  selectedId.value = id
  openModal()
}

</script>

<template>
  <section>
    <modal :is-open="showModal" @on-close="closeModal" :title="t('deleteRegistration')">
      <template #content>
        <p>{{ t('deleteRegistrationConfirmation') }}</p>
      </template>
      <template #action>
        <button :disabled="isLoading" @click="closeModal" class="btn btn-md ">
          <Icon name="iconoir:cancel" size="1.5em"/>
          {{ t('no') }}
        </button>
        <button @click.once="deleteRegistration" class="btn btn-md btn-primary">
          <Icon v-if="isLoading" name="svg-spinners:180-ring" size="1.5em"/>
          <Icon v-else name="iconoir:check" size="1.5em"/>
          {{ t('yes') }}
        </button>
      </template>
    </modal>
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
          <th>{{ t('athlete') }}</th>
          <th>{{ t('category') }}</th>
          <th>{{ t('registartionFee') }}</th>
          <th>{{ t('registrationAt') }}</th>
          <th></th>
        </tr>
      </template>
      <template v-slot="slotProps">
        <td>{{ slotProps.index + 1 }}</td>
        <td>
          <div class="flex flex-col gap-2">
            <div v-for="item in slotProps.item?.expand?.athletes" :key="item.id" class="flex items-center gap-4">
              <div class="w-8 rounded-full border-base-300 border-solid border-2 contain-content">
                <nuxt-img v-if="item.avatar !== ''"
                          :src="`${baseApiUrl}/api/files/${item.collectionId}/${item.id}/${item.avatar}`"/>
                <nuxt-img v-else :src="`https://api.dicebear.com/9.x/pixel-art/svg?seed=${item?.name}`"/>
              </div>
              <span>{{ item?.name }}</span>
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
          <div class="tooltip tooltip-left" :data-tip="t('deleteRegistration')">
            <button @click="showDeleteConfirmation(slotProps.item.id)" class="btn btn-xs  btn-ghost ">
              <Icon name="material-symbols:delete-outline-sharp" size="1.5em"/>
            </button>
          </div>
        </td>
      </template>
    </data-table>
  </section>
</template>

<style scoped>

</style>