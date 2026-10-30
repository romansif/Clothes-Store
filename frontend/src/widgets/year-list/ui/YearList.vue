<template>
    <Transition name="view" mode="out-in">
        <Loader v-if="isLoading" variant="year-list" />
        <ErrorState
            v-else-if="isError"
            variant="year-list"
            :loading="isFetching"
            @reload="refetch()"
        />
        <ul
            v-else-if="yearProducts.length"
            v-horizontal-scroll
            class="no-scrollbar mt-10 flex gap-10 overflow-x-auto whitespace-nowrap xl:gap-40"
        >
            <ProductCard
                v-for="product in yearProducts"
                :user="user"
                :product="product"
                :array="yearProducts"
                :favorite="favorite"
                :variant="'year'"
                @toggle-to-favorite="toggleFavorite({ favorite, product })"
            />
        </ul>
        <EmptyState v-else variant="year-list" :loading="isFetching" @reload="refetch()" />
    </Transition>
</template>

<script setup lang="ts">
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { useYearProductData } from "@/widgets/year-list/lib/use-year-product-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { productsHelper } from "@/features/products/lib/products-helper";
import { ProductCard } from "@/entities/product-card";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData();
const { toggleFavorite } = useToggleFavorite();
const { vHorizontalScroll } = productsHelper();
const { yearProducts, isLoading, isFetching, isError, refetch } = useYearProductData("ALL", "ALL");

const props = defineProps<{
    user: User | undefined;
}>();
</script>
