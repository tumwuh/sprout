<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useToaster} from "~/composables/useToaster";
import slugify from "slugify";
import {faker} from "@faker-js/faker";

const {t} = useI18n()
const {$pb} = useNuxtApp()
const router = useRouter()
const defaultValue = {
  name: '',
  logo: null,
  pamflet: null,
  description: '',
  startDate: '',
  endDate: '',
  registrationStartDate: '',
  registrationEndDate: '',
  contactPerson: '',
  contactNumber: '',
  isWaAvailable: false,
  expand: {
    categories: [
      {
        name: '',
        description: '',
        registrationFee: 0,
        isIndividual: true,
        minTeamMember: 0,
        maxTeamMember: 0,
        isAgeRestriction: false,
        minAge: 0,
        maxAge: 0,
        id: null
      }
    ],
  },
  managedBy: ''
}
const {isVisible, message, showToaster, variant} = useToaster()
const isSubmitting = ref(false)
definePageMeta({
  layout: "admin",
  middleware: ["is-admin", "only-organizer"],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});

const handleSubmit = async (form: any) => {
  isSubmitting.value = true
  try {
    const tournamentFormData = new FormData()
    let tournamentCategories = []
    for (const key in form) {
      if (key === 'categories') {
        tournamentCategories = form[key]
      } else if (key === 'description') {
        tournamentFormData.append(key, form[key].en)
      } else {
        tournamentFormData.append(key, form[key])
      }
    }

    let slug = slugify(form.name, {lower: true})
    const isSlugExist = await $pb.collection('tournaments').getFirstListItem(`slug = "${slug}"`)
        .catch(() => {
          return null
        })

    if (isSlugExist) {
      slug = `${slug}-${faker.string.alpha(5)}`
    }

    tournamentFormData.append('slug', slug)
    tournamentFormData.append('status', 'draft')

    const tournament = await $pb.collection('tournaments').create(tournamentFormData)

    const categories = await Promise.all(tournamentCategories.map((category: any) => $pb.collection('tournamentCategories').create({
      ...category,
      tournament: tournament.id
    }, {requestKey: category.name})))

    await $pb.collection('tournaments').update(tournament.id, {categories: categories.map((category: any) => category.id)}, {requestKey: tournament.id})

    showToaster(t('successCreateTournament'), 3000, 'success')
    await router.push('/admin/tournament')

  } catch (e) {
    showToaster(t('failedCreateTournament'), 3000, 'error')
  } finally {
    isSubmitting.value = false
  }

}
</script>

<template>
  <div>
    <toaster :is-visible="isVisible" :message="message" :variant="variant"/>
    <section>
      <h1 class="text-3xl font-semibold">{{ t('addSportType') }}</h1>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard">{{ t('dashboard') }}</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/tournament">{{ t('tournamentTitle') }}</nuxt-link>
          </li>
          <li>{{ t('tournamentForm') }}</li>
        </ul>
      </div>
      <div class="flex justify-center">
        <div class="content-card w-full h-[77vh] overflow-auto">
          <tournament-form :is-submitting="isSubmitting" @submit="handleSubmit" :default="defaultValue"/>
        </div>
      </div>
    </section>
  </div>
</template>