<template>
    <div class="flex gap-18 lg:gap-20">
        <div class="flex w-97 flex-col items-center gap-3">
            <img :src="productInfoPreview(product)" alt="" class="w-97" />
        </div>
        <div class="flex flex-col justify-between">
            <div v-for="(img, index) in angelCards(product)" :key="index" class="h-22 w-18">
                <img
                    :src="img"
                    alt=""
                    class="h-22 w-18 cursor-pointer opacity-70 transition duration-400 hover:scale-110"
                    @click="changeImg(product, index)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/product-helper";
import type { Product } from "@/shared";

defineProps<{
    product: Product;
}>();

const { changeImg, productInfoPreview, angelCards } = productHelper();
</script>
