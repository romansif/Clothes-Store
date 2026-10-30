<template>
    <div class="flex flex-col gap-15">
        <div class="flex flex-col gap-4">
            <DeleteCartItemButton :product="product" />
            <AddToOrder :product="product" :cart="cart" />
        </div>
        <div class="flex flex-col gap-4">
            <img :src="sizeUrl(product.sizes)" :class="[sizeClass(product.sizes)]" alt="" />
            <div
                class="h-7.5 w-7.5"
                :title="pureColors(product.id, cart)?.hex"
                :style="{ background: pureColors(product.id, cart)?.hex || 'transparent' }"
            ></div>
            <UpdateQuantityItem :product="product" :cart="cart" />
            <img
                :src="reload"
                alt=""
                class="cursor-pointer transition duration-400 hover:scale-120"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/product-helper";
import { sizeClass, sizeUrl } from "@/entities/cart-item/lib/cart-specific";
import { AddToOrder, DeleteCartItemButton, UpdateQuantityItem } from "@/features/cart-item-action";
import type { Product } from "@/shared";
import type { CartItem } from "@/entities/cart-item";

import reload from "@/assets/icons/app/reload.svg";

defineProps<{
    product: Product;
    cart: CartItem[];
}>();

const { pureColors } = productHelper();
</script>
