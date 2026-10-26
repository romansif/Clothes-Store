<template>
  <div class="font-montserrat fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
       flex items-center justify-center"
       @click="toggleReviewModal('')" >
    <form class="flex flex-col gap-2 bg-white w-150 h-fit rounded-xl p-5"
          @click.stop
          @submit.prevent="createReview()">
      <UiButton name="Exit"
                variant="exitClose"
                @click="toggleReviewModal('')" />
      <div class="flex flex-col gap-2 border-b pb-4">
        <h1 class="font-bold text-2xl">
          WRITE A REVIEW
        </h1>
        <span class="text-sm text-[#A3A3A3]">
          Your feedback helps other customers make the right choice
        </span>
      </div>
      <div class="font-medium flex flex-col gap-4 mt-4">
        <AddRating :ratings="ratings"
                   @add-rating="addRating"/>
        <AddReview />
        <AddPhotos />
      </div>
      <div class="flex justify-end mt-4">
        <UiButton type="submit"
                  name="Create Review"
                  variant="replaceAndReview" />
      </div>
      <input type="file" @change="onFilesSelected"
             class="hidden"
             :ref="(el) => { fileInput = el as HTMLInputElement }" multiple accept="image/*">
    </form>
  </div>
</template>

<script setup lang="ts">
import { addRating } from "@/features/add-review-form/lib/add-rating-star";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";
import { useCreateReview } from "@/features/add-review-form/api/add-review";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { toggleReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { fileInput, productHelper } from "@/shared/lib/product-helper";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { UiButton } from "@/shared/ui/button";
import { AddRating, AddReview, AddPhotos } from "@/entities/review-form";

const { ratings } = reviewsStore();
const { createReview } = useCreateReview();
const { onFilesSelected } = productHelper();

refClearErrorsOnChange(
    reviewForm,
    reviewFormMessages
)
</script>