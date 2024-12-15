<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {user} = useUserStore()
const {t} = useI18n()
const {$pb, $dayjs} = useNuxtApp()
const {baseApiUrl} = useRuntimeConfig().public
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
const {data: sportType, status} = useAsyncData('sportTypes', async () => $pb.collection('sportTypes').getList(1, 1000))
const scoringType = ref([])

const defaultValue = reactive(props.default as any)
const emit = defineEmits(['submit', 'categoryDelete']);


onMounted(() => {
  if (defaultValue.sportType) {
    updateScoringType('', defaultValue.sportType, {value: defaultValue.sportType})
  }
})

const updateScoringType = async (oldValue: string, newValue: string, el$: any) => {
  await $pb.collection('scoringTypes').getFullList({
    filter: `sportType = '${el$.value}'`,
    skipTotal: true
  }).then((res: any) => {
    scoringType.value = res.map((item: any) => ({label: item.name, value: item.id}))
  })

}
const handleSubmit = (form: any) => {
  emit('submit', form.data);
};

const handleDelete = (index: number) => {
  if (defaultValue.scoring && defaultValue.scoring[index] && "id" in defaultValue.scoring[index]) {
    emit('categoryDelete', defaultValue.scoring[index].id);
    defaultValue.scoring.splice(index, 1);
  }
}

</script>

