<template>
  <div class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
    <Header />
    <Main />
  </div>
  <Footer />
  <Transition name="sidebar">
    <AsideFilter v-if="filterAside" />
  </Transition>
</template>

<script setup lang="ts">
const { filterAside } = useProductsModals();

import { useProductsModals } from "@/feature/products/lib/products.modals.ts";

import NavBar from "./navigation/NavBar.vue";
import Header from "./ui/Header.vue";
import Main from "./ui/Main.vue";
import Footer from "./ui/Footer.vue";
import AsideFilter from "@/feature/products/ui/AsideFilter.vue";
</script>

<style scoped>

</style>