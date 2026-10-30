<template>
    <Transition name="view" mode="out-in">
        <Loader v-if="isLoading" variant="my-products" />
        <ErrorState v-else-if="isError" variant="my-products" :loading="isFetching" @reload="refetch()" />
        <ul v-else-if="myProducts.length" class="font-raleway flex flex-col gap-20">
            <MyProductItem
                v-for="product in myProducts"
                :key="product.id"
                :user="user"
                :product="product"
                :myProducts="myProducts"
                :favorite="favorite"
            >
                <DeleteMyProductButton :product="product" />
            </MyProductItem>
        </ul>
        <EmptyState v-else variant="my-products" :loading="isFetching" @reload="refetch()" />
    </Transition>
</template>

<script setup lang="ts">
import { useMyProductsData } from "@/widgets/my-product-list/lib/use-my-products-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { MyProductItem } from "@/entities/my-product-item";
import { DeleteMyProductButton } from "@/features/delete-my-product";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData();
const { myProducts, isLoading, isFetching, isError, refetch } = useMyProductsData();

const props = defineProps<{
    user: User | undefined;
}>();
</script>
