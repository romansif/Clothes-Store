<template>
    <div
        v-if="product"
        class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        @click="toggleStackInfo"
    >
        <div @click.stop class="flex flex-col gap-8 rounded-xl bg-white p-5">
            <div class="flex items-center">
                <h1 class="text-2xl font-medium">Quantity of each item</h1>
                <img
                    @click="toggleStackInfo"
                    :src="close"
                    alt=""
                    class="ml-auto w-6.5 cursor-pointer"
                />
            </div>
            <div class="grid grid-cols-6 gap-3">
                <div
                    v-for="variant in product.variants"
                    :key="variant.hex + variant.size"
                    class="flex cursor-default items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-4 transition-all duration-400 hover:scale-105 hover:shadow-md"
                >
                    <span
                        class="h-6 w-6 rounded-full border-2 border-gray-200 shadow-sm"
                        :style="{ backgroundColor: variant.hex }"
                    ></span>
                    <span class="text-center text-xs leading-tight font-bold">{{
                        variant.colorName
                    }}</span>
                    <span class="text-xs leading-tight font-bold">{{ variant.size }}</span>
                    <span class="text-xs leading-tight font-bold">{{ variant.count }} pcs.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toggleStackInfo } from "@/entities/my-product-item/lib/toggle-stack-info";
import type { Product } from "@/shared";

import close from "@/assets/icons/delete-close/delete.svg";

defineProps<{
    product: Product;
}>();
</script>
