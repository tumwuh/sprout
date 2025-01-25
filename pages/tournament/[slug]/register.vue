<script setup lang="ts">
import {useToaster} from "~/composables/useToaster";
import {useI18n} from "vue-i18n";
import {useWindowScroll} from '@vueuse/core'
import type {RecordModel} from "pocketbase";

const {$pb, $dayjs} = useNuxtApp()
const {user} = useUserStore()
const {t} = useI18n()
const {webUrl, baseApiUrl} = useRuntimeConfig().public
const route = useRoute()
const router = useRouter()
const showingErroBag = ref(false)
const selectedCategory = ref('')
const {isVisible, message, showToaster, variant} = useToaster()
const openModal = ref(false)
const isSubmitting = ref(false)


definePageMeta({
  middleware: ['auth-needed'],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});


const {data}: {
  data: any
} = await useAsyncData('tournamentDetail', async () => $pb.collection('tournaments').getFirstListItem(`slug = "${route.params.slug}"`, {
  expand: 'sportType,categories'
}), {
  server: false,
})

selectedCategory.value = route?.query?.category ?? data.value?.expand?.categories[0]?.id

if (!user) {
  await navigateTo({
    path: '/login',
    query: {
      from: route.fullPath
    }
  })
}

const {
  data: athlete,
  refresh: athleteRefresh
} = await useAsyncData('athlete', async () => $pb.collection('athletes' as any).getList(1, 999, {
  filter: `team = "${user!.id}"`,
}), {
  server: true,
})

const {
  data: registration,
  refresh: registrationRefresh
} = await useAsyncData('registration', async () => $pb.collection('tournamentRegistration' as any).getFirstListItem(`team = "${user!.id}" && tournament = "${data.value?.id}"`), {
  server: false,
})


useSeoMeta({
  title: 'Pendaftaran Turnamen',
  description: 'Daftarkan tim mu sekarang',

})


const categoriesWithKey = computed(() => {
  return data.value?.expand?.categories?.reduce((acc: any, item: any) => {
    acc[item.id] = item
    return acc
  }, {})
})

const listAthlete = computed(() => {
  return athlete.value ? athlete.value.items?.map((item: any) => ({
    label: item.name,
    value: item.id
  })) : []
})

const handleCategoryChange = (val: string) => {
  selectedCategory.value = val
}

const handleAddMore = () => {
  openModal.value = false
}

const handleClose = () => {
  openModal.value = false
  router.replace('/my/registration')
}


