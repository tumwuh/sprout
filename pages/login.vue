<script setup lang="ts">
import {useToaster} from "~/composables/useToaster";
import Toaster from "~/components/Toaster.vue";
import {useI18n} from 'vue-i18n'
import {definePageMeta, TUser} from "#imports";
import type {RecordAuthResponse, RecordModel} from "pocketbase";

const {authWithEmailPassword, authenticationPageGuard, user} = useAuth()
const userStore = useUserStore()
const {isVisible, message, showToaster, variant} = useToaster()
const router = useRouter()
const buttonLoading = ref(false)
const {t} = useI18n()


definePageMeta({
  middleware: 'prevent-authentication',
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
})

onMounted(() => {
  authenticationPageGuard()
})
const handleSubmit = async (FormData, form$) => {
  buttonLoading.value = true
  authWithEmailPassword(FormData.data.email, FormData.data.password)
      .then((res: RecordAuthResponse<RecordModel> | null) => {
        if (res) {
          showToaster(t('loginSuccess'), 3000, 'success')
          setTimeout(() => {
            if (['admin', 'organizer'].includes(res.record.role)) {
              router.push('/admin')
              return
            }
            router.push('/')
          }, 1000)
          return;
        }

        showToaster(t('loginError'), 3000, 'error')
        userStore.setUser(res as unknown as TUser)
        return

      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        buttonLoading.value = false
      })
}

</script>

<template>
  <div test-id="login-card" class="flex items-center justify-center h-[80vh]">
    <toaster :is-visible="isVisible" :message="message" :variant="variant"/>
    <div class="bg-base-100 w-96 shadow-xl px-4 py-6 rounded-xl">
      <div class="flex flex-col text-center gap-2 justify-center">
        <h2 class="text-2xl font-bold text-green-700 dark:text-gray-300">{{t('loginFormTitle')}}</h2>
        <h4 class="font-serif font-medium" v-html="t('loginSubtitle')"></h4>
        <client-only>
          <div class="mx-4 mt-6">
            <vueform validate-on="submit" :display-errors="false" @submit="handleSubmit" :endpoint="false">
              <text-element
                  name="email"
                  :placeholder="t('email')"
                  input-type="email"
                  :rules="[
                    'required',
                    'max:50',
                    'email',
                  ]"></text-element>
              <text-element
                  name="password"
                  input-type="password"
                  :placeholder="t('password')"
                  :rules="[
                    'required',
                    'min:8',
                    'max:50',
                  ]"
              ></text-element>
              <button-element
                  name="submit"
                  :submits="true"
                  :button-label="t('loginButton')"
                  :full="true"
                  :loading="buttonLoading"
                  size="lg"
              ></button-element>
            </vueform>
            <div class="flex justify-end mt-2">
              <nuxt-link to="/forget-password" class="text-sm text-green-700 dark:text-gray-300">{{t('forgotPassword')}}
              </nuxt-link>
            </div>
          </div>
        </client-only>

        <div class="mt-4">
          <p>{{t('dontHaveAccount')}}
            <nuxt-link to="/registration" class="text-green-700 dark:text-gray-300">{{t('registerHere')}}</nuxt-link>
          </p>
          <div class="divider">{{t('or')}}</div>
          <p>{{t('makeOrganizerAccount')}}
            <nuxt-link to="/organizer-registration" class="text-green-700 dark:text-gray-300">{{t('registerHere')}}</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>