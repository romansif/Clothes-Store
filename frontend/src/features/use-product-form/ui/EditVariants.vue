<template>
  <div class="bg-white p-6.5 mt-6 flex flex-col justify-center gap-8 rounded shadow-xl">
    <div class="flex flex-col gap-3 w-full">
      <div class="flex items-center justify-between">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>QUANTITY · КОЛИЧЕСТВО</span>
            <span class="text-red-500">*</span>
          </div>
        </label>
        <div class="flex gap-2 justify-end items-center font-semibold">
          <button type="button" @click="countMode = 'SAME'"
                  :class="['transition duration-700 rounded-full px-3 py-2 text-sm tracking-widest',
                  countMode === 'SAME' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black']">
            The same
          </button>
          <button type="button" @click="countMode = 'DIFFER'"
                  :class="['transition duration-700 rounded-full px-3 py-2 text-sm tracking-widest',
                  countMode === 'DIFFER' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black']">
            Different
          </button>
        </div>
      </div>
      <div v-if="countMode === 'SAME'" class="flex">
        <BaseInput v-model="createProductForm.quantity" @input="toggleAllVariants"
                   type="number" placeholder="product ptc." class="w-75"
                   :error="createProductFormErrors.quantityError" variant="createProduct" required
                   :error-message="createProductFormErrors.quantityError ? createProductFormMessages.quantityMessage : ''"/>
        <span class="ml-auto mt-auto text-sm text-[#A3A3A3] font-medium">
            An equal quantity will be selected for all sizes and colors
          </span>
      </div>
      <div v-else class="pt-3">
        <table class="w-full text-left border-collapse">
          <thead class="border-b-2">
          <tr>
            <th class="font-medium pb-4">
              Colors
            </th>
            <th v-for="size in uniqueSizes(product)" :key="size" class="text-center font-medium min-w-16 pb-4">
              {{ size }}
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
          <tr v-for="color in uniqueColors(product)" :key="color.colorName">
            <td :title="color.hex">
              <div class="flex items-center gap-2">
                <span :style="{ background: color.hex }" class="w-10 h-10 shrink-0 rounded-full
                      border-2 border-gray-300 shadow-sm"/>
                <span class="text-xs font-bold text-black uppercase whitespace-nowrap">
                  {{ color.colorName }}
                </span>
              </div>
            </td>
            <td v-for="size in uniqueSizes(product)" :key="`${color.colorName}-${size}`" class="py-6 text-center">
              <input type="number" min="0" step="1" :value="product.variants.find(variant =>
                     variant.colorName === color.colorName && variant.size === size)?.count ?? 0"
                     @input="updateProductCount(product, color, size, ($event.target as HTMLInputElement).value)"
                     class="w-20 h-10 outline-none border-2 border-gray-300 rounded-sm text-center"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex flex-col gap-3 w-full">
      <div class="flex items-center justify-between">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>SIZES · РАЗМЕРЫ</span>
            <span class="text-red-500">*</span>
            <span>/</span>
            <span class="text-black uppercase">
                         {{ pureSizesName(product) }}
                      </span>
          </div>
        </label>
        <span class="ml-auto text-[#A3A3A3] text-xs font-medium">
          Sizes: {{ uniqueSizes(product).length }} / 6
        </span>
      </div>
      <div class="flex gap-6">
        <img v-for="size in isAvailableSizes(product)" :key="size?.name" :src="size.url" alt=""
             :class="[size.class, 'transition duration-400 scale-110 w-15 rounded-full']">
      </div>
      <span v-if="createProductFormErrors.sizeError" class="text-red-600 text-xs">
        {{ createProductFormMessages.sizeMessage }}
      </span>
    </div>
    <div class="flex flex-col gap-3 w-full">
      <div class="flex items-center justify-between">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>COLORS · ЦВЕТА</span>
            <span class="text-red-500">*</span>
            <span> / </span>
            <span class="text-black uppercase">
              {{ pureColorsName(product) }}
            </span>
          </div>
        </label>
        <span class="ml-auto text-[#A3A3A3] text-xs font-medium">
          Colors: {{ uniqueColors(product).length }} / 6
        </span>
      </div>
      <div class="flex gap-6">
        <label v-for="(color, index) in pureInfoColors(product)" :key="color.hex" :title="color.hex"
               :style="{ background: color.hex }"
               class="w-15 h-15 border-2 border-[#A3A3A3] rounded-full transition-all duration-300 scale-110">
          <input @change="(e) => updateProductColors(product, index, e)" type="color"
                 class="absolute inset-0 h-full opacity-0 cursor-pointer" />
        </label>
      </div>
      <span v-if="createProductFormErrors.colorError" class="text-red-600 text-xs">
        {{ createProductFormMessages.colorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productStore } from "@/features/use-all-product/model/product.store.ts";
import { useUpdateProduct } from "@/features/use-product-form/api/update-product.ts";
import { productForms } from "@/features/use-product-form/model/product.forms.ts";
import { productsFormErrors } from "@/features/use-product-form/lib/product.error.ts";
import {productHelper} from "@/features/use-product/lib/product.helper.ts";
import {productFormHelper} from "@/features/use-product-form/lib/product.form.helper.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

import BaseInput from "@/shared/ui/BaseInput.vue";

defineProps<{
  product: Product,
}>();

const { countMode } = productStore();
const { toggleAllVariants } = productFormHelper();
const { createProductFormErrors } = productsFormErrors();
const { updateProductCount, updateProductColors } = useUpdateProduct();
const { createProductForm, createProductFormMessages } = productForms();
const { pureInfoColors, pureColorsName, pureSizesName, isAvailableSizes, uniqueSizes, uniqueColors } = productHelper();
</script>


<style scoped>

</style>