<template>
  <div class="bg-[#F0F0F0]">
    <NavBar :user="user" />
    <div class="p-4 md:p-5 lg:p-6">
      <HomeSlider />
      <MainHome />
    </div>
    <Transition name="sidebar">
      <AsideFilter v-if="filterAside" />
    </Transition>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { filterAside } from "@/widgets/filter-products/lib/product-modal";
import { HomeSlider, MainHome } from "@/widgets/home";
import { AsideFilter } from "@/widgets/filter-products";
import { NavBar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";

const { user } = useUserData();
</script>
