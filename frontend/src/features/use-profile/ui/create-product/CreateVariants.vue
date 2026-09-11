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
          <tr class="">
            <th class="font-medium pb-4">Colors</th>
            <th v-for="size in moreCreateItem.sizes" :key="size"
                class="text-center font-medium min-w-16 pb-4">
              {{ size }}
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
          <tr v-for="color in moreCreateItem.colors" :key="color.hex">
            <td :title="color.hex">
              <div class="flex items-center gap-2">
                          <span :style="{ background: color.hex }"
                                class="w-10 h-10 shrink-0 rounded-full border-2 border-gray-300 shadow-sm"></span>
                <span class="text-xs font-bold text-black uppercase whitespace-nowrap">
                  {{ color.colorName }}
                </span>
              </div>
            </td>
            <td v-for="size in moreCreateItem.sizes" :key="size" class="py-6 text-center">
              <input v-model="toggleQuantity(color.hex, color.colorName, size).count"
                     type="number" min="0" step="1" placeholder="0" :aria-label="`${color.colorName}, размер ${size}`"
                     class="w-20 h-10 outline-none border-2 border-gray-300 rounded-sm text-center" />
            </td>
          </tr>
          </tbody>
        </table>
        <div class="flex justify-center">
          <span v-if="!moreCreateItem.colors?.length && !moreCreateItem.sizes?.length"
                class="py-8 text-center text-[#A3A3A3]">
            Select sizes and colors to populate the stock levels.
          </span>
          <span v-else-if="!moreCreateItem.colors?.length" class="py-8 text-center text-[#A3A3A3]">
            Select colors to populate the stock levels.
          </span>
          <span v-else-if="!moreCreateItem.sizes?.length" class="py-8 text-center text-[#A3A3A3]">
            Select sizes to populate the stock levels.
          </span>
        </div>
        <span v-if="createProductFormErrors.variantError" class="text-red-600 text-xs">
          {{ createProductFormMessages.variantMessage }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-3 w-full">
      <div class="flex items-center justify-between">
        <label for="" class="font-semibold tracking-wider text-xs">
          <div class="flex gap-1">
            <span>SIZES · РАЗМЕРЫ</span>
            <span class="text-red-500">*</span>
          </div>
        </label>
        <span class="ml-auto text-[#A3A3A3] text-xs font-medium">
          Sizes: {{ moreCreateItem.sizes.length }} / 6
        </span>
      </div>
      <div class="flex gap-6">
        <img v-for="size in sizes" :key="size.name" :src=size.url alt="" @click="toggleSize(size.name)"
             :class="[size.class, moreCreateItem.sizes.includes(size.name)
                              ? 'transition duration-400 scale-110 w-15 rounded-full'
                              : 'transition duration-400 hover:scale-110 w-15 rounded-full']">
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
          </div>
        </label>
        <span class="ml-auto text-[#A3A3A3] text-xs font-medium">
          Colors: {{ moreCreateItem.colors.length }} / 6
        </span>
      </div>
      <div class="flex gap-6">
        <div v-for="color in moreCreateItem.colors" :key="color.hex" :title="color.hex"
             :style="{ background: color.hex }" @click="toggleColor(color.hex, $event)"
             class="w-15 h-15 border-2 border-[#A3A3A3] rounded-full transition-all duration-300 scale-110"></div>
        <label v-if="moreCreateItem.colors?.length < 6" title="Выбрать любой цвет"
               class="w-16 h-16 border-2 rounded-full border-dashed border-gray-300 bg-white
                           flex items-center justify-center text-gray-400 cursor-pointer transition-all duration-400
                           hover:scale-108 hover:border-black hover:text-black text-2xl font-light relative overflow-hidden">+
          <input @change="toggleColor(($event.target as HTMLInputElement).value, $event)" type="color"
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
import { watch } from "vue";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { productStore } from "@/features/use-product/model/product.store.ts";
import { productForms } from "@/features/use-product/model/product.forms.ts";
import { productsFormErrors } from "@/features/use-product/lib/product.error.ts";

import BaseInput from "@/shared/ui/BaseInput.vue";

const { sizes, countMode } = productStore();
const { createProductFormErrors } = productsFormErrors();
const { toggleAllVariants, toggleQuantity, toggleSize, toggleColor } = useGetProduct();
const { createProductForm, moreCreateItem, createProductFormMessages } = productForms();

watch(() => [moreCreateItem.sizes.length, moreCreateItem.colors.length, moreCreateItem.variants.length],
    ([sizes, colors, variants]) => {
      if(sizes){
        createProductFormErrors.value.sizeError = false;
      }if(colors){
        createProductFormErrors.value.colorError = false;
      }if(variants){
        createProductFormErrors.value.variantError = false;
      }
});
</script>


<style scoped>

</style>