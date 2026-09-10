<template>
  <div class="bg-[#F0F0F0]">
    <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <NavBar />
      <HomeSlideBar />
      <Main />
    </div>
    <Footer />
    <Transition name="sidebar">
      <AsideFilter v-if="filterAside" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";

import NavBar from "@/widgets/home/NavBar.vue";
import HomeSlideBar from "@/widgets/home/HomeSlideBar.vue";
import Main from "../../widgets/home/Main.vue";
import Footer from "../../widgets/home/Footer.vue";
import AsideFilter from "@/widgets/AsideFilter.vue";

const { filterAside } = useProductsModals();
const { getFavoriteProducts } = useGetFavorite();
const { getWeekProducts, getYearProducts } = useGetProduct();

onMounted(async() => {
  await getFavoriteProducts();
  await getWeekProducts('ALL', 'ALL')
  await getYearProducts('ALL', 'ALL')
})
</script>

<style scoped>

</style>