<template>
  <client-only>
    <vueform :loading="isSubmitting" :endpoint="false" :display-errors="false" @submit="handleSubmit">
      <template #empty>
        <FormSteps>
          <FormStep name="detailTournament"
                    :elements="['managedBy','name', 'sportType', 'logo', 'pamflet', 'description']">
            {{ t('tournamentDetail') }}
          </FormStep>
          <FormStep name="eventDetail"
                    :elements="[
                        'startDate',
                         'endDate',
                         'registrationStartDate',
                         'registrationEndDate',
                         'contactPerson',
                          'contactNumber',
                          'isWaAvailable'
                         ]">
            {{ t('eventDetail') }}
          </FormStep>
          <FormStep name="tournamentCategory" :elements="['categories']">{{ t('tournamentCategory') }}
          </FormStep>
        </FormSteps>

        <FormElements>
          <HiddenElement meta name="managedBy" :default="user.id"/>
          <TextElement
              name="name"
              :default="defaultValue.name"
              :label="t('name')"
              :columns="{
                default: 12,
                sm: 6
              }"
              rules="required|min:3|max:50"
          />
          <SelectElement
              name="sportType"
              id="sportTypeOption"
              :label="t('sportType')"
              :default="defaultValue.sportType"
              rules="required"
              :native="false"
              :items="sportType?.items.map((item: any) => ({label: item.name, value: item.id}))"
              @change="updateScoringType"
              :columns="{
                default: 12,
                sm: 6
              }"
          />

          <FileElement
              :drop="true"
              :upload-temp-endpoint="false"
              rules="max:1024"
              :preview-url="`${baseApiUrl}/api/files/`"
              :default="defaultValue.logo ? `${defaultValue.collectionId}/${defaultValue.id}/${defaultValue.logo}` : null"
              accept=".jpg,.png,.jpeg,svg,.webp"
              name="logo"
              view="image"
              :label="t('logo')"
              :columns="{
          default: 12,
          sm: 6
        }"></FileElement>
          <FileElement
              name="pamflet"
              :preview-url="`${baseApiUrl}/api/files/`"
              :default="defaultValue.logo ? `${defaultValue.collectionId}/${defaultValue.id}/${defaultValue.pamflet}` : null"
              :drop="true"
              :upload-temp-endpoint="false"
              accept=".jpg,.png,.jpeg,pdf,.webp"
              view="image"
              rules="max:1024"
              :label="t('pamflet')"
              :columns="{
          default: 12,
          sm: 6
        }"></FileElement>
          <TEditorElement
              :hide-tools="['attach']"
              rules="required"
              id="sport-description"
              name="description"
              :default="defaultValue.description"
              :label="t('description')"/>
          <DateElement
              name="startDate"
              :default="$dayjs(defaultValue.startDate).format('YYYY-MM-DD')"
              display-format="MMMM DD, YYYY"
              :field-name="t('startDate')"
              :label="t('startDate')"
              rules="required|after:today"
              :columns="{
          default: 12,
          sm: 6
        }"
          ></DateElement>
          <DateElement
              name="endDate"
              :default="$dayjs(defaultValue.endDate).format('YYYY-MM-DD')"
              display-format="MMMM DD, YYYY"
              :field-name="t('endDate')"
              :label="t('endDate')"
              rules="required|after:startDate"
              :columns="{
          default: 12,
          sm: 6
        }"
          ></DateElement>
          <DateElement
              name="registrationStartDate"
              :default="$dayjs(defaultValue.registrationStartDate).format('YYYY-MM-DD')"
              display-format="MMMM DD, YYYY"
              :field-name="t('registrationStartDate')"
              :label="t('registrationStartDate')"
              rules="required|before:startDate"
              :columns="{
          default: 12,
          sm: 6
        }"
          ></DateElement>
          <DateElement
              name="registrationEndDate"
              :default="$dayjs(defaultValue.registrationEndDate).format('YYYY-MM-DD')"
              display-format="MMMM DD, YYYY"
              :field-name="t('registrationEndDate')"
              :label="t('registrationEndDate')"
              rules="required|after:registrationStartDate|before:endDate"
              :columns="{
                default: 12,
                sm: 6
              }"
          ></DateElement>
          <TextElement
              name="contactPerson"
              :label="t('contactPerson')"
              :default="defaultValue.contactPerson"
              rules="required"
              :columns="{
                default: 12,
                sm: 6
              }"
          ></TextElement>
          <PhoneElement
              name="contactNumber"
              :default="defaultValue.contactNumber ?? '62'"
              rules="required"
              :description="t('phoneNumberFormat')"
              :label="t('phoneNumber')"
              unmask
              :columns="{
              default: 12,
              sm: 6
            }"
          />
          <CheckboxElement
              :default="defaultValue.isWaAvailable"
              name="isWaAvailable"
          >
            {{ t('isWaAvailable') }}
          </CheckboxElement>
          <ListElement @remove="handleDelete" :initial="defaultValue.categories?.length ?? 1 "
                       :rules="['required', 'min:1']" name="categories" :field-name="t('tournamentCategory')">
            <template #default="{index}">
              <ObjectElement
                  :name="index"
                  :label="`${t('tournamentCategory')} #${index+1}`">
                <HiddenElement meta name="id" :default="defaultValue.expand.categories[index]?.id ?? null"/>
                <TextElement
                    :rules="['required', 'min:3', 'max:50']"
                    :default="defaultValue.expand.categories[index]?.name ?? ''"
                    name="name"
                    :label="t('name')"
                    :columns="{
                    default: 6,
                  }"
                />
                <SelectElement
                    name="scoring"
                    rules="required"
                    :label="t('scoringType')"
                    :field-name="t('scoringType')"
                    :default="defaultValue.expand.categories[index]?.scoring ?? null"
                    :native="false"
                    :items="scoringType"
                    :columns="{
                      default: 12,
                      sm: 6
                    }"
                />
                <TextElement
                    :rules="['required']"
                    :default="defaultValue.expand.categories[index]?.registrationFee ?? ''"
                    :description="t('leaveZeroIfFree')"
                    input-type="text"
                    :mask="{
                      mask: 'number',
                      thousandsSeparator: '.',
                      decimalSeparator: ',',
                    }"
                    name="registrationFee"
                    unmask
                    :label="t('registrationFee')"
                    :columns="{
                    default: 6,
                  }"
                />

                <CheckboxElement
                    :default="defaultValue.expand.categories[index]?.isIndividual ?? true"
                    name="isIndividual"
                    field-name="isIndividual"
                >
                  {{ t('isIndividual') }}
                </CheckboxElement>

                <TextElement
                    :rules="['required']"
                    :default="defaultValue.expand.categories[index]?.minTeamMember ?? 0"
                    rules="required|min:3|numeric"
                    field-name="minTeamMember"
                    input-type="number"
                    name="minTeamMember"
                    :conditions="[
                        ['categories.*.isIndividual', false]
                    ]"
                    :label="t('minTeamMember')"
                    :columns="{
                    default: 6,
                  }"
                />
                <TextElement
                    :rules="['required']"
                    :default="defaultValue.expand.categories[index]?.maxTeamMember ?? 0"
                    rules="required|gte:categories.*.minTeamMember|numeric"
                    input-type="number"
                    name="maxTeamMember"
                    :conditions="[
                        ['categories.*.isIndividual', false]
                    ]"
                    :label="t('maxTeamMember')"
                    :columns="{
                    default: 6,
                  }"
                />

                <CheckboxElement
                    :default="defaultValue.expand.categories[index]?.isAgeRestriction ?? false"
                    name="isAgeRestriction"
                    field-name="isAgeRestriction"
                >
                  {{ t('isAgeRestriction') }}
                </CheckboxElement>

                <TextElement
                    :rules="['required']"
                    :default="defaultValue.expand.categories[index]?.minAge ?? 0"
                    rules="required|min:3"
                    field-name="minAge"
                    input-type="number"
                    name="minAge"
                    :conditions="[
                        ['categories.*.isAgeRestriction', true]
                    ]"
                    :label="t('minAge')"
                    :columns="{
                    default: 6,
                  }"
                />
                <TextElement
                    :rules="['required']"
                    :default="defaultValue.expand.categories[index]?.maxAge ?? 0"
                    rules="required|gte:categories.*.maxAge"
                    input-type="number"
                    name="maxAge"
                    :conditions="[
                        ['categories.*.isAgeRestriction', true]
                    ]"
                    :label="t('maxAge')"
                    :columns="{
                    default: 6,
                  }"
                />
              </ObjectElement>
            </template>
          </ListElement>
        </FormElements>
        <FormStepsControls></FormStepsControls>
      </template>
    </vueform>
  </client-only>
</template>

<style scoped>

</style>