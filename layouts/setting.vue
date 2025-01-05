<script setup lang="ts">
import {useI18n} from "vue-i18n";

const route = useRoute()
const {t} = useI18n()


const pathName = {
  'my-registration': {
    title: t('myRegistration'),
    breadcrumb: [
      {name: t('home'), link: '/'},
      {name: t('myRegistration'), link: null}
    ]
  },
  'my-registration-id-list-participation': {
    title: t('listParticipation'),
    breadcrumb: [
      {name: t('home'), link: '/'},
      {name: t('myRegistration'), link: '/my/registration'},
      {name: t('listParticipation'), link: null}
    ]
  }
}


</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-6">
    <setting-navbar></setting-navbar>
    <section class="col-span-5 h-screen overflow-y-auto bg-green-300 dark:bg-[#2a313a] px-12 pt-[80px]">
      <div>
        <h2 class="block font-bold text-2xl">{{ pathName[route?.name]?.title ?? '' }}</h2>
        <div class="breadcrumbs text-sm">
          <ul>
            <li v-for="item in pathName[route?.name]?.breadcrumb" :key="item.link">
              <nuxt-link v-if="item.link" replace :to="item.link">{{ item.name }}</nuxt-link>
              <span v-else> {{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <slot></slot>
    </section>
  </div>
</template>
