<template>
    <div class="bg-[#F0F0F0]">
        <div class="px-4 pt-4 sm:px-4 sm:pt-4 md:px-5 md:pt-5 lg:px-6 lg:pt-6 xl:px-6 xl:pt-6">
            <NavBar :user="user" />
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
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { filterAside } from "@/features/products/lib/product-modal";
import { HomeSlider, MainHome } from "@/widgets/home";
import { Footer } from "@/widgets/footer";
import { AsideFilter } from "@/widgets/filter-products";
import { NavBar } from "@/widgets/navigation";

const { user } = useUserData();
</script>
