<script setup lang="ts">
import {useInterval} from '@vueuse/core'
import {useI18n} from "vue-i18n";

const {logOut} = useAuth()
const {$pb, $dayjs} = useNuxtApp()
const userStore = useUserStore()
const router = useRouter()
const {data} = await useFetch('/api/my-detail')
const counter = useInterval(1000 * 60 * 15)
const {t} = useI18n()

const {
  data: notification,
  status: notificationStatus,
  refresh: notificationRefresh
} = await useAsyncData('notification', () => $pb.collection('notifications').getList(1, 10, {
  filter: `targetUser = '${userStore.user?.id}' && isDeleted =  false`,
  sort: '-created'
}), {
  server: false,
  lazy: true,
})

watch(counter, () => {
  notificationRefresh()
})

const goToCta = (cta: string | null) => {
  if (!cta || !cta.length) return
  router.push(cta)
}

const setNotificationSeen = async (id: string, isSeen: boolean) => {
  if (!isSeen) {
    await $pb.collection('notifications').update(id, {isSeen: true})
    await notificationRefresh()
  }
}
</script>

<template>
  <nav class="flex flex-grow justify-end items-center">
    <client-only>
      <div test-id="notification-button" class="dropdown">
        <div tabindex="1" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <Icon name="iconoir:bell" size="1.5em"/>
            <span v-if="notification?.items.filter(e => !e.isSeen).length"
                  class="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </div>
        <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-[300px] p-2 shadow right-0">
          <li v-for="item in notification?.items" :key="item.id"
              @mouseenter="setNotificationSeen(item.id, item.isSeen)">
            <div class="flex flex-col" @click="goToCta(item.targetLink)">
              <div class="w-full flex justify-between">
                <span :class="{'font-bold': !item.isSeen}">{{ item.title }}</span><span
                  class="text-xs">{{ $dayjs(item.created).format('DD MMM, YY') }}</span></div>
              <div class="text-left w-full">{{ item.description }}</div>
            </div>
          </li>
          <li v-if="!notification?.items.length">
            <div class="flex flex-col">
              <div>{{ t('noNotification') }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="divider divider-horizontal"></div>
      <div class=" overflow-ellipsis mr-2"><span class="font-semibold">{{ data?.model?.name }}</span></div>
      <div test-id="profile-avatar" v-if="userStore.user" class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 h-10 rounded-full">
            <nuxt-img
                :src="data?.model.avatar !== '' ? data.model.avatar :  `https://api.dicebear.com/9.x/pixel-art/svg?seed=${data?.model.name}`"
                alt="Profile picture"
                class="rounded-full"></nuxt-img>
          </div>
        </div>
        <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li @click="logOut"><a>Logout</a></li>
        </ul>
      </div>
    </client-only>
  </nav>
</template>

<style scoped>

</style>