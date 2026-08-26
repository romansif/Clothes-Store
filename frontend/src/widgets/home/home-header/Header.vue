<template>
  <header class="font-montserrat w-full mt-10">
    <div class="xl:flex lg:flex">
      <div class="xl:flex xl:ml-auto lg:hidden hidden">
        <SlideBar />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { getAllProducts } = productApi();

import { onMounted } from "vue";
import { productApi } from "@/features/use-product/api/product.api.ts";

import SlideBar from "@/widgets/home/home-header/SlideBar.vue";

onMounted(async () => {
  await getAllProducts();
})
</script>

<style scoped>

</style>