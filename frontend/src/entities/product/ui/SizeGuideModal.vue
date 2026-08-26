<template>
<div class="font-raleway fixed inset-0 z-50
     bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
  <div class="flex flex-col gap-2 bg-white w-175 h-142.5 rounded-xl p-5">
    <div class="flex items-center">
      <h1 class="text-2xl font-medium">Size Guide</h1>
      <img @click="toggleSizeGuide" :src="close" alt="" class="w-6.5 ml-auto cursor-pointer">
    </div>
    <div class="flex flex-col gap-2 mt-2.5">
      <p class="text-sm leading-7">
        The best way to get the most out of your dress? Make sure they fit right.
        We're proud to ofer AU, UK, US and EU sizes. Let us help you find your best fit
      </p>
      <div class="flex gap-2 justify-end items-center font-medium">
        <button type="button" @click="unit = 'IN'" :class="['transition duration-700 rounded-full px-5 py-2 text-sm tracking-widest',
                unit === 'IN' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black']">
          IN
        </button>
        <button type="button" @click="unit = 'CM'" :class="['transition duration-700 rounded-full px-4 py-2 text-sm tracking-widest',
                unit === 'CM' ? 'bg-black text-white' : 'text-neutral-500 hover:text-black']">
          CM
        </button>
      </div>
      <table class="w-full border-collapse items-center">
        <thead>
        <tr class="border-b border-neutral-400">
          <th class="px-4 py-4 text-left uppercase tracking-wider">
            Size
          </th>
          <th v-for="size in sizes" :key="size.name" class="px-4 py-4 text-center uppercase tracking-wider">
            {{ size.name }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in formatterSizeGuide" :key="row.name" class="text-sm border-b border-neutral-200">
          <th class="px-4 py-4 text-left font-normal">
            {{ row.name }}
          </th>
          <td v-for="value in row.values" :key="value" class="px-4 py-4 text-center text-neutral-600 font-dm-sans">
            {{ value }}
          </td>
        </tr>
        </tbody>
      </table>
      <div class="flex flex-col gap-2 mt-3">
        <h2 class="font-medium">Hassle-Free Returns</h2>
        <p class="text-sm">If you're ever unhappy with your purchase, we'll gladly replace it, or issue you a refund.</p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

const { sizes, unit } = productStore();
const { toggleSizeGuide } = useProductsModals();
const { formatterSizeGuide } = productsCover() ;

import { productStore } from "@/entities/product/model/product.store.ts";
import { productsCover } from "@/features/use-product/model/product-cover.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";

import close from '@/assets/icons/delete-close/delete.svg'
</script>

<style scoped>

</style>