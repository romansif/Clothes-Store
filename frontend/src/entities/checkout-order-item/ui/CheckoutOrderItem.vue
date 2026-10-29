<template>
    <TransitionGroup name="list">
        <li :key="product?.id" class="flex w-full justify-between gap-3">
            <div class="flex items-center gap-3 text-xs font-medium">
                <router-link :to="{ name: 'product/info', params: { id: getProductId(product) } }">
                    <img
                        :src="checkoutOrderPreview(product?.id, 'ADD')"
                        alt=""
                        class="w-28.25 cursor-pointer"
                    />
                </router-link>
                <div class="mt-3 flex flex-col gap-3">
                    <div class="flex gap-25">
                        <div class="flex w-22 flex-col gap-1">
                            <span class="">{{ product?.title }}</span>
                            <span>{{ product?.category }}</span>
                        </div>
                        <span class="font-dm-sans">$ {{ product?.price }}</span>
                    </div>
                    <span class="text-gray-400"
                        >{{ pureColorsName(product) }} / {{ product?.sizes }}</span
                    >
                    <span class="mt-8">
                        (<span class="font-dm-sans font-medium text-blue-700">{{
                            pureQuantity(product.id, items)?.count
                        }}</span
                        >)
                    </span>
                </div>
            </div>
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/product-helper";
import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { checkoutOrderPreview } from "@/entities/checkout-order-item/lib/checkout-order-preview";
import type { Product } from "@/shared";
import type { OrderItem } from "@/entities/order";

defineProps<{
    product: Product;
    items: OrderItem[];
}>();

const { getProductId } = previewHelper();
const { pureQuantity, pureColorsName } = productHelper();
</script>
