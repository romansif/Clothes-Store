<template>
  <label class="flex flex-col gap-6 w-full">
    <div class="flex gap-1">
      <h2 class="text-lg">Your review</h2>
      <span class="text-red-500">*</span>
    </div>
    <div class="font-semibold flex flex-col gap-4">
      <DescriptionForm v-model="reviewForm.comment" :error-message="reviewFormMessages.comment"
                       :placeholder="'Tell us what you like or didnt like about this product'"/>
    </div>
  </label>
</template>

<script setup lang="ts">
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review.form.ts";

import DescriptionForm from "@/shared/ui/product-form/DescriptionForm.vue";
</script>

<style scoped>

</style>