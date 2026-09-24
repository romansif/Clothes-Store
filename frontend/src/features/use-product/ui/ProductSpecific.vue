<template>
  <div class="flex flex-col mt-3.5 gap-7">
    <div class="flex flex-col gap-3">
      <span class="font-medium text-[#A3A3A3]">
        Colors
      </span>
      <div class="flex justify-start items-center lg:gap-5">
        <div v-for="color in pureInfoColors(product)" :key="color.hex"
             :style="{ background: color.hex }"
             :title="color.hex"
             :class="selectedColorClass(color, product, user.role)"
             @click="addColor(color, user, product)"></div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <span class="font-medium text-[#A3A3A3]">
        Sizes
      </span>
      <div class="flex justify-start items-center lg:gap-5">
        <img v-for="size in isAvailableSizes(product)" :key="size.name"
             :src=size.url alt=""
             :class="selectedSizesClass(size, product, user.role)"
             @click="addSize(size, user, product)">
      </div>
      <div class="flex items-center gap-1">
        <span v-if="addToCartFormErrorMessages.colors"
              class="text-red-600 text-xs">
          {{ addToCartFormErrorMessages.colors }}
        </span>
        <span v-if="addToCartFormErrorMessages.colors && addToCartFormErrorMessages.sizes"
              class="text-red-600 text-xs">/</span>
        <span v-if="addToCartFormErrorMessages.sizes"
              class="text-red-600 text-xs">
          {{ addToCartFormErrorMessages.sizes }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import { addToCartClasses } from "@/features/use-product/const/add.to.cart.classes.ts";
import type {User} from "@/entities/profile/model/user.types.ts";
import type {ColorItem, Product, Size} from "@/shared/model/product.types.ts";
import { addToCartFormErrorMessages } from "@/shared/model/add.to.cart.form.ts";

defineProps<{
  user: User
  product: Product
}>();

const emit = defineEmits<{
  addColor: [color: ColorItem, user: User, product: Product];
  addSize: [size: Size, user: User, product: Product];
}>();

const addColor = (color: ColorItem, user: User, product: Product) => {
  emit('addColor', color, user, product);
};

const addSize = (size: Size, user: User, product: Product) => {
  emit('addSize', size, user, product);
}

const { pureInfoColors, isAvailableSizes } = productHelper();
const { selectedColorClass, selectedSizesClass } = addToCartClasses();
</script>

<style scoped>

</style>