<template>
    <div :class="['flex items-center justify-center', isBuyer ? 'mt-10' : 'mt-25']">
        <main class="flex flex-col gap-35 lg:mt-0 lg:w-300">
            <div class="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <Loader v-if="isLoading" variant="product" />
                <ErrorState v-else-if="isError" variant="product" />
                <ProductInfo
                    v-else-if="product"
                    :user="user"
                    :product="product"
                    :cart="cart"
                    :favorite="favorite"
                />
            </div>
            <ProductReviews />
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProductData } from "@/features/product-info/lib/use-product-data";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import { ProductInfo } from "@/features/product-info";
import { ProductReviews } from "@/features/review-dashboard";
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { ErrorState, Loader } from "@/widgets/state";

const route = useRoute();

const { cart } = useCartData();
const { user } = useUserData();
const { favorite } = useFavoriteData();
const { product, isLoading, isError } = useProductData(route);

const isBuyer = computed(() => {
    if (!user.value) return;
    return user.value.role === "Buyer";
});
</script>
