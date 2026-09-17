<template>
  <div class="flex flex-col gap-6 mt-4">
    <button @click="toggleSizeGuide" class="text-[#A3A3A3] text-left transition duration-400 cursor-pointer hover:scale-105">
      What's my size?
    </button>
    <router-link v-if="!user.id" :to="{name: 'signIn'}">
          <span class="hidden bg-black text-white font-semibold text-sm py-4 w-full text-center
              font-raleway lg:block">
            ADD TO CART
          </span>
    </router-link>
    <BaseButton v-if="user.role === 'Buyer' && isInStock() !== 0 && !isInCart" name="ADD TO CART"
                variant="addToCart" @click="addToCart()" />
    <BaseButton v-if="isInStock() === 0 && user.id" name="OUT OF STACK" variant="outOfStack" />
    <div v-if="user.id && isInCart" class="flex items-center gap-18">
      <div class="flex gap-6 bg-zinc-800 py-4 px-3 text-lg transition duration-300 hover:scale-108">
        <img :src="plus" @click="updateCartItem('add', isInCart.id)" alt=""
             class="bg-zinc-600 text-white px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
        <span class="text-white font-dm-sans">{{ isInCart.variants }}</span>
        <img :src="minus" @click="updateCartItem('away', isInCart.id)" alt=""
             class="bg-zinc-600 text-white px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
      </div>
      <router-link :to="{ name: 'cart' }">
            <span class="bg-black text-white font-semibold py-4.5 px-19 font-[Montserrat]
                lg:block cursor-pointer text-start transition duration-400 transform hover:scale-108">Go to Cart</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cartHelper } from "@/features/use-product/lib/cart-helper.ts";
import { useAddToCart } from "@/features/use-product/api/add-to-cart.ts";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";
import { productsHelper } from "@/features/use-main-product/lib/products-helper.ts";
import { toggleSizeGuide } from "@/features/use-product/lib/toggle-size-guide.ts";

defineProps<{
  user: User,
}>();

import plus from "@/assets/icons/products/plus.svg";
import minus from "@/assets/icons/products/minus.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import type {User} from "@/features/use-profile/model/user.types.ts";

const { isInCart } = cartHelper();
const { addToCart } = useAddToCart();
const { isInStock } = productsHelper();
const { updateCartItem } = useUpdateCart();
</script>

<style scoped>

</style>