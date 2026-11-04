<template>
  <label class="flex w-full flex-col gap-6">
    <div class="flex gap-1">
      <h2 class="text-lg">{{ t("reviews.yourReview") }}</h2>
      <span class="text-red-500">*</span>
    </div>
    <div class="flex flex-col gap-4 font-semibold">
      <UiProductTextarea v-model="reviewForm.comment" :placeholder="t('reviews.reviewPh')" :error-message="reviewFormMessages.comment" />
    </div>
  </label>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { UiProductTextarea } from "@/shared/ui/product-textarea";

const { t } = useI18n();
</script>
