<template>
  <template v-if="user">
    <div class="mt-4 flex w-full flex-col gap-4">
      <div class="flex gap-2">
        <span>{{ t("profile.role") }}</span>
        <span>{{ user.role }}</span>
      </div>
      <div v-if="user.role === 'Seller'" class="flex gap-2">
        <span>{{ t("profile.company") }}</span>
        <span>{{ t("brand.name") }}</span>
      </div>
      <div v-if="user.role === 'Buyer'" class="flex gap-2">
        <div v-if="user.phone" class="flex gap-2">
          <span>{{ t("profile.phone") }}</span>
          <span>{{ user.phone }}</span>
        </div>
        <span v-else class="text-sm font-medium opacity-50">{{ t("profile.phoneNotProvided") }}</span>
      </div>
    </div>
    <div class="mt-4 flex w-full flex-col gap-4">
      <div v-if="user.role === 'Seller'" class="flex gap-2">
        <div v-if="user.phone" class="flex gap-2">
          <span>{{ t("profile.phone") }}</span>
          <span>{{ user.phone }}</span>
        </div>
        <span v-else class="text-sm font-medium opacity-50">{{ t("profile.phoneNotProvided") }}</span>
      </div>
      <div v-if="user.email" class="flex gap-2">
        <span>{{ t("profile.email") }}</span>
        <span>{{ user.email }}</span>
      </div>
      <span v-else class="text-sm font-medium opacity-50">{{ t("profile.emailNotProvided") }}</span>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { User } from "@/entities/profile";

defineProps<{
  user: User | undefined;
}>();

const { t } = useI18n();
</script>
