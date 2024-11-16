<script setup lang="ts">
const {user} = useAuth()
const userStore = useUserStore()
const logOut = () => {
  user.clear()
}


</script>
<template>
  <nav test-id="home-navbar" class="fixed flex justify-center w-screen">
    <div class="navbar bg-base-100 rounded-2xl my-4 max-w-[70vw] px-6">
      <div class="navbar-start">
        <tumwuh-logo size="md"></tumwuh-logo>
        <nuxt-link to="/" class="text-xl font-bold">Tumwuh</nuxt-link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li class="light:btn-nav-home">
            <nuxt-link to="/">Halaman Utama</nuxt-link>
          </li>
          <li class="light:btn-nav-home">
            <nuxt-link to="/tournament">Turnamen</nuxt-link>
          </li>
          <li class="light:btn-nav-home">
            <nuxt-link to="/">Hubungi Kami</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <nuxt-link v-if="!userStore.user" to="/login" class="btn btn-ghost btn-sm mr-2">Masuk</nuxt-link>
        <nuxt-link v-if="!userStore.user" to="/registration" class="btn btn-primary btn-sm">Daftar</nuxt-link>
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
        <div test-id="profile-avatar" v-if="userStore.user" class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <nuxt-img
                  :src="userStore.user.avatar !== '' ? user.model.avatar :  `https://api.dicebear.com/9.x/pixel-art/svg?seed=${userStore.user.name}`"
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
      </div>
    </div>
  </nav>
</template>
