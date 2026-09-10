<template>
  <div v-for="season in seasonsCatalog" :key="season.id" class="font-montserrat text-white w-92 h-100 rounded-2xl"
       :style="{ backgroundImage: `url(${season.url})` }">
    <div style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))" class="flex flex-col gap-29 px-8 py-12">
      <div class="flex items-center gap-3">
        <span>{{ season.id }}</span>
        <div class="border-b border-2 w-15"></div>
      </div>
      <div class="flex flex-col gap-5" >
        <h1 class="text-3xl font-semibold">{{ season.title }}</h1>
        <p class="w-55 font-medium text-md">{{ season.text }}</p>
        <div class="flex items-center gap-15">
          <router-link :to="{name: `${season.route}`}" class="transition duration-500 hover:scale-108">
              <span class="font-medium cursor-pointer">
                View Collection
              </span>
          </router-link>
          <router-link :to="{name: `${season.route}`}" class="transition duration-500 hover:scale-108">
            <img :src="right_shop" alt="" class="w-16 cursor-pointer">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { seasonsCatalog } = productStore();

import {productStore} from "@/entities/product/model/product.store.ts";

import right_shop from "@/assets/icons/arrows/go-shop.svg";
</script>

<style scoped>

</style>