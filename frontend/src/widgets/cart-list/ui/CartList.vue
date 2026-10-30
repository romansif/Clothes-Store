<template>
    <Loader v-if="isLoading" variant="cart" />
    <ErrorState v-else-if="isError" variant="cart" :loading="isFetching" @reload="refetch()" />
    <ul
        v-else-if="cart.length"
        class="no-scrollbar flex max-h-92.5 w-81.25 flex-col gap-10 overflow-y-auto sm:max-h-92.5 md:grid md:w-full md:grid-cols-2 md:gap-30 lg:grid-cols-3 lg:gap-15 xl:max-h-117.5 xl:w-210 xl:grid-cols-2"
    >
        <CartProduct
            v-for="product in cart"
            :key="product.id"
            :user="props.user"
            :product="product"
            :cart="cart"
            :favorite="favorite"
            @toggle-to-favorite="toggleFavorite({ favorite, product })"
        >
            <UseCartItemActions :product="product" :cart="cart" />
        </CartProduct>
    </ul>
    <EmptyState v-else variant="cart" :loading="isFetching" @reload="refetch()" />
</template>

<script setup lang="ts">
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { CartProduct } from "@/entities/cart-item";
import { UseCartItemActions } from "@/features/cart-item-action";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { User } from "@/entities/profile";

const { favorite } = useFavoriteData();
const { toggleFavorite } = useToggleFavorite();
const { cart, isLoading, isFetching, refetch, isError } = useCartData();

const props = defineProps<{
    user: User | undefined;
}>();
</script>
