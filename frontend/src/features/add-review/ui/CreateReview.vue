<template>
    <Loading v-if="isPending" />
    <div
        class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        @click="toggleReviewModal('')"
    >
        <form
            class="flex h-fit w-150 flex-col gap-2 rounded-xl bg-white p-5"
            @click.stop
            @submit.prevent="createReview(user)"
        >
            <UiButton name="Exit" variant="exitClose" @click="toggleReviewModal('')" />
            <div class="flex flex-col gap-2 border-b pb-4">
                <h1 class="text-2xl font-bold">WRITE A REVIEW</h1>
                <span class="text-sm text-[#A3A3A3]">
                    Your feedback helps other customers make the right choice
                </span>
            </div>
            <div class="mt-4 flex flex-col gap-4 font-medium">
                <AddRating :ratings="ratings" @add-rating="addRating" />
                <AddReview />
                <AddPhotos />
            </div>
            <div class="mt-4 flex justify-end">
                <UiButton type="submit" name="Create Review" variant="replaceAndReview" />
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
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { addRating } from "@/features/add-review/lib/add-rating-star";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";
import { useCreateReview } from "@/features/add-review/api/add-review";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { toggleReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { fileInput, productHelper } from "@/shared/lib/product-helper";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { UiButton } from "@/shared/ui/button";
import { AddRating, AddReview, AddPhotos } from "@/entities/review-form";
import { Loading } from "@/widgets/state";

const { user } = useUserData();
const { ratings } = reviewsStore();
const { onFilesSelected } = productHelper();
const { createReview, isPending } = useCreateReview();

refClearErrorsOnChange(reviewForm, reviewFormMessages);
</script>
