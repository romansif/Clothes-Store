<template xmlns="http://www.w3.org/1999/html">
  <div class="mt-4 flex flex-col gap-6">
    <button @click="toggleSizeGuide" class="w-43 cursor-pointer text-left text-[#A3A3A3] transition duration-400 hover:scale-110">
      {{ t("product.whatsMySize") }}
    </button>
    <router-link v-if="!user.id" :to="{ name: 'signIn' }" class="font-raleway hidden w-full bg-black py-4 text-center text-sm font-semibold text-white lg:block">
      {{ t("product.addToCart") }}
    </router-link>
    <UiButton v-if="user.role === 'Buyer' && isInStock(product) !== 0 && !isInCart(cart, product)" :name="t('product.addToCart')" variant="addToCart" @click="addToCart(product)" />
    <UiButton v-if="isInStock(product) === 0 && user.id" :name="t('product.outOfStock')" variant="outOfStack" />
    <div v-if="user.id && isInCart(cart, product)" class="flex h-fit items-center gap-18">
      <div class="flex items-center gap-6 rounded-full bg-zinc-900 px-4 py-3.5 text-lg transition duration-300 hover:scale-108">
        <button class="rounded-full bg-zinc-600 px-2 py-1.5 text-white transition duration-300 hover:bg-zinc-700" @click="cartItem && updateCartItemQuantity({ type: 'add', cartItem })">
          <img :src="plus" alt="" class="w-20" />
        </button>
        <span class="font-dm-sans text-white">{{ cartItem?.quantity }}</span>
        <button class="rounded-full bg-zinc-600 px-2 py-1.5 text-white transition duration-300 hover:bg-zinc-700" @click="cartItem && updateCartItemQuantity({ type: 'remove', cartItem })">
          <img :src="minus" alt="" class="w-20" />
        </button>
      </div>
      <router-link
        :to="{ name: 'cart' }"
        class="w-full transform cursor-pointer rounded-full bg-[#722f37] py-5 text-center font-[Montserrat] text-sm font-semibold text-white transition duration-400 hover:scale-108 hover:bg-[#5a252c] lg:block"
      >
        {{ t("product.goToCart") }}
      </router-link>
    </div>
  </div>
  <Transition name="modal">
    <SizeGuideModal v-if="sizeGuideModel" :product="product" />
  </Transition>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
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

const { t } = useI18n();
const { addToCart } = useAddToCart();
const { isInStock } = productsHelper();
const { updateCartItemQuantity } = useUpdateCartItem();
</script>
