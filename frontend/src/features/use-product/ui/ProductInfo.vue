<template>
  <template v-if="userData">
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
      <p @click="toggleReadMore" :class="['font-medium break-after-all mt-3 cursor-pointer', fullDescription ? 'line-clamp-0' : 'line-clamp-2']">
          {{ product.description }}
      </p>
      <ProductSpecific :product="product" :user="userData" />
      <ProductToCart :product="product" :user="userData" />
    </div>
  </template>
</template>

<script setup lang="ts">

import { useFavorite } from "@/features/use-favorite/lib/use-favorite.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { refClearErrorsOnChange } from "@/shared/lib/helper/errors-helper.ts";
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import { toggleReadMore, fullDescription } from "@/features/use-product/lib/toggle-more-info.ts";
import { type Product } from "@/features/use-product/model/product.types.ts";
import {
  addToCartForm, addToCartFormErrorMessages
} from "@/features/use-product/model/add.to.cart.form.ts";


import like from '@/assets/icons/nav/like.png';
import liked from '@/assets/icons/nav/liked.png';
import ProductSpecific from "@/features/use-product/ui/ProductSpecific.vue";
import ProductToCart from "@/features/use-product/ui/ProductToCart.vue";

defineProps<{
  product: Product,
}>();

const { userData } = userStore();
const { isFavorite } = useFavorite();
const { variantsInfo} = productHelper();
const { toggleToFavorite } = useToggleFavorite();

refClearErrorsOnChange(
  addToCartForm,
  addToCartFormErrorMessages
)
</script>

<style scoped>

</style>