<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>
<template>
  <footer class="bg-white dark:bg-base-200">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <nuxt-link to="/" class="flex items-center">
            <tumwuh-logo size="lg" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tumwuh</span>
          </nuxt-link>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{t('contactUs')}}</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <li class="mb-4">
                <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
              </li>
              <li>
                <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{t('legal')}}</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <li class="mb-4">
                <a href="#" class="hover:underline">{{t('privacyPolicy')}}</a>
              </li>
              <li>
                <a href="#" class="hover:underline">{{t('termsAndConditions')}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 PT. Tunas Tumbuh Gemilang.</span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
          <nuxt-link to="https://www.instagram.com/tumwuh" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Icon name="flowbite:instagram-solid" size="1.5em" />
            <span class="sr-only">Instagram</span>
          </nuxt-link>
          <nuxt-link to="https://discord.gg/hbFv33nr" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <Icon name="flowbite:discord-solid" size="1.5em" />
            <span class="sr-only">Discord</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>
