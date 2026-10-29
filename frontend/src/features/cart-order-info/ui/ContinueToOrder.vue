<template>
    <div class="mt-2 flex flex-col xl:block">
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-4">
                <img
                    @click="toggleAgree"
                    :src="isAgreeFormError.agree ? check_square : square"
                    alt=""
                    class="w-6.25 cursor-pointer"
                />
                <span class="text-xs text-[#A3A3A3]"> I agree to the Terms and Conditions </span>
            </div>
            <span class="text-xs text-red-600">{{ isAgreeFormErrorMessage.agree }}</span>
        </div>
        <UiButton @click="continueToOrder" name="CONTINUE" variant="addToOrder" />
    </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useCartOrderInfo } from "@/features/cart-item-action/model/cart-order-info";
import {
    isAgreeFormError,
    isAgreeFormErrorMessage,
} from "@/entities/product-info/model/add-to-cart-form";
import { UiButton } from "@/shared/ui/button";

import check_square from "@/assets/icons/squares/check-square.png";
import square from "@/assets/icons/squares/square.png";

const { toggleAgree, continueToOrder } = useCartOrderInfo();

watch(
    () => isAgreeFormError.value.agree,
    (agreeError) => {
        if (agreeError) {
            isAgreeFormErrorMessage.value.agree = "";
        }
    },
);
</script>
