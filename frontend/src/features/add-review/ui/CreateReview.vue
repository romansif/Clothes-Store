<template>
  <Loading v-if="isPending" />
  <div
    class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
    @click="closeReviewModal()"
  >
    <form
      class="flex h-fit w-180 flex-col gap-2 rounded-xl bg-white p-5"
      @click.stop
      @submit.prevent="createReview(user)"
    >
      <UiButton :name="t('common.exit')" variant="exitClose" @click="closeReviewModal()" />
      <div class="flex flex-col gap-2 border-b pb-4">
        <h1 class="text-2xl font-bold">{{ t("reviews.create") }}</h1>
        <span class="text-sm text-[#A3A3A3]">
          {{ t("reviews.writeHint") }}
        </span>
      </div>
      <div class="mt-4 flex flex-col gap-4 font-medium">
        <AddRating :ratings="RATINGS" @add-rating="addRating" />
        <AddReview />
        <AddPhotos />
      </div>
      <div class="mt-4 flex justify-end">
        <UiButton type="submit" :name="t('reviews.create')" variant="replaceAndReview" />
      </div>
      <input
        type="file"
        @change="onFilesSelected"
        class="hidden"
        :ref="
          (el) => {
            fileInput = el as HTMLInputElement;
          }
        "
        multiple
        accept="image/*"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useUserData } from "@/shared/lib";
import { addRating } from "@/features/add-review";
import { reviewsStore } from "@/shared/model";
import { useCreateReview } from "@/features/add-review/api/add-review";
import { refClearErrorsOnChange } from "@/shared/lib";
import { closeReviewModal } from "@/features/add-review";
import { fileInput, productHelper } from "@/shared/lib";
import { reviewForm, reviewFormMessages } from "@/features/add-review";
import { UiButton } from "@/shared/ui/button";
import { AddRating, AddReview, AddPhotos } from "@/features/add-review";
import { Loading } from "@/shared/ui/state";

const { t } = useI18n();
const { user } = useUserData();
const { RATINGS } = reviewsStore();
const { onFilesSelected } = productHelper();
const { createReview, isPending } = useCreateReview();

refClearErrorsOnChange(reviewForm, reviewFormMessages);
</script>
