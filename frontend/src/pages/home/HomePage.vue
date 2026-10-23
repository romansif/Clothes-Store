<template>
  <div class="bg-[#F0F0F0]">
    <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <NavBar />
      <HomeSlider />
      <MainHome />
    </div>
    <Footer />
    <Transition name="sidebar">
      <AsideFilter v-if="filterAside" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useProductsModals } from "@/features/products/lib/product-modal";
import { NavBar, HomeSlider, MainHome } from "@/widgets/home";
import { Footer } from "@/widgets/footer";
import { AsideFilter } from "@/widgets/product-sidebar";

const { filterAside } = useProductsModals();
</script>

