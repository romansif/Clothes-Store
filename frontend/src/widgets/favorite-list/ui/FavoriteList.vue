<template>
  <div class="flex flex-col xl:flex-row xl:justify-between">
    <ul class="flex flex-col overflow-y-auto gap-10 h-145 no-scrollbar sm:gap-5 sm:h-145 sm:grid sm:grid-cols-2
        md:w-full md:grid md:grid-cols-2 md:gap-x-30 md:gap-y-15 lg:h-142.5 lg:grid-cols-3 lg:gap-15
        xl:grid-cols-3 xl:gap-30 xl:w-full xl:h-117.5">
      <ProductCard v-for="product in favorite"
                   :user="userData"
                   :product="product"
                   :array="favorite"
                   :variant="'main&favorite&Cart'"
                   @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { userData } from "@/shared/model/user.store";
import { favoriteStore } from "@/entities/favorite/model/favorite-store";
import { toggleToFavorite } from "@/shared/api/toggle-to-favorite";
import { ProductCard } from "@/entities/product-card";

const { favorite } = favoriteStore();
</script>
