<template>
    <img
        :src="product.checked ? check_square : square"
        alt=""
        @click="addToOrder({ product: props.product, orderItems })"
        class="w-7.5 cursor-pointer transition duration-400 hover:scale-120"
    />
</template>

<script setup lang="ts">
import { useAddToOrder } from "@/features/cart-item-action/api/add-to-order";
import { orderStore } from "@/shared/model/order.store";
import type { Product } from "@/shared";
import type { CartItem } from "@/entities/cart-item";

import check_square from "@/assets/icons/squares/check-square.png";
import square from "@/assets/icons/squares/square.png";

const props = defineProps<{
    product: Product;
    cart: CartItem[];
}>();

const { orderItems } = orderStore();
const { addToOrder } = useAddToOrder();
</script>
