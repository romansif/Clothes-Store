<template>
    <div class="flex flex-col border transition duration-400 hover:scale-120">
        <button
            @click="updateCartItemQuantity({ type: 'add', cartItem: product })"
            class="cursor-pointer border-b transition duration-400 hover:bg-zinc-300"
        >
            +
        </button>
        <span class="font-dm-sans border-b text-center text-sm">
            {{ pureQuantity(product.id, cart)?.count }}
        </span>
        <button
            @click="updateCartItemQuantity({ type: 'remove', cartItem: product })"
            class="cursor-pointer border-b transition duration-400 hover:bg-zinc-300"
        >
            -
        </button>
    </div>
</template>

<script setup lang="ts">
import { useUpdateCartItem } from "@/features/cart-item-action/api/update-cart-item";
import { productHelper } from "@/shared/lib/product-helper";
import type { Product } from "@/shared";
import type { CartItem } from "@/entities/cart-item";

defineProps<{
    product: Product;
    cart: CartItem[];
}>();

const { pureQuantity } = productHelper();
const { updateCartItemQuantity } = useUpdateCartItem();
</script>
