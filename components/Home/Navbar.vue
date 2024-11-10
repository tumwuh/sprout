<template>
  <nav test-id="home-navbar" class="fixed flex justify-center w-screen">
    <div class="navbar bg-base-100 rounded-2xl my-4 max-w-[70vw]">
      <div class="navbar-start">
        <nuxt-link to="/" class="text-xl font-bold">Tumwuh</nuxt-link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <nuxt-link to="/login" class="btn btn-ghost btn-sm">Masuk</nuxt-link>
        <nuxt-link to="/registration" class="btn btn-primary btn-sm">Daftar</nuxt-link>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
</script>