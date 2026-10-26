<template>
  <div :class="['flex justify-center items-center', isBuyer ? 'mt-10' : 'mt-25']">
    <main v-if="product" class="flex flex-col gap-35 lg:mt-0 lg:w-300">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10">
        <ProductInfo :user="userData"
                     :product="product"
                     :cart="cart" />
      </div>
      <ProductReviews />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useProductData } from "@/features/product-info/lib/use-product-data";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { userData } from "@/shared/model/user.store";
import { ProductInfo } from "@/features/product-info";
import { ProductReviews } from "@/features/review-dashboard";

const route = useRoute();

const { cart } = useCartData()
const { product } = useProductData(route)

const isBuyer = computed(() => {
  return userData.value?.role === 'Buyer';
});
</script>