const handleSubmit = async (form$: any) => {

  const showErrorBagForParticipantList = (message: string) => {
    form$.el$('participantList').messageBag.clear()
    showingErroBag.value = true
    form$.el$('participantList').messageBag.append(message)
    const {y} = useWindowScroll({behavior: "smooth"})
    y.value = 0
    setTimeout(() => {
      showingErroBag.value = false
    }, 3000)
  }
  const categoryThatGotSelected = categoriesWithKey?.value[form$.data.category]

  if (categoryThatGotSelected.isIndividual && form$.data.participantList.length > 1) {
    showErrorBagForParticipantList(t('individualCategoryError'))
    return
  }

  if (!categoryThatGotSelected.isIndividual) {
    if (form$.data.participantList.length < categoryThatGotSelected.minTeamMember || form$.data.participantList.length > categoryThatGotSelected.maxTeamMember) {
      showErrorBagForParticipantList(t('teamCategoryError', {
        min: categoryThatGotSelected.minTeamMember,
        max: categoryThatGotSelected.maxTeamMember
      }))
      return
    }
  }

  try {
    isSubmitting.value = true
    const listAthlete: string[] = []
    const addAthleteList: Promise<RecordModel>[] = []
    const numberOfInvoice = (count: number) => {
      if (count < 10) {
        return `0000${count}`
      } else if (count < 100) {
        return `000${count}`
      } else if (count < 1000) {
        return `00${count}`
      } else if (10000) {
        return `0${count}`
      } else {
        return count
      }
    }
    if (!registration.value) {
      const currentYear = new Date().getFullYear();
      const firstDate = new Date(currentYear, 0, 1);
      const lastDate = new Date(currentYear, 11, 31);

      const participation = await $pb.collection('participants' as any).getList(1, 999, {
        filter: `(created >= "${$dayjs(firstDate).format('YYYY-MM-DD')}" && created <= "${$dayjs(lastDate).format('YYYY-MM-DD')}")`,
      })

      await $pb.collection('tournamentRegistration' as any).create({
        team: user!.id,
        tournament: data.value.id,
        isValid: false,
        contact: form$.data.contact,
        contactNumber: form$.data.contactNumber,
        participantCount: 0,
        totalFee: 0,
        invoiceNumber: `INV${new Date().getFullYear()}${numberOfInvoice(participation.totalItems + 1)}`
      })
      await registrationRefresh()
    }

    // check athlete participant
    form$.data.participantList.forEach((item: any) => {
      if (item.isExistingAthlete && item.athlete) {
        listAthlete.push(item.athlete as string)
      } else {
        item.team = user!.id
        addAthleteList.push($pb.collection('athletes' as any).create(item, {
          requestKey: `${item.name}:${item.dob}`
        }))
      }

    })

    if (addAthleteList.length) {
      const athletes = await Promise.all(addAthleteList)
      athletes.forEach((item) => {
        listAthlete.push(item.id)
      })
    }

    if (listAthlete.length < new Set(listAthlete).size) {
      showErrorBagForParticipantList(t('duplicateAthleteInTeam'))
      await athleteRefresh()
      throw "error"
    }


    await $pb.collection('participants' as any).create({
      team: user!.id,
      category: form$.data.category,
      athletes: listAthlete.sort(),
      tournament: data.value.id,
      registration: registration.value!.id,
    })
        .catch(() => {
          throw "duplicate"
        })


    await $pb.collection('notifications' as any).create({
      title: t('newRegistrantForTournament'),
      targetLink: `/admin/tournament/${data.value.slug}/participants`,
      targetUser: data.value.managedBy,
      isSeen: false,
      isDeleted: false,
      description: t('newRegistrantForTournamentDescription', {
        team: user!.name,
        tournament: data.value.name,
        category: categoryThatGotSelected.name
      }),
    })


    await $pb.collection('tournamentRegistration' as any).update(registration.value!.id, {
      participantCount: registration.value!.participantCount + 1,
      totalFee: registration.value!.totalFee + categoryThatGotSelected.registrationFee
    })


    openModal.value = true
    form$.el$('participantList').clear()
    form$.el$('participantList').add()
    form$.el$('participantList').resetValidators()


  } catch (e) {
    if (e == 'duplicate') {
      showToaster(t('duplicateRegistrant'), 3000, 'error')
    } else {
      showToaster(t('processFailed'), 3000, 'error')
    }
  } finally {
    isSubmitting.value = false
    await registrationRefresh()
  }
};
</script>

