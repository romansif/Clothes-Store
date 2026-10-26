<template>
  <Transition name="view">
    <ul v-horizontal-scroll
        class="flex gap-16.5 mt-5 overflow-x-auto whitespace-nowrap no-scrollbar pt-5">
      <ProductCard v-for="product in array"
                   :key="product.id"
                   :user="userData"
                   :product="product"
                   :array="array"
                   :variant="'season'"
                   @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { userData } from "@/shared/model/user.store";
import { productsHelper } from "@/features/products/lib/products-helper";
import { toggleToFavorite } from "@/shared/api/toggle-to-favorite";
import { useGetSeasonProducts } from "@/widgets/season-list/api/get-season-product";
import { ProductCard } from "@/entities/product-card";
import type { Product } from "@/shared";

const props = defineProps<{
  array: Product[];
  season: string;
}>();

const { vHorizontalScroll } = productsHelper();
const { getSeasonal } = useGetSeasonProducts();

onMounted(async () => {
  await getSeasonal(props.season);
})
</script>
