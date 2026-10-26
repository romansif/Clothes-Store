<template>
  <template v-if="user && product">
    <ProductPhotos :product="product" />
    <div class="flex flex-col mt-20 px-4 w-125">
      <div class="flex flex-col gap-2">
        <div class="flex">
          <div class="flex flex-col gap-1 mt-1 font-medium">
            <h1>{{ product.title }}</h1>
            <h2>
              {{ product.collection?.name }} / {{ product.category }}
            </h2>
          </div>
          <div class="flex flex-col gap-3 ml-auto font-medium">
            <img :src="isFavorite(product, user) ? liked : like" alt=""
                 class="w-8.75  cursor-pointer"
                 @click="toggleToFavorite(product)">
          </div>
        </div>
        <div class="flex text-sm font-medium text-[#A3A3A3] mt-1 font-dm-sans">
          <span>{{ variantsInfo(addToCartForm, product) }}</span>
          <span class="ml-auto text-black font-dm-sans">
            $ {{ product.price }}
          </span>
        </div>
      </div>
      <p @click="toggleReadMore"
         :class="['font-medium break-after-all mt-3 cursor-pointer',
         fullDescription ? 'line-clamp-0' : 'line-clamp-2']">
          {{ product.description }}
      </p>
      <ProductSpecific :user="user"
                       :product="product"
                       @add-color="addColor"
                       @add-size="addSize"/>
      <ProductToCart :user="user"
                     :product="product"
                     :cart="cart" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { addColor, addSize } from "@/features/product-info/lib/add-cart-specific";
import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { toggleToFavorite } from "@/shared/api/toggle-to-favorite";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { productHelper } from "@/shared/lib/product-helper";
import { toggleReadMore, fullDescription } from "@/features/product-info/lib/toggle-more-info";
import { ProductPhotos, ProductSpecific } from "@/entities/product-info";
import { ProductToCart } from "@/features/add-to-cart";
import { addToCartForm, addToCartFormErrorMessages } from "@/entities/product-info/model/add-to-cart-form";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";
import type { CartItem } from "@/entities/cart-item";

import like from '@/assets/icons/nav/like.png';
import liked from '@/assets/icons/nav/liked.png';

defineProps<{
  user: User | null
  product: Product
  cart: CartItem[]
}>();

const { isFavorite } = previewHelper();
const { variantsInfo } = productHelper();

refClearErrorsOnChange(
  addToCartForm,
  addToCartFormErrorMessages
);
</script>
