<template>
    <div class="mt-4 flex flex-col gap-6">
        <button
            @click="toggleSizeGuide"
            class="w-30 cursor-pointer text-left text-[#A3A3A3] transition duration-400 hover:scale-110"
        >
            What's my size?
        </button>
        <router-link
            v-if="!user.id"
            :to="{ name: 'signIn' }"
            class="font-raleway hidden w-full bg-black py-4 text-center text-sm font-semibold text-white lg:block"
        >
            ADD TO CART
        </router-link>
        <UiButton
            v-if="user.role === 'Buyer' && isInStock(product) !== 0 && !isInCart(cart, product)"
            name="ADD TO CART"
            variant="addToCart"
            @click="addToCart(product)"
        />
        <UiButton
            v-if="isInStock(product) === 0 && user.id"
            name="OUT OF STACK"
            variant="outOfStack"
        />
        <div v-if="user.id && isInCart(cart, product)" class="flex items-center gap-18">
            <div
                class="flex gap-6 bg-zinc-800 px-3 py-3.5 text-lg transition duration-300 hover:scale-108"
            >
                <img
                    :src="plus"
                    @click="updateCartItemQuantity({ type: 'add', cartItem: product })"
                    alt=""
                    class="w-8.75 rounded-md bg-zinc-600 px-2 py-1.5 text-white transition duration-300 hover:bg-zinc-400"
                />
                <span class="font-dm-sans text-white">{{
                    isInCart(cart, product)?.variants[0].count
                }}</span>
                <img
                    :src="minus"
                    @click="updateCartItemQuantity({ type: 'remove', cartItem: product })"
                    alt=""
                    class="w-8.75 rounded-md bg-zinc-600 px-2 py-1.5 text-white transition duration-300 hover:bg-zinc-400"
                />
            </div>
            <router-link
                :to="{ name: 'cart' }"
                class="transform cursor-pointer bg-black px-19 py-4.5 text-start font-[Montserrat] font-semibold text-white transition duration-400 hover:scale-108 lg:block"
            >
                Go to Cart
            </router-link>
        </div>
    </div>
    <Transition name="modal">
        <SizeGuideModal v-if="sizeGuideModel" :product="product" />
    </Transition>
</template>

<script setup lang="ts">
import { isInCart } from "@/features/product-info/lib/cart-form-helper";
import { useAddToCart } from "@/features/add-to-cart/api/add-to-cart";
import { useUpdateCartItem } from "@/features/cart-item-action/api/update-cart-item";
import { productsHelper } from "@/features/products/lib/products-helper";
import { sizeGuideModel, toggleSizeGuide } from "@/entities/size-guide/lib/toggle-size-guide";
import { SizeGuideModal } from "@/entities/size-guide";
import { UiButton } from "@/shared/ui/button";
import type { User } from "@/entities/profile";
import type { Product } from "@/shared";
import type { CartItem } from "@/entities/cart-item";

import plus from "@/assets/icons/products/plus.svg";
import minus from "@/assets/icons/products/minus.svg";

defineProps<{
    user: User;
    product: Product;
    cart: CartItem[];
}>();

const { isInStock } = productsHelper();
const { addToCart } = useAddToCart();

const { updateCartItemQuantity } = useUpdateCartItem();
</script>
