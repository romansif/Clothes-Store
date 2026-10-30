<template>
    <TransitionGroup name="list">
        <li :key="product.id" class="flex gap-8 pl-10">
            <ProductPreview
                :user="user"
                :product="product"
                :array="myProducts"
                :favorite="favorite"
                :variant="'myProduct'"
                @toggle-to-favorite="toggleFavorite({ favorite, product })"
            />
            <div class="flex flex-col gap-35">
                <div class="flex flex-col gap-10">
                    <div class="ml-auto flex items-center gap-10">
                        <router-link
                            :to="{ name: 'edit/product', params: { id: getProductId(product) } }"
                        >
                            <img
                                :src="pencil"
                                alt=""
                                class="w-7 cursor-pointer transition duration-400 hover:scale-120"
                            />
                        </router-link>
                        <slot />
                    </div>
                    <div class="flex flex-col gap-4">
                        <h3 class="line-clamp-1 text-base font-semibold text-gray-900 sm:text-lg">
                            {{ product.title }}
                        </h3>
                        <div class="flex flex-wrap gap-4 text-xs">
                            <span
                                class="cursor-default rounded-md bg-gray-100 px-2 py-1 transition duration-400 hover:scale-120"
                            >
                                {{ product.category }}
                            </span>
                            <span
                                class="cursor-default rounded-md bg-gray-100 px-2 py-1 transition duration-400 hover:scale-120"
                            >
                                {{ product.material }}
                            </span>
                        </div>
                        <p
                            class="mt-2 w-250 break-after-all text-xs leading-relaxed text-gray-500 sm:text-sm"
                        >
                            {{ product.description }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-208">
                    <span class="font-dm-sans text-base font-bold text-gray-900 sm:text-lg">
                        $ {{ product.price }}
                    </span>
                    <UiButton variant="stackInfo" name="Stack Info" @click="toggleStackInfo" />
                </div>
            </div>
        </li>
    </TransitionGroup>
    <Transition name="modal">
        <StackInfoModal v-if="stackInfo" :product="product" />
    </Transition>
</template>

<script setup lang="ts">
import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { stackInfo, toggleStackInfo } from "@/entities/my-product-item/lib/toggle-stack-info";
import { UiButton } from "@/shared/ui/button";
import { ProductPreview } from "@/entities/product-card";
import { StackInfoModal } from "@/entities/my-product-item";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";
import type { FavoriteItem } from "@/entities/favorite-item";

import pencil from "@/assets/icons/my-products/pencil.svg";

defineProps<{
    user: User | undefined;
    product: Product;
    myProducts: Product[];
    favorite: FavoriteItem[];
}>();

const { getProductId } = previewHelper();
const { toggleFavorite } = useToggleFavorite();
</script>
