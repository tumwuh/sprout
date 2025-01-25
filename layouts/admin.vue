<template>
  <NuxtLoadingIndicator />
  <div class="flex py-8 px-6 p gap-8 dark:bg-[#2a313a] bg-primary h-screen">
   <admin-sidebar></admin-sidebar>
    <!--    content container here -->
    <div class="w-full">
     <admin-navbar></admin-navbar>
      <div class="mt-8">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
