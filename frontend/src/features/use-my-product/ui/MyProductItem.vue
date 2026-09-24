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
            <img @click="toggleDeleteChoice(
            'Are you sure you want to delete this product?', 'DELETE_PROUCT_ITEM', product.id
                 )" :src="del" alt="" class="w-7.5 transition duration-400 hover:scale-120 cursor-pointer">
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
          <BaseButton name="Stack Info"
                      variant="stackInfo"
                      @click="toggleStackInfo(product)" />
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { previewHelper } from "@/entities/product-card/lib/preview-helper.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";
import { toggleStackInfo } from "@/features/use-my-product/lib/toggle-stack-info.ts";
import type {Product} from "@/shared/model/product.types.ts";
import type {User} from "@/entities/profile/model/user.types.ts";

defineProps<{
  user: User | null
  product: Product
  myProducts: Product[]
}>();


const { getProductId } = previewHelper();
const { toggleToFavorite } = useToggleFavorite();
const { toggleDeleteChoice } = baseDeleteModal();

import BaseButton from "@/shared/ui/base/BaseButton.vue";
import ProductPreview from "@/entities/product-card/ui/ProductPreview.vue";
import pencil from "@/assets/icons/products/pencil.svg";
import del from "@/assets/icons/delete-close/delete.svg";
</script>

<style scoped>

</style>