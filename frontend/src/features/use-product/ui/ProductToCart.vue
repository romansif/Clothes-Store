<template>
  <div class="flex flex-col gap-6 mt-4">
    <button @click="toggleSizeGuide" class="w-30 text-[#A3A3A3] text-left transition duration-400 cursor-pointer hover:scale-110">
      What's my size?
    </button>
    <router-link v-if="!user.id" :to="{name: 'signIn'}"
                 class="hidden bg-black text-white font-semibold text-sm py-4 w-full text-center
                 font-raleway lg:block">

        ADD TO CART
    </router-link>
    <BaseButton v-if="user.role === 'Buyer' && isInStock(product) !== 0 && !isInCart(product)" name="ADD TO CART"
                variant="addToCart" @click="addToCart()" />
    <BaseButton v-if="isInStock(product) === 0 && user.id" name="OUT OF STACK" variant="outOfStack" />
    <div v-if="user.id && isInCart(product)" class="flex items-center gap-18">
      <div class="flex gap-6 bg-zinc-800 py-3.5 px-3 text-lg transition duration-300 hover:scale-108">
        <img :src="plus" @click="updateCartItem('add', product.id)" alt=""
             class="bg-zinc-600 text-white py-1.5 px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
        <span class="text-white font-dm-sans">{{ isInCart(product)?.variants[0].count }}</span>
        <img :src="minus" @click="updateCartItem('away', product.id)" alt=""
             class="bg-zinc-600 text-white py-1.5 px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
      </div>
      <router-link :to="{ name: 'cart' }"
                   class="bg-black text-white font-semibold py-4.5 px-19 font-[Montserrat]
                   lg:block cursor-pointer text-start transition duration-400 transform hover:scale-108">
            Go to Cart
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cartHelper } from "@/features/use-product/lib/cart-helper.ts";
import { useAddToCart } from "@/features/use-product/api/add-to-cart.ts";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";
import { productsHelper } from "@/features/use-main-product/lib/products-helper.ts";
import { toggleSizeGuide } from "@/features/use-product/lib/toggle-more-info.ts";

defineProps<{
  product: Product
  user: User,
}>();

import plus from "@/assets/icons/products/plus.svg";
import minus from "@/assets/icons/products/minus.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import type {User} from "@/features/use-profile/model/user.types.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

const { isInCart } = cartHelper();
const { addToCart } = useAddToCart();
const { isInStock } = productsHelper();
const { updateCartItem } = useUpdateCart();
</script>

<style scoped>

</style>