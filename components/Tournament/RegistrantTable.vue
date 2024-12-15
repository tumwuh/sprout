<script setup lang="ts">

</script>

<template>
  <div>
    <div class="flex justify-between">
      <div class="flex items-center">
        <nuxt-img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=example"
                  alt="Profile picture"
                  class="rounded-full h-[40px] w-[40px] mr-2"></nuxt-img>
        <span class="font-semibold text-lg">Nama Tim</span>
      </div>
      <div>
        <div class="avatar-group -space-x-6 rtl:space-x-reverse">
          <div data-tip="Nama Atlet" class="avatar tooltip">
            <div class="w-12">
              <nuxt-img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div data-tip="Nama Atlet" class="avatar tooltip">
            <div class="w-12">
              <nuxt-img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div data-tip="Nama Atlet" class="avatar tooltip">
            <div class="w-12">
              <nuxt-img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content w-12">
              <span>+99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>