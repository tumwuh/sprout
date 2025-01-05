<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const {logOut} = useAuth()
const userStore = useUserStore()
const router = useRouter()


const goTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div test-id="profile-avatar" v-if="userStore.user" class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <figure>
          <nuxt-img
              :src="userStore.user?.avatar !== '' ? userStore.user.avatar :  `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userStore.user.name}`"
              alt="Profile picture"
              class="rounded-full"></nuxt-img>
        </figure>
      </div>
    </div>
    <ul
        tabindex="0"
        class="menu menu-md dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-56 shadow p-2">
      <li class="cursor-pointer hover:bg-base-300 px-4 py-2 flex flex-row items-center w-full">
        <Icon name="mdi-light:account" size="1.5em"/>
        <span class="hover:bg-transparent">{{ t('profile') }}</span>
      </li>
      <li class="cursor-pointer hover:bg-base-300 px-4 py-2 flex flex-row items-center" @click="goTo('/my/registration')">
        <Icon name="mdi-light:clipboard-text" size="1.5em" />
        <span class="hover:bg-transparent">{{ t('myRegistration') }}</span>
      </li>
      <li class="cursor-pointer hover:bg-base-300 px-4 py-2 flex flex-row items-center" @click="logOut">
        <Icon name="material-symbols-light:logout" size="1.5em"/>
        <span class="hover:bg-transparent">{{ t('logout') }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>