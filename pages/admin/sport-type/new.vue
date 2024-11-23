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
  middleware: ["is-admin", "only-admin"],
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
});

const handleSubmit = async (formData: any) => {
  isSubmitting.value = true;
  const sportDataForm = {
    name: formData.name,
    description: formData.description.en,
    isActive: true
  }

  const record = await $pb.collection('sportTypes').create(sportDataForm);

  if (record) {
    const scoringTypesRequest = formData.scoringTypes.map((scoringType: any) => $pb.collection('scoringTypes').create({
      name: scoringType.name,
      description: scoringType.description.en,
      sportType: record.id,
      isActive: true
    }, {requestKey: scoringType.name}));
    const scoringTypeResult = await Promise.all(scoringTypesRequest);
    await $pb.collection('sportTypes').update(record.id, {
      scoring: scoringTypeResult.map((scoringType: any) => scoringType.id)
    });

    showToaster(t('successCreateSportType'), 3000, 'success');
    setTimeout(() => {
      isSubmitting.value = false;
      router.push('/admin/sport-type');
    }, 1000);

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
            <nuxt-link to="/admin/sport-type">{{ t('sportTypeTitle') }}</nuxt-link>
          </li>
          <li>{{ t('addSportType') }}</li>
        </ul>
      </div>
      <div class="flex justify-center">
        <div class="content-card w-full max-h-[77vh] overflow-auto">
          <admin-sport-type-form :is-submitting="isSubmitting" :default="{name: '', description: '', scoring: [{
            name: '',
            description: ''
          }]}"
                                 :status="'success'"
                                 @submit="handleSubmit"/>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>