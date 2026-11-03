<template>
  <div class="fixed right-0 bottom-0 z-50 flex justify-center"
       @click.self="closeNotify">
    <div class="relative h-fit w-full max-w-md overflow-hidden bg-black text-white shadow-2xl">
      <div class="flex items-start gap-4 p-5 pr-12">
        <img v-if="image?.url" :src="image.url" alt=""
            class="h-10 w-10 shrink-0 object-contain"/>
        <div class="flex min-w-0 flex-col gap-1">
          <h2 class="text-lg leading-snug font-medium wrap-break-word">
            {{ message?.title }}
          </h2>
          <p v-if="message?.text" class="text-sm font-normal text-white/70 wrap-break-word">
            {{ message.text }}
          </p>
        </div>
      </div>
      <button type="button" class="absolute top-3 right-3 flex h-7 w-7 cursor-pointer items-center justify-center text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              @click="closeNotify">
        <svg viewBox="0 0 24 24"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/widgets/notification/lib/use-notify";

const { message, image, closeNotify } = useBaseModals();
</script>

<style scoped>
@keyframes notify-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.notify-progress {
  animation-name: notify-progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@media (prefers-reduced-motion: reduce) {
  .notify-progress {
    animation: none;
    width: 100%;
  }
}
</style>