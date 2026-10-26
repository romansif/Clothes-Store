<template>
  <Transition name="view">
    <ul v-horizontal-scroll
        class="flex gap-10 xl:gap-40 overflow-x-auto whitespace-nowrap no-scrollbar">
      <ProductCard v-for="product in productsYear"
                   :user="userData"
                   :product="product"
                   :array="productsYear"
                   :variant="'year'"
                   @toggle-to-favorite="toggleToFavorite"/>
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userData } from "@/shared/model/user.store";
import { toggleToFavorite } from "@/shared/api/toggle-to-favorite";
import { useGetYearProduct } from "@/widgets/year-list/api/get-year-product";
import { productsHelper } from "@/features/products/lib/products-helper";
import { ProductCard } from "@/entities/product-card";

const { vHorizontalScroll } = productsHelper();
const { getYearProducts, productsYear } = useGetYearProduct();

onMounted(async() => {
  await getYearProducts('ALL', 'ALL')
})
</script>
