<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <ProductPreview :user="user"
                        :product="product"
                        :array="cart"
                        :variant="'main&favorite&Cart'"
                        @toggle-to-favorite="toggleToFavorite" />
        <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
          {{ product.material }} {{ product.category }}
        </span>
        <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
          <span class="whitespace-normal">
            {{ product.title }}
          </span>
          <span class="font-dm-sans">
            $ {{ product.price }}
          </span>
        </div>
      </div>
      <UseCart :product="product" :cart="cart" />
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { Product } from "@/shared/model/product.types.ts";
import type {User} from "@/entities/profile/model/user.types.ts";

defineProps<{
  user: User | null
  product: Product;
  cart: Product[]
}>();

const emit = defineEmits<{
  toggleToFavorite: [product: Product],
}>()

const toggleToFavorite = (product: Product) => {
  emit("toggleToFavorite", product)
}

import ProductPreview from "@/entities/product-card/ui/ProductPreview.vue";
import UseCart from "@/features/use-cart/ui/UseCart.vue";
</script>


<style scoped>

</style>