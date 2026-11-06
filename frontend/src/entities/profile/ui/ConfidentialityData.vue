<template>
  <ul v-if="props.user" class="grid grid-cols-2 gap-5 gap-y-10">
    <li class="flex items-center gap-3.5">
      <div class="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F7F1E8]">
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8C6A3F"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      </div>
      <div class="flex min-w-0 flex-col gap-0.5">
        <span class="text-sm font-normal text-[#A3A3A3]">{{ t("profile.role") }}</span>
        <span class="text-lg font-semibold">{{ props.user.role }}</span>
      </div>
    </li>
    <li v-if="props.user.role === 'Seller'" class="flex items-center gap-3.5">
      <div class="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F7F1E8]">
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8C6A3F"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
          <path d="M4 21V5l8-2v18M12 9l8 2v10M3 21h18M8 8h1M8 12h1M8 16h1M16 15h1M16 18h1" />
        </svg>
      </div>
      <div class="flex min-w-0 flex-col gap-0.5">
        <span class="text-sm font-normal text-[#A3A3A3]">{{ t("profile.company") }}</span>
        <span class="text-lg font-semibold">{{ t("brand.name") }}</span>
      </div>
    </li>
    <li class="flex items-center gap-3.5">
      <div class="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F7F1E8]">
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8C6A3F"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </div>
      <div class="flex min-w-0 flex-col gap-0.5">
        <span class="text-sm font-normal text-[#A3A3A3]">{{ t("profile.email") }}</span>
        <span v-if="props.user.email" class="text-lg font-semibold break-all">{{ props.user.email }}</span>
        <span v-else class="text-sm font-medium opacity-50">{{ t("profile.emailNotProvided") }}</span>
      </div>
    </li>
    <li class="flex items-center gap-3.5">
      <div class="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#F7F1E8]">
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8C6A3F"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      </div>
      <div class="flex min-w-0 flex-col gap-0.5">
        <span class="text-sm font-normal text-[#A3A3A3]">{{ t("profile.phone") }}</span>
        <span v-if="props.user.phone" class="text-lg font-semibold">{{ props.user.phone }}</span>
        <span v-else class="text-sm font-medium opacity-50">{{ t("profile.phoneNotProvided") }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { User } from "@/entities/profile";

const props = defineProps<{
  user: User | undefined;
}>();

const { t } = useI18n();
</script>