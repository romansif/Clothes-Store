<template>
  <div @click="toggleReviewChoice('')" class="font-montserrat fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
      flex items-center justify-center">
    <div @click.stop class="flex flex-col gap-2 bg-white w-175 h-fit rounded-xl p-5">
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
      <div class="font-semibold flex flex-col gap-15 mt-5">
        <div class="flex flex-col">
          <div class="flex gap-1">
            <h2 class="text-lg">Your rating</h2>
            <span class="text-red-500">*</span>
          </div>
          <div class="flex items-center gap-5 mt-5">
            <img v-for="rating in ratings" :key="rating"
                 :src="ratingSrc(rating)" alt=""
                 :class="ratingStar(rating)"
                 @click="addRating(rating)">
            <span class="text-sm text-[#A3A3A3]">Tap to rate (1-5 star)</span>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <div class="flex gap-1">
            <h2 class="text-lg">Your review</h2>
            <span class="text-red-500">*</span>
          </div>
          <DescriptionForm v-model="reviewForm.comment" :error-message="reviewFormMessages.comment"
                           :placeholder="'Tell us what you like or didnt like about this product'"/>
        </div>
      </div>
      <div class="flex justify-end mt-10">
      <BaseButton @click="createReview" name="Create Review"
                  variant="profileForm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddReview } from "@/features/use-order/api/add-review.ts";
import { useOrderModal } from "@/features/use-order/lib/order-modal.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { ordersClasses } from "@/shared/const/order/orders.classes.ts";
import { addRating, ratingSrc } from "@/features/use-order/lib/add-rating-star.ts";
import { reviewForm, reviewFormMessages } from "@/features/use-order/model/order.forms.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
import DescriptionForm from "@/shared/ui/product-form/DescriptionForm.vue";

const { ratings } = orderStore();
const { ratingStar } = ordersClasses();
const { createReview } = useAddReview();
const { toggleReviewChoice } = useOrderModal();
</script>

<style scoped>

</style>