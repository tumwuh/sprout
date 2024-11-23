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

const handleDelete = (index: number) => {
  if (defaultValue.scoring && defaultValue.scoring[index] && "id" in defaultValue.scoring[index]){
    emit('scoringDelete', defaultValue.scoring[index].id);
    defaultValue.scoring.splice(index, 1);
 }
}

</script>

<template>
  <client-only>
    <vueform validate-on="submit" :endpoint="false" :display-errors="false" @submit="handleSubmit">
      <StaticElement
          name="formTitle"
          :content="t('sportTypeForm')"
          tag="h1"
      />
      <StaticElement
          name="divider"
          tag="hr"
      />
      <TextElement
          name="name"
          id="sport-name"
          :default="defaultValue.name"
          :placeholder="t('name')"
          input-type="text"
          :rules="[
                    'required',
                    'min:3',
                    'max:50',
                  ]"/>
      <TEditorElement
          :hide-tools="['attach']"
          id="sport-description"
          name="description"
          :default="defaultValue.description"
          :placeholder="t('description')"/>

      <StaticElement
          name="formTitle"
          :content="t('scoringTypeTitleForm')"
          tag="h1"
      />
      <StaticElement
          name="divider"
          tag="hr"
      />

      <ListElement @remove="handleDelete" :initial="defaultValue.scoring.length" :rules="['required', 'min:1']" name="scoringTypes" :field-name="t('scoringType')">
        <template #default="{index}">
          <ObjectElement
              :name="index"
              :label="`${t('scoringType')} #${index+1}`">
            <HiddenElement name="id" :default="defaultValue.scoring[index]?.id" />
            <TextElement
                :rules="['required', 'min:3', 'max:50']"
                :default="defaultValue.scoring[index]?.name ?? ''"
                name="name"
                :placeholder="t('name')"
            />
            <TEditorElement
                :id="`scoring-description-${index}`"
                :hide-tools="['attach']"
                name="description"
                :default="defaultValue.scoring[index]?.description ?? ''"
                :placeholder="t('description')"/>
          </ObjectElement>
        </template>
      </ListElement>
      <ButtonElement :loading="isSubmitting" :submits="true" align="center" name="button" button-type="submit">
        {{ t('save') }}
      </ButtonElement>
    </vueform>
  </client-only>
</template>

<style scoped>

</style>