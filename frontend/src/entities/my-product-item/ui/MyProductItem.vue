<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex pl-10 gap-8">
      <ProductPreview :user="user"
                      :product="product"
                      :array="myProducts"
                      :variant="'myProduct'"
                      @toggle-to-favorite="toggleToFavorite" />
      <div class="flex flex-col gap-35">
        <div class="flex flex-col gap-10">
          <div class="flex items-center ml-auto gap-10">
            <router-link :to="{ name: 'edit/product', params: { id: getProductId(product) } }">
              <img :src="pencil" alt="" class="w-7 transition duration-400 hover:scale-120 cursor-pointer">
            </router-link>
            <slot />
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-gray-900 text-base sm:text-lg line-clamp-1">
              {{ product.title }}
            </h3>
            <div class="flex flex-wrap gap-4 text-xs">
              <span class="px-2 py-1 rounded-md bg-gray-100 transition duration-400 hover:scale-120 cursor-default">
                {{ product.category }}
              </span>
              <span class="px-2 py-1 rounded-md bg-gray-100 transition duration-400 hover:scale-120 cursor-default">
                {{ product.material }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-gray-500 break-after-all leading-relaxed w-250 mt-2">
              {{ product.description }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-208">
          <span class="font-bold text-gray-900 text-base sm:text-lg font-dm-sans">
            $ {{ product.price }}
          </span>
          <UiButton variant="stackInfo"
                    name="Stack Info"
                    @click="toggleStackInfo" />
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

import pencil from "@/assets/icons/products/pencil.svg";

defineProps<{
  user: User | null
  product: Product
  myProducts: Product[]
}>();

const { getProductId } = previewHelper();
const { toggleToFavorite } = useToggleFavorite();
</script>
