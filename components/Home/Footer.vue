<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>
<template>
  <footer test-id="home-footer" class="footer bg-base-200 text-base-content p-10 flex justify-between px-[20vw]">
    <aside>
      <tumwuh-logo size="md"></tumwuh-logo>
      <p>
        Tumwuh
        <br/>
        {{ t('headline') }}
        <br/>
        &copy; 2022 PT.Tunas Tumbuh Gemilang
      </p>
    </aside>
    <nav>
      <h6 class="footer-title">{{ t('legal') }}</h6>
      <a class="link link-hover">{{ t('termsAndConditions') }}</a>
      <a class="link link-hover">{{ t('privacyPolicy') }}</a>
      <a class="link link-hover">{{ t('cookiePolicy') }}</a>
    </nav>
  </footer>
</template>
