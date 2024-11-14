<script setup lang="ts">
import {useToaster} from "~/composables/useToaster";
import Toaster from "~/components/Toaster.vue";
import {useI18n} from 'vue-i18n'
import {definePageMeta} from "#imports";

const {registerUser, authenticationPageGuard} = useAuth()
const {isVisible, message, showToaster, variant} = useToaster()
const router = useRouter()
const {t} = useI18n()

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
})

onMounted(() => {
  authenticationPageGuard()
})
const handleSubmit = async (FormData, form$) => {
  form$.submitting = true
  registerUser(FormData.data)
      .then((res: any) => {
        if (res.code) {
          showToaster(t('registerError'), 3000, 'error')
          return
        }
        showToaster(t('registerSuccess'), 3000, 'success')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        form$.submitting = false
      })
}
</script>

<template>
  <div test-id="registration-card" class="flex items-center justify-center h-[80vh]">
    <toaster :is-visible="isVisible" :message="message" :variant="variant"/>
    <div class="bg-base-100 w-96 shadow-xl px-4 py-6 rounded-xl">
      <div class="flex flex-col text-center gap-2 justify-center">
        <h2 class="text-2xl font-bold text-green-700 dark:text-gray-300">Pendaftaran Tim</h2>
        <div class="mx-4 mt-6">
          <client-only>
            <Vueform :endpoint="false" validate-on="submit" @submit="handleSubmit" :display-errors="false">
              <hidden-element name="role" value="organizer"></hidden-element>
              <text-element
                  name="name"
                  placeholder="Nama organizer"
                  input-type="text"
                  :rules="[
                    'required',
                    'max:50',
                    'min:5',
                  ]"></text-element>
              <text-element
                  name="email"
                  placeholder="Email"
                  input-type="email"
                  :rules="[
                    'required',
                    'max:50',
                    'email',
                  ]"></text-element>
              <text-element
                  name="password"
                  input-type="password"
                  placeholder="Kata sandi"
                  :rules="[
                    'required',
                    'min:8',
                    'max:50',
                    'same:passwordConfirm',
                  ]"
              ></text-element>
              <text-element
                  name="passwordConfirm"
                  input-type="password"
                  :rules="[
                    'required',
                  ]"
                  placeholder="Ulangi kata sandi"
              ></text-element>
              <button-element
                  name="submit"
                  :submits="true"
                  button-label="Daftar"
                  :full="true"
                  size="lg"
              ></button-element>
            </Vueform>
          </client-only>
        </div>
        <div class="mt-4">
          <p>Sudah punya akun?
            <nuxt-link to="/login" class="text-green-700 dark:text-gray-300">Masuk</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>