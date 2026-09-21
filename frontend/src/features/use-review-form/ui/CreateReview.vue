<template>
  <div @click="toggleReviewChoice('')" class="font-montserrat fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
      flex items-center justify-center">
    <form @click.stop class="flex flex-col gap-2 bg-white w-150 h-fit rounded-xl p-5">
      <BaseButton @click="toggleReviewChoice" name="Exit"
                  variant="exitClose" />
      <div class="flex flex-col gap-4 border-b pb-4">
        <h1 class="font-bold text-2xl">
          WRITE A REVIEW
        </h1>
        <span class="text-sm text-[#A3A3A3]">
          Your feedback helps other customers make the right choice
        </span>
      </div>
      <div class="font-semibold flex flex-col gap-5.5 mt-5">
        <AddRating />
        <AddReview />
        <AddPhotos />
      </div>
      <div class="flex justify-end mt-5">
        <BaseButton @click="createReview" name="Create Review"
                    variant="profileForm" />
      </div>
      <input type="file" @change="onFilesSelected" class="hidden"
             :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAddReview } from "@/features/use-review-form/api/add-review.ts";
import { toggleReviewChoice } from "@/features/use-review-form/lib/review-modal.ts";
import { fileInput, productHelper } from "@/shared/lib/helper/product-helper.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
import AddRating from "@/features/use-review-form/ui/AddRating.vue";
import AddReview from "@/features/use-review-form/ui/AddReview.vue";
import AddPhotos from "@/features/use-review-form/ui/AddPhotos.vue";

const { createReview } = useAddReview();
const { onFilesSelected } = productHelper();
</script>

<style scoped>

</style>