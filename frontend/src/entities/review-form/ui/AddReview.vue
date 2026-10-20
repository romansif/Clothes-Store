<template>
  <label class="flex flex-col gap-6 w-full">
    <div class="flex gap-1">
      <h2 class="text-lg">Your review</h2>
      <span class="text-red-500">*</span>
    </div>
    <div class="font-semibold flex flex-col gap-4">
      <UiTextarea v-model="reviewForm.comment"
                  :placeholder="'Tell us what you like or didnt like about this product'"
                  :error-message="reviewFormMessages.comment" />
    </div>
  </label>
</template>

<script setup lang="ts">
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form.ts";

import UiTextarea from "@/shared/ui/product-textarea/UiTextarea.vue";
</script>
