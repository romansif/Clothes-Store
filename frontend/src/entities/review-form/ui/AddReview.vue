<template>
    <label class="flex w-full flex-col gap-6">
        <div class="flex gap-1">
            <h2 class="text-lg">Your review</h2>
            <span class="text-red-500">*</span>
        </div>
        <div class="flex flex-col gap-4 font-semibold">
            <UiProductTextarea
                v-model="reviewForm.comment"
                :placeholder="'Tell us what you like or didnt like about this product'"
                :error-message="reviewFormMessages.comment"
            />
        </div>
    </label>
</template>

<script setup lang="ts">
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";

import { UiProductTextarea } from "@/shared/ui/product-textarea";
</script>
