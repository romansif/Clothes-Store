<template>
  <div class="flex flex-col mt-5 px-4 lg:mt-0 w-125">
    <div class="flex flex-col gap-2">
      <div class="flex">
        <div class="flex flex-col gap-1 mt-1 font-medium">
          <h1>{{ product.title }}</h1>
          <h2>
            {{ product.collection?.name }} / {{ product.category }}
          </h2>
        </div>
        <div class="flex flex-col gap-3 ml-auto font-medium">
          <img @click="toggleToFavorite(product)"
               :src="isFavorite(product) ? liked : like" alt=""
               class="w-8.75  cursor-pointer">
        </div>
      </div>
      <div class="flex text-sm font-medium text-[#A3A3A3] mt-1 font-dm-sans">
        <span>{{ variantsInfo(product) }}</span>
        <span class="ml-auto text-black font-dm-sans">
          $ {{ product.price }}
        </span>
      </div>
    </div>
    <div class="mt-3.5">
      <p class="font-medium break-all">
        {{ product.description }}
      </p>
    </div>
    <div class="flex flex-col mt-3.5 gap-7">
      <div class="flex flex-col gap-3">
        <span class="font-medium text-[#A3A3A3]">
          Colors
        </span>
        <div class="flex justify-start items-center lg:gap-5">
          <div v-for="color in pureInfoColors(product)" :key="color.hex"
               :style="{ background: color.hex }"
               :title="color.hex"
               @click="addColor(color, userData, product)"
               :class="selectedColorClass(color, product, userData.role)"></div>
          </div>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-medium text-[#A3A3A3]">Sizes</span>
        <div class="flex justify-start items-center lg:gap-5">
          <img v-for="size in isAvailableSizes(product)" :key="size.name"
               :src=size.url alt=""
               @click="addSize(size, userData, product)"
               :class="selectedSizesClass(size, product, userData.role)">
        </div>
        <div class="flex items-center gap-1">
          <span v-if="addToCartFormErrors.colors" class="text-red-600 text-xs">
            {{ addToCartFormErrorMessages.colors }}
          </span>
          <span v-if="addToCartFormErrors.colors && addToCartFormErrors.sizes" class="text-red-600 text-xs">/</span>
          <span v-if="addToCartFormErrors.sizes" class="text-red-600 text-xs">
            {{ addToCartFormErrorMessages.sizes }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6 mt-4">
      <button @click="toggleSizeGuide" class="text-[#A3A3A3] text-left transition duration-400 cursor-pointer hover:scale-105">
        What's my size?
      </button>
      <router-link v-if="!userData.id" :to="{name: 'signIn'}">
        <span class="hidden bg-black text-white font-semibold text-sm py-4 w-full text-center
            font-raleway lg:block">
          ADD TO CART
        </span>
      </router-link>
      <BaseButton v-if="userData.role === 'Buyer' && isInStock() !== 0 && !isInCart" name="ADD TO CART"
                  variant="addToCart" @click="addToCart()" />
      <BaseButton v-if="isInStock() === 0 && userData.id" name="OUT OF STACK" variant="outOfStack" />
      <div v-if="userData.id && isInCart" class="flex items-center gap-18">
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
  </div>
</template>

<script setup lang="ts">
import { productsHelper } from "@/features/use-main-product/lib/products-helper.ts";
import { cartHelper } from "@/features/use-product/lib/cart-helper.ts";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";
import { useAddToCart} from "@/features/use-product/api/add-to-cart.ts";
import { useCart } from "@/features/use-product/lib/use-cart.ts";
import { toggleSizeGuide } from "@/features/use-product/lib/toggle-size-guide.ts";
import { useFavorite } from "@/features/use-favorite/lib/use-favorite.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { addToCartClasses } from "@/shared/const/product/add.to.cart.classes.ts";
import { refClearErrorsOnChange } from "@/shared/lib/error-helper/errors-helper.ts";
import { productHelper } from "@/shared/lib/product-helper.ts";
import { type Product } from "@/features/use-product/model/product.types.ts";
import { addToCartFormErrors } from "@/features/use-product/model/add.to.cart.errors.ts";
import { addToCartForm, addToCartFormErrorMessages} from "@/features/use-product/model/add.to.cart.form.ts";

import plus from '@/assets/icons/products/plus.svg';
import minus from '@/assets/icons/products/minus.svg';
import like from '@/assets/icons/nav/like.png';
import liked from '@/assets/icons/nav/liked.png';
import BaseButton from "@/shared/ui/BaseButton.vue";

defineProps<{
  product: Product,
}>();

const { userData } = userStore();
const { isInCart } = cartHelper();
const { isFavorite } = useFavorite();
const { addToCart } = useAddToCart();
const { isInStock } = productsHelper();
const { addColor, addSize } = useCart();
const { updateCartItem } = useUpdateCart();
const { toggleToFavorite } = useToggleFavorite();
const { selectedColorClass, selectedSizesClass } = addToCartClasses();
const { variantsInfo, pureInfoColors, isAvailableSizes } = productHelper();


refClearErrorsOnChange(
  addToCartForm,
  addToCartFormErrors,
  addToCartFormErrorMessages
)
</script>

<style scoped>

</style>