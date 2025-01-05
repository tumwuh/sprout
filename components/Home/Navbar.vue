<script setup lang="ts">
import {useI18n} from "vue-i18n";

const userStore = useUserStore()
const {t} = useI18n()
const {data, status} = await useFetch('/api/my-detail')
const drawerRef = useTemplateRef('drawer-ref')

const closeDrawer = () => {
  if (drawerRef.value) {
    (drawerRef.value as any).checked = false
  }
}

</script>
<template>
  <client-only>
    <nav test-id="home-navbar" class="fixed hidden md:flex justify-center w-screen z-[100]">
      <div class="navbar bg-base-100 rounded-md m-4 px-6">
        <div class="navbar-start">
          <nuxt-link to="/" class="text-xl font-bold">
            <tumwuh-logo size="lg"></tumwuh-logo>
          </nuxt-link>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li class="light:btn-nav-home mr-2">
              <nuxt-link to="/">{{ t('home') }}</nuxt-link>
            </li>
            <li class="light:btn-nav-home mr-2">
              <nuxt-link to="/tournament">{{ t('tournament') }}</nuxt-link>
            </li>
            <li class="light:btn-nav-home mr-2">
              <nuxt-link to="/">{{ t('contactUs') }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="navbar-end">
          <button test-id="notification-button" v-if="userStore.user" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <div v-if="userStore.user" class="divider lg:divider-horizontal"></div>
          <nuxt-link v-if="!userStore.user" to="/login" class="btn btn-ghost btn-sm mr-2">
            {{ t('loginButton') }}
          </nuxt-link>
          <nuxt-link v-if="!userStore.user" to="/registration" class="btn btn-primary btn-sm">
            {{ t('register') }}
          </nuxt-link>
          <home-user-avatar></home-user-avatar>
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
          <!-- Page content here -->

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
            <!-- Sidebar content here -->
            <li @click="closeDrawer">
              <nuxt-link to="/">{{ t('home') }}</nuxt-link>
            </li>
            <li @click="closeDrawer">
              <nuxt-link to="/tournament">{{ t('tournament') }}</nuxt-link>
            </li>
            <li @click="closeDrawer">
              <nuxt-link to="/">{{ t('contactUs') }}</nuxt-link>
            </li>
            <li v-if="!userStore.user" @click="closeDrawer">
              <nuxt-link to="/login" class="btn btn-ghost btn-sm mr-2">
                {{ t('loginButton') }}
              </nuxt-link>
            </li>
            <li v-if="!userStore.user" @click="closeDrawer">
              <nuxt-link v-if="!userStore.user" to="/registration" class="btn btn-primary btn-sm">
                {{ t('register') }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </client-only>
</template>
