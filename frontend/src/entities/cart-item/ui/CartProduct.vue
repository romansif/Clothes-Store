<template>
    <TransitionGroup name="list">
        <li :key="product.id" class="flex gap-5">
            <div class="flex flex-col">
                <ProductPreview
                    :user="user"
                    :product="product"
                    :array="cart"
                    :favorite="favorite"
                    :variant="'main&favorite&Cart'"
                    @toggle-to-favorite="emit('toggleToFavorite', favorite, product)"
                />
                <span class="mt-2 text-sm whitespace-normal text-[#A3A3A3] sm:text-lg">
                    {{ product.material }} {{ product.category }}
                </span>
                <div class="flex items-center justify-between text-sm font-medium sm:text-lg">
                    <span class="whitespace-normal">
                        {{ product.title }}
                    </span>
                    <span class="font-dm-sans"> $ {{ product.price }} </span>
                </div>
            </div>
            <slot />
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { ProductPreview } from "@/entities/product-card";
import type { CartItem } from "@/entities/cart-item";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";
import type { FavoriteItem } from "@/entities/favorite-item";

defineProps<{
    user: User | undefined;
    product: Product;
    cart: CartItem[];
    favorite: FavoriteItem[];
}>();

const emit = defineEmits<{
    toggleToFavorite: [favorite: FavoriteItem[], product: Product];
}>();
</script>
