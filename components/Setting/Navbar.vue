<script setup lang="ts">
import {useI18n} from "vue-i18n";

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const {logOut} = useAuth()


type SettingListItem = {
  label: string;
  icon: string;
  link: string;
  role?: 'organizer' | 'team' | 'admin';
}
const {t} = useI18n()
const routerList: SettingListItem[] = [
  {
    label: t('profile'),
    icon: "ant-design:user-outlined",
    link: "/my/profile"
  },
  {
    label: t('account'),
    icon: "ant-design:bank-filled",
    link: "/my/account"
  },
  {
    label: t('notification'),
    icon: "ant-design:bell-filled",
    link: "/my/notification"
  }
]

const specificRouterLink: SettingListItem[] = [
  {
    label: t('myRegistration'),
    icon: "ant-design:calendar-filled",
    link: "/my/registration",
    role: 'team'
  },
  {
    label: t('myTeam'),
    icon: "mingcute:group-3-fill",
    link: "/my/team",
    role: 'team'
  }
]

const goTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <nav class="hidden md:block bg-white dark:bg-base-300 min-h-[100vh] col-span-1 px-4 relative">
    <div class="flex items-center mt-4 mb-8">

      <nuxt-link to="/" class="text-xl font-bold">
        <tumwuh-logo size="lg"></tumwuh-logo>
      </nuxt-link>
    </div>
    <div class="font-semibold text-gray-400 text-sm dark:text-gray-200">{{ t('general') }}</div>
    <ul class="menu">
      <li v-for="item in routerList" :key="item.link"
          class="flex flex-row items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-base-100 cursor-pointer px-4 py-2 rounded font-medium"
          :class="{'bg-primary text-white dark:bg-base-100 ': route.path === item.link}"
          @click="goTo(item.link)"
      >
        <Icon :name="item.icon" size="2em" class="hover:bg-black dark:hover:bg-gray-400 dark:bg-gray-400"/>
        {{ item.label }}
      </li>
    </ul>

    <div class="font-semibold text-gray-400 text-sm dark:text-gray-200">{{ t('specificSetting') }}</div>
    <ul class="menu">
      <li v-for="item in specificRouterLink" :key="item.link"
          class="flex flex-row items-center gap-2 cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-base-100 px-4 py-2 rounded font-medium"
          :class="{hidden: item.role !== userStore.user?.role, 'bg-primary text-white dark:bg-base-100': route.path === item.link}"
          @click="goTo(item.link)"
      >
        <Icon :name="item.icon" size="2em" class="hover:bg-black dark:hover:bg-gray-400 dark:bg-gray-400"/>
        {{ item.label }}
      </li>
    </ul>
    <div class="absolute bottom-4 flex-row flex justify-between items-center left-0 right-0">
      <div class="flex flex-row gap-2">
        <figure class="rounded-full">
          <nuxt-img
              :src="userStore.user?.avatar !== '' ? userStore.user?.avatar :  `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userStore.user.name}`"
              alt="Profile picture"
              width="50"
              height="50"
              class="rounded-full"></nuxt-img>
        </figure>
        <div class="flex flex-col">
          <span class="font-bold text-gray-800 dark:text-gray-100 text-md ellipsis">{{ userStore.user.name }}</span>
          <span class="font-medium text-gray-500 text-sm ellipsis">{{ userStore.user.email }}</span>

        </div>
      </div>
      <div class="tooltip flex justify-center" @click="logOut" :data-tip="t('logout')">
        <Icon name="material-symbols:logout-rounded" size="2em" class="cursor-pointer mr-2"/>
      </div>
    </div>
  </nav>
  <nav class="fixed flex md:hidden w-screen p-2 z-[100]">
    <div class="drawer">
      <input ref="drawer-ref" id="main-navbar" type="checkbox" class="drawer-toggle"/>
      <div class="drawer-content flex justify-between bg-white dark:bg-base-200">
        <div class="flex items-center gap-2">
          <tumwuh-logo size="md"></tumwuh-logo>
          <nuxt-link to="/" class="text-lg font-bold">Tumwuh</nuxt-link>
        </div>

        <div>
          <home-user-avatar></home-user-avatar>
          <label for="main-navbar" class="btn btn-ghost drawer-button">
            <Icon name="mdi-light:menu" size="2em"/>
          </label>
        </div>
      </div>
      <div class="drawer-side">
        <label for="main-navbar" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li class="font-semibold text-gray-400 text-sm dark:text-gray-200">{{ t('general') }}</li>
          <li v-for="item in routerList" :key="item.link"
              class="flex flex-row items-center gap-2 hover:bg-primary hover:text-white dark:hover:bg-base-100 cursor-pointer px-4 py-2 rounded font-medium"
              :class="{'bg-primary text-white dark:bg-base-100 ': route.path === item.link}"
              @click="goTo(item.link)"
          >
            <Icon :name="item.icon" size="2em" class="hover:bg-black dark:hover:bg-gray-400 dark:bg-gray-400"/>
            {{ item.label }}
          </li>
          <li class="font-semibold text-gray-400 text-sm dark:text-gray-200">{{ t('specificSetting') }}</li>
          <li v-for="item in specificRouterLink" :key="item.link"
              class="flex flex-row items-center gap-2 cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-base-100 px-4 py-2 rounded font-medium"
              :class="{hidden: item.role !== userStore.user?.role, 'bg-primary text-white dark:bg-base-100': route.path === item.link}"
              @click="goTo(item.link)"
          >
            <Icon :name="item.icon" size="2em" class="hover:bg-black dark:hover:bg-gray-400 dark:bg-gray-400"/>
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.ellipsis {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>