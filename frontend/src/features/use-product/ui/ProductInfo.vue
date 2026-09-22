<template>
  <template v-if="userData && product">
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
            <img @click="toggleToFavorite(product)"
                 :src="isFavorite(product) ? liked : like" alt=""
                 class="w-8.75  cursor-pointer">
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
      <ProductSpecific :product="product" :user="userData"
                       @add-color="addColor" @add-size="addSize"/>
      <ProductToCart :product="product" :user="userData" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useCart } from "@/features/use-product/lib/use-cart.ts";
import { useFavorite } from "@/features/use-favorite/lib/use-favorite.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { refClearErrorsOnChange } from "@/shared/lib/helper/errors-helper.ts";
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import { toggleReadMore, fullDescription } from "@/features/use-product/lib/toggle-more-info.ts";

import {
  addToCartForm, addToCartFormErrorMessages
} from "@/entities/product/model/add.to.cart.form.ts";


import like from '@/assets/icons/nav/like.png';
import liked from '@/assets/icons/nav/liked.png';
import ProductSpecific from "@/features/use-product/ui/ProductSpecific.vue";
import ProductToCart from "@/features/use-product/ui/ProductToCart.vue";
import ProductPhotos from "@/features/use-product/ui/ProductPhotos.vue";

const route = useRoute();

const { userData } = userStore();
const { isFavorite } = useFavorite();
const { addColor, addSize } = useCart();
const { variantsInfo } = productHelper();
const { getProduct, product } = useGetProduct();
const { getFavoriteProducts } = useGetFavorite();
const { toggleToFavorite } = useToggleFavorite();

onMounted(async () => {
  await getFavoriteProducts();
  await getProduct(route.params.id);
});

refClearErrorsOnChange(
  addToCartForm,
  addToCartFormErrorMessages
);
</script>

<style scoped>

</style>