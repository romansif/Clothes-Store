<template>
    <ul
        v-horizontal-scroll
        class="no-scrollbar mt-5 flex gap-16.5 overflow-x-auto pt-5 whitespace-nowrap"
    >
        <ProductCard
            v-for="product in array"
            :key="product.id"
            :user="user"
            :product="product"
            :array="array"
            :favorite="favorite"
            :variant="'season'"
            @toggle-to-favorite="toggleFavorite({ favorite, product })"
        />
    </ul>
</template>

<script setup lang="ts">
import { productsHelper } from "@/features/products/lib/products-helper";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { ProductCard } from "@/entities/product-card";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";

const props = defineProps<{
    user: User | undefined;
    array: Product[];
    season: string;
}>();

const { favorite } = useFavoriteData();
const { toggleFavorite } = useToggleFavorite();
const { vHorizontalScroll } = productsHelper();
</script>
