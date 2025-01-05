<script setup lang="ts">
import {ref, watch} from 'vue';

const props = defineProps({
  isOpen: Boolean,
  title: String
});

const modalRef = ref<HTMLDialogElement | null>(null);
const emit = defineEmits(['onClose']);

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    openModal();
  } else {
    closeModal();
  }
});

const openModal = () => {
  modalRef.value?.showModal();
};

const closeModal = () => {
  modalRef.value?.close();
};

const handleClose = () => {
  closeModal();
  emit('onClose');
};
</script>

<template>
  <dialog ref="modalRef" class="modal">
    <form method="dialog" class="modal-box">
    <div class="flex justify-between">
      <h3 class="font-bold text-lg mb-4">{{title}}</h3>
      <Icon name="material-symbols:close-rounded" size="1.5em" class="cursor-pointer" @click="handleClose" />
    </div>
      <slot name="content"></slot>
      <div class="modal-action">
       <slot name="action"></slot>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
</style>