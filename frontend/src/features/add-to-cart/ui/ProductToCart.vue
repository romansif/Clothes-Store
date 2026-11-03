<template xmlns="http://www.w3.org/1999/html">
  <div class="mt-4 flex flex-col gap-6">
    <button
        @click="toggleSizeGuide"
        class="w-30 cursor-pointer text-left text-[#A3A3A3] transition duration-400 hover:scale-110"
    >
      What's my size?
    </button>
    <router-link
        v-if="!user.id"
        :to="{ name: 'signIn' }"
        class="font-raleway hidden w-full bg-black py-4 text-center text-sm font-semibold text-white lg:block"
    >
      ADD TO CART
    </router-link>
    <UiButton
        v-if="user.role === 'Buyer' && isInStock(product) !== 0 && !isInCart(cart, product)"
        name="ADD TO CART"
        variant="addToCart"
        @click="addToCart(product)"
    />
    <UiButton
        v-if="isInStock(product) === 0 && user.id"
        name="OUT OF STACK"
        variant="outOfStack"
    />
    <div v-if="user.id && isInCart(cart, product)" class="flex items-center gap-18 h-fit">
      <div
          class="flex gap-6 items-center bg-zinc-800 px-4 py-3.5 text-lg transition duration-300 hover:scale-108 rounded-full"
      >
        <button class="rounded-full bg-zinc-600 px-2 py-1.5 text-white transition duration-300 hover:bg-zinc-400"
                @click="cartItem && updateCartItemQuantity({ type: 'add', cartItem })">
          <img
              :src="plus"
              alt=""
              class="w-20"
          />
        </button>
        <span class="font-dm-sans text-white">{{ cartItem?.quantity }}</span>
        <button class="rounded-full bg-zinc-600 px-2 py-1.5 text-white transition duration-300 hover:bg-zinc-400"
                @click="cartItem && updateCartItemQuantity({ type: 'remove', cartItem })"
                >
          <img
              :src="minus"
              alt=""
              class="w-20"
          />
        </button>
      </div>
      <router-link
          :to="{ name: 'cart' }"
          class="rounded-full transition duration-400 transform cursor-pointer text-center w-full bg-[#722f37]
          text-white font-semibold text-sm py-5 font-[Montserrat] lg:block hover:scale-108 hover:bg-[#5a252c]"
      >
        Go to Cart
      </router-link>
    </div>
  </div>
  <Transition name="modal">
    <SizeGuideModal v-if="sizeGuideModel" :product="product" />
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isInCart } from "@/features/product-info/lib/cart-form-helper";
import { useAddToCart } from "@/features/add-to-cart/api/add-to-cart";
import { useUpdateCartItem } from "@/features/cart-item-action/api/update-cart-item";
import { productsHelper } from "@/features/products/lib/products-helper";
import { sizeGuideModel, toggleSizeGuide } from "@/entities/size-guide/lib/toggle-size-guide";
import { SizeGuideModal } from "@/entities/size-guide";
import { UiButton } from "@/shared/ui/button";
import type { User } from "@/entities/profile";
import type { Product } from "@/shared";
import type { CartItem } from "@/entities/cart-item";

import plus from "@/assets/icons/cart/plus.svg";
import minus from "@/assets/icons/cart/minus.svg";

const props = defineProps<{
  user: User;
  product: Product;
  cart: CartItem[];
}>();

const cartItem = computed(() => isInCart(props.cart, props.product));

const { addToCart } = useAddToCart();
const { isInStock } = productsHelper();

const { updateCartItemQuantity } = useUpdateCartItem();
</script>
