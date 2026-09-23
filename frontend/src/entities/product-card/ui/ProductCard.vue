<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex flex-col w-fit">
      <ProductPreview :user="user"
                      :product="product"
                      :array="array"
                      :size="size"
                      :stack-class="stackClass"
                      :favorite-btn="favoriteBtn"
                      @toggle-to-favorite="toggleToFavorite" />
      <span class="whitespace-normal mt-2 text-[#A3A3A3] text-lg">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex justify-between items-center font-medium text-lg">
        <span class="whitespace-normal">
          {{ product.title }}
        </span>
        <span class="font-dm-sans">
          $ {{ product.price }}
        </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type {Product} from "@/shared/model/product.types.ts";
import type {User} from "@/entities/profile/model/user.types.ts";

defineProps<{
  user: User | null
  product: Product
  array: Product[];
  size: string,
  stackClass: string,
  favoriteBtn: string,
}>();

const emit = defineEmits<{
  toggleToFavorite: [product: Product],
}>()

const toggleToFavorite = (product: Product) => {
  emit("toggleToFavorite", product)
}

import ProductPreview from "@/entities/product-card/ui/ProductPreview.vue";
</script>

<style scoped>

</style>