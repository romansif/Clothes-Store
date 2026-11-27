<template>
  <nav class="flex items-center justify-between p-4 md:p-5 lg:p-6">
    <span class="font-bold text-4xl">{{ t("brand.name") }}</span>
    <div class="flex items-center gap-20">
      <ul class="flex gap-10">
        <li v-for="item in LINKS" :key="item.link">
          <router-link :to="{ name: item.link }"
                       :class="route.name === item.link ? 'text-white scale-110 border-b-3 border-white' : 'text-white/80 hover:text-white hover:scale-110'"
                       class="uppercase group inline-flex cursor-pointer items-center gap-3 text-lg font-semibold transition-all duration-500"
          >
            {{ t(item.name) }}
          </router-link>
        </li>
      </ul>
      <LanguageSwitcher />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { LanguageSwitcher } from "@/widgets/navigation";

const route = useRoute()

const { t } = useI18n()

const LINKS = [
  { link: 'about', name: "footer.about" },
  { link: 'prices', name: "footer.pricing"},
  { link: 'contacts', name: "footer.contacts"},
  { link: 'home', name: "nav.home"}
];
</script>
