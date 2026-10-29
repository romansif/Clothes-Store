<template>
    <div class="mt-3.5 flex flex-col gap-7">
        <div class="flex flex-col gap-3">
            <span class="font-medium text-[#A3A3A3]"> Colors </span>
            <div class="flex items-center justify-start lg:gap-5">
                <div
                    v-for="color in pureInfoColors(product)"
                    :key="color.hex"
                    :style="{ background: color.hex }"
                    :title="color.hex"
                    :class="selectedColorClass(color, product, user.role)"
                    @click="emit('addColor', color, user, product)"
                ></div>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <span class="font-medium text-[#A3A3A3]"> Sizes </span>
            <div class="flex items-center justify-start lg:gap-5">
                <img
                    v-for="size in isAvailableSizes(product)"
                    :key="size.name"
                    :src="size.url"
                    alt=""
                    :class="selectedSizesClass(size, product, user.role)"
                    @click="emit('addSize', size, user, product)"
                />
            </div>
            <div class="flex items-center gap-1">
                <span v-if="addToCartFormErrorMessages.colors" class="text-xs text-red-600">
                    {{ addToCartFormErrorMessages.colors }}
                </span>
                <span
                    v-if="addToCartFormErrorMessages.colors && addToCartFormErrorMessages.sizes"
                    class="text-xs text-red-600"
                    >/</span
                >
                <span v-if="addToCartFormErrorMessages.sizes" class="text-xs text-red-600">
                    {{ addToCartFormErrorMessages.sizes }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/product-helper";
import { addToCartVariants } from "@/entities/product-info/model/add-to-cart.variants";
import { addToCartFormErrorMessages } from "@/entities/product-info/model/add-to-cart-form";
import type { User } from "@/entities/profile";
import type { ColorItem, Product, Size } from "@/shared";

defineProps<{
    user: User;
    product: Product;
}>();

const emit = defineEmits<{
    addColor: [color: ColorItem, user: User, product: Product];
    addSize: [size: Size, user: User, product: Product];
}>();

const { pureInfoColors, isAvailableSizes } = productHelper();
const { selectedColorClass, selectedSizesClass } = addToCartVariants();
</script>
