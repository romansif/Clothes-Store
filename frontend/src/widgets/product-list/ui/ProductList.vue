<template>
  <Transition name="view">
    <ul class="font-raleway grid grid-cols-2 gap-5 overflow-y-auto max-h-132.5
       sm:max-h-197.5 sm:grid-cols-2 no-scrollbar sm:gap-8 md:gap-10 md:max-h-200 lg:grid-cols-3 xl:max-h-116 mt-5 xl:mt-0">
      <ProductCard v-for="product in products"
                   :user="userData"
                   :product="product"
                   :array="products"
                   :variant="'main&favorite&Cart'"
                   @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userData } from "@/shared/model/user.store";
import { useGetProducts } from "@/features/products/api/get-product";
import { toggleToFavorite } from "@/shared/api/toggle-to-favorite";
import { ProductCard } from "@/entities/product-card";

const { getAllProducts, getFilteredProducts, products } = useGetProducts();

onMounted(async() => {
  await getAllProducts();
  await getFilteredProducts('ALL', 'ALL');
})
</script>
