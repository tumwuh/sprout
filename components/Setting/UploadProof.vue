<script setup lang="ts">
import {useI18n} from "vue-i18n";
import useModalFunction from "~/composables/useModalFunction";

const {$pb} = useNuxtApp()

const props = defineProps({
  registrationId: {
    type: String,
    required: true
  },

})
const {showModal: showUploadProof, openModal: openUploadProof, closeModal: closeUploadProof} = useModalFunction()
const isSubmitting = ref(false)
const {t} = useI18n()

const handleSubmit = async (form$: any) => {
  isSubmitting.value = true
  await $pb.collection('tournamentRegistration').update(props.registrationId, {
    paymentProof: form$.data.paymentProof
  })
  isSubmitting.value = false
  closeUploadProof()
}
</script>

<template>
  <modal :isOpen="showUploadProof" :title="t('uploadProof')" @on-close="closeUploadProof">
    <template #content>
      <vueform :endpoint="false" @submit="handleSubmit" validate-on="submit" :display-errors="false">
        <FileElement
            name="paymentProof"
            :drop="true"
            :upload-temp-endpoint="false"
            accept=".jpg,.png,.jpeg,pdf,.webp"
            view="image"
            rules="max:1024"
            :columns="{
          default: 12,
        }"></FileElement>
        <ButtonElement
            name="submit"
            :submits="true"
            :loading="isSubmitting"
            :button-label="t('save')"
            :full="true"
            size="lg"
        ></ButtonElement>
      </vueform>
    </template>
  </modal>
  <div class="tooltip tooltip-left" :data-tip="t('uploadProof')">
    <button @click="openUploadProof" class="btn btn-xs btn-ghost">
      <Icon name="tabler:file-upload" size="1.5em"/>
    </button>
  </div>
</template>

<style scoped>

</style>