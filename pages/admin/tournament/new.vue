<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useToaster} from "~/composables/useToaster";

const {t} = useI18n()
const {$pb} = useNuxtApp()
const router = useRouter()
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
        <div class="content-card w-full max-h-[77vh] overflow-auto">

        </div>
      </div>
    </section>
  </div>
</template>