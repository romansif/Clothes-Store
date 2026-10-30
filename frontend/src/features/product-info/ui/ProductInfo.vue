<template>
    <template v-if="user && product">
        <ProductPhotos :product="product" />
        <div class="mt-20 flex w-125 flex-col px-4">
            <div class="flex flex-col gap-2">
                <div class="flex">
                    <div class="mt-1 flex flex-col gap-1 font-medium">
                        <h1>{{ product.title }}</h1>
                        <h2>{{ product.collection?.name }} / {{ product.category }}</h2>
                    </div>
                    <div class="ml-auto flex flex-col gap-3 font-medium">
                        <img v-if="user.role === 'Buyer'"
                            :src="isFavorite(favorite, product, user.id) ? liked : like"
                            alt=""
                            class="w-8.75 cursor-pointer"
                            @click="toggleFavorite({ favorite, product })"
                        />
                    </div>
                </div>
                <div class="font-dm-sans mt-1 flex text-sm font-medium text-[#A3A3A3]">
                    <span>{{ variantsInfo(addToCartForm, product) }}</span>
                    <span class="font-dm-sans ml-auto text-black"> $ {{ product.price }} </span>
                </div>
            </div>
            <p
                @click="toggleReadMore"
                :class="[
                    'mt-3 cursor-pointer break-after-all font-medium',
                    fullDescription ? 'line-clamp-0' : 'line-clamp-2',
                ]"
            >
                {{ product.description }}
            </p>
            <ProductSpecific
                :user="user"
                :product="product"
                @add-color="addColor"
                @add-size="addSize"
            />
            <ProductToCart :user="user" :product="product" :cart="cart" />
        </div>
    </template>
</template>

<script setup lang="ts">
import { addColor, addSize } from "@/features/product-info/lib/add-cart-specific";
import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { productHelper } from "@/shared/lib/product-helper";
import { toggleReadMore, fullDescription } from "@/features/product-info/lib/toggle-more-info";
import { ProductPhotos, ProductSpecific } from "@/entities/product-info";
import { ProductToCart } from "@/features/add-to-cart";
import {
    addToCartForm,
    addToCartFormErrorMessages,
} from "@/entities/product-info/model/add-to-cart-form";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";
import type { CartItem } from "@/entities/cart-item";
import type { FavoriteItem } from "@/entities/favorite-item";

import like from "@/assets/icons/nav/like.png";
import liked from "@/assets/icons/nav/liked.png";

defineProps<{
    user: User | undefined;
    product: Product;
    cart: CartItem[];
    favorite: FavoriteItem[];
}>();

const { isFavorite } = previewHelper();
const { variantsInfo } = productHelper();
const { toggleFavorite } = useToggleFavorite();

refClearErrorsOnChange(addToCartForm, addToCartFormErrorMessages);
</script>
