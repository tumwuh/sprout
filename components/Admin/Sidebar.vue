<script setup lang="ts">
import adminNavbarConfig from "~/adminNavbar.config";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const {data} = await useFetch('/api/my-detail')

const route = useRoute();
const userMenu = computed(() => {
  return adminNavbarConfig.filter((item) => item.roles.includes(data.value?.model?.role))
})

</script>

<template>
  <aside test-id="admin-sidebar" class="rounded-xl shadow-lg min-h-[90vh] h-full w-[20vw] bg-gray-50 dark:bg-[#111924]">
    <div class="flex items-center mt-8 pl-6">
      <nuxt-link to="/" class="text-xl font-bold">
        <tumwuh-logo size="lg"></tumwuh-logo>
      </nuxt-link>
    </div>
    <div class="text-sm text-regular px-6 mt-2 ">{{ t('headline') }}</div>
    <div v-if="userMenu.length" class="mt-10">
      <nuxt-link v-for="item in userMenu"
                 :key="item.routeName"
                 :to="item.link"
                 active-class="border-l-4 border-solid dark:border-[#2a3545] border-primary font-bold text-gray-100"
                 class="transition-all flex items-center rounded-tl-sm rounded-bl-sm hover:border-primary px-4 hover:border-solid hover:text-gray-100 hover:border-l-4 dark:border-[#2a3545] hover:dark:border-[#2a3545] pl-4 mb-2">
        <div class="flex gap-4 items-center dark:hover:bg-[#2a3545] hover:bg-primary py-2 w-full pl-2 rounded"
             :class="{'dark:bg-[#2a3545] bg-primary': route.name === item.routeName}">
          <Icon :name="item.icon" size="1.5em"/>
          <span class="hover:font-bold">{{ t(item.title) }}</span>
        </div>
      </nuxt-link>
    </div>
  </aside>
</template>
