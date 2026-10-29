<template>
    <Transition name="view" mode="out-in">
        <Loader v-if="isLoading" variant="week-list" />
        <ErrorState v-else-if="isError" variant="week-list" />
        <ul
            v-else-if="weekProducts.length"
            v-horizontal-scroll
            class="no-scrollbar flex gap-10 overflow-x-auto pt-6 whitespace-nowrap xl:gap-22.5"
        >
            <ProductCard
                v-for="product in weekProducts"
                :user="user"
                :product="product"
                :array="weekProducts"
                :favorite="favorite"
                :variant="'week'"
                @toggle-to-favorite="toggleFavorite({ favorite, product })"
            />
        </ul>
        <EmptyState v-else variant="week-list" />
    </Transition>
</template>

<script setup lang="ts">
import { useWeekProductData } from "@/widgets/week-list/lib/use-week-product-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { productsHelper } from "@/features/products/lib/products-helper";
import { ProductCard } from "@/entities/product-card";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData();
const { toggleFavorite } = useToggleFavorite();
const { vHorizontalScroll } = productsHelper();
const { weekProducts, isLoading, isError } = useWeekProductData("ALL", "ALL");

const props = defineProps<{
    user: User | undefined;
}>();
</script>
