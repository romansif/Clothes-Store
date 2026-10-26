<template>
  <div class="flex flex-col gap-6 mt-4">
    <button @click="toggleSizeGuide"
            class="w-30 text-[#A3A3A3] text-left transition duration-400 cursor-pointer hover:scale-110">
      What's my size?
    </button>
    <router-link v-if="!user.id" :to="{name: 'signIn'}"
                 class="hidden bg-black text-white font-semibold text-sm py-4 w-full text-center
                 font-raleway lg:block">
        ADD TO CART
    </router-link>
    <UiButton v-if="user.role === 'Buyer' && isInStock(product) !== 0 && !isInCart(product)"
                name="ADD TO CART"
                variant="addToCart"
                @click="addToCart()" />
    <UiButton v-if="isInStock(product) === 0 && user.id" name="OUT OF STACK" variant="outOfStack" />
    <div v-if="user.id && isInCart(product)"
         class="flex items-center gap-18">
      <div class="flex gap-6 bg-zinc-800 py-3.5 px-3 text-lg transition duration-300 hover:scale-108">
        <img :src="plus"
             @click="updateCartItem('add', product.id)" alt=""
             class="bg-zinc-600 text-white py-1.5 px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
        <span class="text-white font-dm-sans">{{ isInCart(product)?.variants[0].count }}</span>
        <img :src="minus"
             @click="updateCartItem('away', product.id)" alt=""
             class="bg-zinc-600 text-white py-1.5 px-2 w-8.75 rounded-md transition duration-300 hover:bg-zinc-400" />
      </div>
      <router-link :to="{ name: 'cart' }"
                   class="bg-black text-white font-semibold py-4.5 px-19 font-[Montserrat]
                   lg:block cursor-pointer text-start transition duration-400 transform hover:scale-108">
            Go to Cart
      </router-link>
    </div>
  </div>
  <Transition name="modal">
    <SizeGuideModal v-if="sizeGuideModel"
                    :product="product" />
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { getCartProducts } from "@/widgets/cart-list/api/get-cart";
import { isInCart } from "@/features/product-action/lib/cart-form-helper";
import { useAddToCart } from "@/features/product-action/api/add-to-cart";
import { updateCartItem } from "@/features/cart-item-action/api/update-cart-item";
import { productsHelper } from "@/features/products/lib/products-helper";
import { sizeGuideModel, toggleSizeGuide} from "@/entities/size-guide/lib/toggle-size-guide";
import { SizeGuideModal } from "@/entities/size-guide";
import { UiButton } from "@/shared/ui/button";
import type { User } from "@/entities/profile";
import type { Product } from "@/shared";

import plus from "@/assets/icons/products/plus.svg";
import minus from "@/assets/icons/products/minus.svg";

defineProps<{
  user: User
  product: Product
}>();

const { addToCart } = useAddToCart();
const { isInStock } = productsHelper();

onMounted(async () => {
  await getCartProducts();
})
</script>