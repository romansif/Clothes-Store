<template>
  <li class="flex w-full items-center gap-10 rounded-xl bg-white p-4">
    <ProductPreview
      :user="props.user"
      :product="props.product"
      :array="props.myProducts"
      :favorite="props.favorite"
      :variant="'myProduct'"
      @toggle-to-favorite="toggleFavorite({ favorite, product })"
    />
    <div class="flex flex-1 flex-col gap-5">
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold">{{ props.product.title }}</h1>
        <div class="flex items-center gap-5">
          <router-link :to="{ name: 'edit/product', params: { id: getProductId(props.product) } }">
            <img :src="pencil" alt="" class="w-7 cursor-pointer transition duration-400 hover:scale-120" />
          </router-link>
          <slot />
        </div>
      </div>
      <span class="font-dm-sans text-sm font-medium text-[#A3A3A3] uppercase">
        {{ t("myProduct.sku", { sku: props.product.sku }) }}
      </span>
      <div class="flex items-center gap-2.5 text-sm font-medium">
        <span class="rounded-full bg-gray-100 px-3 py-1.5 text-center">
          {{ props.product.category }}
        </span>
        <span class="rounded-full bg-gray-100 px-3 py-1.5 text-center">
          {{ props.product.material }}
        </span>
        <span class="rounded-full bg-gray-100 px-3 py-1.5 text-center">
          {{ props.product.gender }}
        </span>
        <span class="rounded-full bg-[#F7F1E8] px-3 py-1.5 text-center text-[#8C6A3F]">
          {{ t("myProduct.collection", { name: props.product.collection.name }) }}
        </span>
      </div>
      <div class="flex items-center gap-2.5 text-sm text-[#A3A3A3]">
        <h4>{{ t("myProduct.description") }}</h4>
        <span class="font-medium">{{ props.product.description }}</span>
      </div>
      <div class="grid w-xl grid-cols-3 rounded-xl border-2 border-gray-300 py-2.5 font-medium">
        <div class="flex flex-col gap-2.5 border-r-2 border-gray-300 px-5">
          <h4 class="text-[#A3A3A3]">{{ t("myProduct.sold") }}</h4>
          <div class="flex items-end gap-1">
            <span class="font-dm-sans text-3xl font-bold">{{ soldQuantity }}</span>
            <span class="text-sm text-[#A3A3A3]">{{ t("common.pcs") }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-2.5 border-r-2 border-gray-300 px-5">
          <h4 class="text-[#A3A3A3]">{{ t("myProduct.revenue") }}</h4>
          <span class="font-dm-sans text-3xl font-bold text-[#8C6A3F]">$ {{ soldTotalPrice }}</span>
        </div>
        <div class="flex flex-col gap-2.5 px-5">
          <h4 class="text-[#A3A3A3]">{{ t("myProduct.inOrders") }}</h4>
          <span class="font-dm-sans text-3xl font-bold">{{ inOrdersQuantity }}</span>
        </div>
      </div>
      <div class="flex items-center gap-10 font-medium">
        <div class="flex items-center gap-2.5">
          <span class="text-sm text-[#A3A3A3]">{{ t("myProduct.colors") }}</span>
          <span
            v-for="color in props.product.colors"
            :key="color.hex"
            class="h-7 w-7 rounded-full border-2 border-gray-300 shadow-md"
            :style="{ background: color.hex }"
          ></span>
        </div>
        <div class="flex items-center gap-2.5">
          <span class="text-sm text-[#A3A3A3]">{{ t("myProduct.sizes") }}</span>
          <span
            v-for="size in props.product.sizes"
            :key="size"
            class="h-7 w-10 rounded-lg border-2 border-gray-300 text-center shadow-md"
          >
            {{ size }}
          </span>
        </div>
      </div>
      <div class="flex border-t-2 border-gray-300 pt-2.5">
        <div class="flex items-end gap-1">
          <span class="font-dm-sans font-bold text-gray-900 sm:text-4xl">$ {{ props.product.price }}</span>
          <span class="text-sm font-medium text-[#A3A3A3]">{{ t("myProduct.perItem") }}</span>
        </div>
        <UiButton name="Stack Info" variant="stackInfo" @click="toggleStackInfo" />
      </div>
    </div>
    <Teleport to="body">
      <Transition name="modal">
        <StackInfoModal v-if="stackInfo" :product="props.product" />
      </Transition>
    </Teleport>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { useToggleFavorite } from "@/shared/api/toggle-to-favorite";
import { useSoldItem } from "@/shared/lib/use-sold-item";
import { stackInfo, toggleStackInfo } from "@/entities/my-product-item/lib/toggle-stack-info";
import { UiButton } from "@/shared/ui/button";
import { ProductPreview } from "@/entities/product-card";
import { StackInfoModal } from "@/entities/my-product-item";
import type { Product } from "@/shared";
import type { User } from "@/entities/profile";
import type { FavoriteItem } from "@/entities/favorite-item";

import pencil from "@/assets/icons/my-products/pencil.svg";

const props = defineProps<{
  user: User | undefined;
  product: Product;
  myProducts: Product[];
  favorite: FavoriteItem[];
}>();

const { t } = useI18n();
const { getProductId } = previewHelper();
const { toggleFavorite } = useToggleFavorite();
const { soldQuantity, soldTotalPrice, inOrdersQuantity } = useSoldItem();
</script>
