<template>
    <header class="flex items-center gap-10">
        <div class="flex items-center gap-14 text-sm font-semibold">
            <router-link :to="{ name: 'cart' }">
                <div class="flex items-center gap-2">
                    <span :class="[isCart ? 'text-black' : 'text-[#A3A3A3]']">SHOPPING BAG</span>
                    <span class="font-dm-sans">({{ cartCount }})</span>
                </div>
            </router-link>
            <div class="flex items-center gap-2">
                <img :src="liked" alt="" class="w-8.75" />
                <router-link :to="{ name: 'favorite' }">
                    <div class="flex items-center gap-2">
                        <span :class="[isFavorite ? 'text-black' : 'text-[#A3A3A3]']"
                            >FAVORITES</span
                        >
                        <span class="font-dm-sans">({{ favoritesCount }})</span>
                    </div>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useFavoriteCartHeader } from "@/widgets/favorite-cart-header/lib/use-favorite-cart-header";

import liked from "@/assets/icons/nav/liked.png";

const route = useRoute();

const { favoritesCount, cartCount, isCart, isFavorite } = useFavoriteCartHeader(route);
</script>
