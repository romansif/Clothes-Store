<template>
    <Transition name="view" mode="out-in">
        <Loader v-if="isLoading" variant="products" />
        <ErrorState v-else-if="isError" variant="products" :loading="isFetching" @reload="refetch()" />
        <ul
            v-else-if="filteredProducts.length"
            class="font-raleway no-scrollbar mt-5 grid max-h-132.5 grid-cols-2 gap-5 overflow-y-auto sm:max-h-197.5 sm:grid-cols-2 sm:gap-8 md:max-h-200 md:gap-10 lg:grid-cols-3 xl:mt-0 xl:max-h-116"
        >
            <ProductCard
                v-for="product in filteredProducts"
                :user="user"
                :product="product"
                :array="filteredProducts"
                :favorite="favorite"
                :variant="'main&favorite&Cart'"
                @toggle-to-favorite="toggleFavorite({ favorite, product })"
            />
        </ul>
        <EmptyState v-else variant="products" :loading="isFetching" @reload="refetch()" />
    </Transition>
</template>

<script setup lang="ts">
import { useProductListData } from "@/widgets/product-list/lib/use-product-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { ProductCard } from "@/entities/product-card";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData();
const { toggleFavorite } = useToggleFavorite();
const { filteredProducts, isLoading, isFetching, isError, refetch } = useProductListData();

const props = defineProps<{
    user: User | undefined;
}>();
</script>
