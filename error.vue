<script setup lang="ts">
const error = useError()
const router = useRouter()
</script>

<template>
  <div class="grid h-screen place-content-center bg-white px-4">
    <div class="text-center">
      <h1 class="text-9xl font-black text-gray-200">{{error?.statusCode}}</h1>

      <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{error?.statusMessage}}</p>

      <p class="mt-4 text-gray-500">{{error?.message}}</p>

      <button
        @click="router.back()"
          class="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
      >
        Go Back Home
      </button>
    </div>
  </div>
</template>
