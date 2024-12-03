<script setup lang="ts">
const {logOut} = useAuth()
const userStore = useUserStore()
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
</template>

<style scoped>

</style>