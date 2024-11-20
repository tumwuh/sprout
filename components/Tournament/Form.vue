<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const props = defineProps({
  isSubmitting: {
    type: Boolean,
    default: false
  },
  default: {
    type: Object,
    default: {}
  }
})

const defaultValue = reactive(props.default as any)
const emit = defineEmits(['submit', 'scoringDelete']);
const handleSubmit = (form: any) => {
  emit('submit', JSON.parse(JSON.stringify(form.data)));
};


</script>

<template>
  <client-only>
    <vueform validate-on="submit" :endpoint="false" :display-errors="false" @submit="handleSubmit">
      <template #empty>

        <form-elements>
          <TextElement
              name="name"
              label="Nama"
              rules="required|min:3|max:50"
          />
          <TEditorElement
              :hide-tools="['attach']"
              id="sport-description"
              name="description"
              :default="defaultValue.description"
              :placeholder="t('description')"/>
        </form-elements>
      </template>
    </vueform>
  </client-only>
</template>

<style scoped>

</style>