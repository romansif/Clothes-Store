<template>
  <nav class="flex items-center justify-between p-4 md:p-5 lg:p-6">
    <span class="text-4xl font-bold">{{ t("brand.name") }}</span>
    <div class="flex items-center gap-20">
      <ul class="flex gap-10">
        <li v-for="item in LINKS" :key="item.link">
          <router-link
            :to="{ name: item.link }"
            :class="
              route.name === item.link
                ? 'scale-110 border-b-3 border-white text-white'
                : 'text-white/80 hover:scale-110 hover:text-white'
            "
            class="group inline-flex cursor-pointer items-center gap-3 text-lg font-semibold uppercase transition-all duration-500"
          >
            {{ t(item.name) }}
          </router-link>
        </li>
      </ul>
      <LanguageSwitcher class="w-40" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { LanguageSwitcher } from "@/widgets/language-switcher";

const route = useRoute();

const { t } = useI18n();

const LINKS = [
  { link: "about", name: "footer.about" },
  { link: "prices", name: "footer.pricing" },
  { link: "contacts", name: "footer.contacts" },
  { link: "home", name: "nav.home" },
];
</script>
