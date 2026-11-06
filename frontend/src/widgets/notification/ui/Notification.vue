<template>
  <div :class="notifyClass" @click.self="closeNotify">
    <div :class="notifyBoxClass">
      <div :class="notifyItemsClass">
        <img v-if="image?.url" :src="image.url" alt="" class="h-10 w-10 shrink-0 object-contain" />
        <div v-if="message" class="flex min-w-0 flex-col gap-1">
          <h2 class="text-lg leading-snug font-medium wrap-break-word">
            {{ t(message?.title) }}
          </h2>
          <p class="text-sm font-normal wrap-break-word text-white/70">
            {{ t(message.text) }}
          </p>
        </div>
      </div>
      <UiButton name="" variant="closeNotify" @click="closeNotify">
        <svg
          viewBox="0 0 24 24"
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useBaseModals } from "@/widgets/notification/lib/use-notify";
import { notifyClass, notifyBoxClass, notifyItemsClass } from "@/widgets/notification/model/notification.variants";
import { UiButton } from "@/shared/ui/button";

const { t } = useI18n();
const { message, image, closeNotify } = useBaseModals();
</script>
