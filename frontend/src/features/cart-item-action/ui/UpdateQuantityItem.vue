<template>
  <div class="flex flex-col border transition duration-400 hover:scale-120">
    <button
      @click="updateCartItemQuantity({ type: 'add', cartItem: props.product })"
      class="cursor-pointer border-b transition duration-400 hover:bg-zinc-300"
    >
      +
    </button>
    <span class="font-dm-sans border-b text-center text-sm">
      {{ props.product.quantity }}
    </span>
    <button
      @click="updateCartItemQuantity({ type: 'remove', cartItem: props.product })"
      class="cursor-pointer border-b transition duration-400 hover:bg-zinc-300"
    >
      -
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUpdateCartItem } from "@/features/cart-item-action/api/update-cart-item";
import type { CartItem } from "@/entities/cart-item";

const props = defineProps<{
  product: CartItem;
  cart: CartItem[];
}>();

const { updateCartItemQuantity } = useUpdateCartItem();
</script>
