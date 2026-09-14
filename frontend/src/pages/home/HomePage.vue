<template>
  <div class="bg-[#F0F0F0]">
    <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <NavBar />
      <HomeSlideBar />
      <MainHome />
    </div>
    <Footer />
    <Transition name="sidebar">
      <AsideFilter v-if="filterAside" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useProductsModals } from "@/features/use-main-product/lib/product.modal.ts";

import NavBar from "@/widgets/home/ui/NavBar.vue";
import HomeSlideBar from "@/widgets/home/ui/HomeSlideBar.vue";
import MainHome from "../../widgets/home/ui/MainHome.vue";
import Footer from "../../widgets/home/ui/Footer.vue";
import AsideFilter from "@/widgets/product/ui/AsideFilter.vue";

const { filterAside } = useProductsModals();
</script>

<style scoped>

</style>