<template>
  <section class="pt-[70px] md:pt-[120px] min-h-[80vh] mx-[10vw] pb-[20px]">
    <modal :is-open="openModal" :title="t('registerSuccess')">
      <template #content>
        <p>{{ t('registerSuccessDescription') }}</p>
      </template>
      <template #action>
        <button class="btn" @click="handleClose">{{ t('no') }}</button>
        <button class="btn" @click="handleAddMore">{{ t('yes') }}</button>
      </template>
    </modal>
    <toaster :is-visible="isVisible" :message="message" :variant="variant"/>
    <Head>
      <Title>{{ t('tournamentRegistration') }}</Title>
    </Head>
    <client-only>
      <vueform :endpoint="false" @submit="handleSubmit" validate-on="submit" :display-errors="showingErroBag">
        <StaticElement name="formTitle">
          <h1 class="text-2xl font-bold">{{ t('tournamentRegistration') }}</h1>
        </StaticElement>
        <HiddenElement meta name="team" :default="user.id"/>
        <HiddenElement meta name="athleteCount" :default="athlete.items.length"/>
        <TextElement
            name="contact"
            :default="registration?.contact ?? ''"
            :label="t('contactPerson')"
            :columns="{
                default: 12,
                sm: 6
              }"
            rules="required|min:3|max:50"
        />
        <PhoneElement
            name="contactNumber"
            :default="registration?.contactNumber ?? '62'"
            rules="required"
            :description="t('phoneNumberFormat')"
            :label="t('phoneNumber')"
            unmask
            :columns="{
              default: 12,
              sm: 6
            }"
        />
        <SelectElement
            name="category"
            @change="handleCategoryChange"
            field-name="category"
            :label="t('tournamentCategory')"
            rules="required"
            :native="false"
            :default="route.query.category ?? data.expand.categories[0].id"
            :items="data?.expand?.categories?.map((item: any) => ({label: item.name, value: item.id}))"
            :columns="{
                default: 12,
                sm: 6
              }"
        />
        <StaticElement name="restrictionNotice">
                <span v-if="categoriesWithKey && categoriesWithKey[selectedCategory]?.isAgeRestriction" class="text-sm text-gray-500">*{{
                    t('ageRestrictiveNotification', {
                      min: categoriesWithKey[selectedCategory]?.minAge,
                      max: categoriesWithKey[selectedCategory]?.maxAge
                    })
                  }}</span>
        </StaticElement>
        <StaticElement name="athleteTitle">
          <h1 class="text-2xl font-bold">{{ t('participantList') }}</h1>
          <p v-if="categoriesWithKey && categoriesWithKey[selectedCategory]?.isIndividual">{{ t('individualCategoryInfo') }}</p>
          <p v-else-if="categoriesWithKey">
            {{
              t('teamCategoryInfo', {
                min: categoriesWithKey[selectedCategory]?.minTeamMember,
                max: categoriesWithKey[selectedCategory]?.maxTeamMember
              })
            }}</p>
        </StaticElement>
        <ListElement rules="required|min:1" name="participantList" :field-name="t('participantList')">
          <template #default="{index}">
            <ObjectElement
                :name="index"
                :label="`${t('athleteDetail')} #${index+1}`">
              <CheckboxElement
                  :disabled="athlete.items.length === 0"
                  :default="false"
                  :hidden="athlete.items.length === 0"
                  class="disabled:cursor-not-allowed"
                  name="isExistingAthlete"
              >
                {{ t('useExistingAthlete') }}
              </CheckboxElement>
              <SelectElement name="athlete" :label="t('name')" :native="false"
                             rules="required"
                             :items="listAthlete" :columns="{
                    default: 12,
                    sm: 6
                  }"
                             :conditions="[
                      ['participantList.*.isExistingAthlete', '==', true]
                  ]"
              />
              <FileElement
                  name="athletePicture"
                  :drop="true"
                  :conditions="[
                      ['participantList.*.isExistingAthlete', '==', false]
                  ]"
                  :upload-temp-endpoint="false"
                  accept=".jpg,.png,.jpeg,pdf,.webp"
                  view="image"
                  rules="max:1024"
                  :label="t('athletePicture')"
                  :columns="{
          default: 12,
        }"></FileElement>
              <TextElement
                  :rules="['required', 'min:3', 'max:50']"
                  name="name"
                  :label="t('name')"
                  :conditions="[
                      ['participantList.*.isExistingAthlete', '==', false]
                  ]"
                  :columns="{
                    default: 12,
                    sm: 6
                  }"
              />
              <SelectElement default="pria" name="gender" :label="t('gender')" :native="false" :items="[
  { value: 'pria', label: t('man') },
  { value: 'wanita', label: t('woman') },
]" :columns="{
                    default: 12,
                    sm: 6
                  }"
                             :conditions="[
                      ['participantList.*.isExistingAthlete', '==', false]
                  ]"
              />

              <DateElement
                  name="dob"
                  display-format="MMMM DD, YYYY"
                  :field-name="t('dob')"
                  :label="t('dob')"
                  rules="required|before:today"
                  :conditions="[
                      ['participantList.*.isExistingAthlete', '==', false]
                  ]"
                  :columns="{
          default: 12,
          sm: 6
        }"
              />

            </ObjectElement>
          </template>
        </ListElement>

        <button-element
            name="submit"
            :submits="true"
            :loading="isSubmitting"
            :button-label="t('save')"
            :full="true"
            size="lg"
        ></button-element>
      </vueform>
    </client-only>
  </section>
</template>
