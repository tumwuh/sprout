<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n()
</script>

<template>
  <div class="overflow-x-auto py-12">
    <div class="bg-white dark:bg-base-200 rounded shadow-md">
      <table class="table">
        <thead>
        <tr>
          <th>
            {{ t('position') }}
          </th>
          <th>{{ t('teamName') }}</th>
          <th>{{ t('gold') }}</th>
          <th>{{ t('silver') }}</th>
          <th>{{ t('bronze') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>
            1
          </th>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"/>
                </div>
              </div>
              <div>
                <div class="font-bold">Nama team 1</div>
              </div>
            </div>
          </td>
          <td>
            1
          </td>
          <td>2</td>
          <th>
            3
          </th>
        </tr>
        <tr>
          <th>
            1
          </th>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"/>
                </div>
              </div>
              <div>
                <div class="font-bold">Nama team 1</div>
              </div>
            </div>
          </td>
          <td>
            1
          </td>
          <td>2</td>
          <th>
            3
          </th>
        </tr>
        <tr>
          <th>
            1
          </th>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"/>
                </div>
              </div>
              <div>
                <div class="font-bold">Nama team 1</div>
              </div>
            </div>
          </td>
          <td>
            1
          </td>
          <td>2</td>
          <th>
            3
          </th>
        </tr>
        <tr>
          <th>
            1
          </th>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"/>
                </div>
              </div>
              <div>
                <div class="font-bold">Nama team 1</div>
              </div>
            </div>
          </td>
          <td>
            1
          </td>
          <td>2</td>
          <th>
            3
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>