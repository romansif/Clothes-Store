<template>
  <div class="flex border-b border-gray-300 gap-5 py-3 text-lg">
    <button @click="selectGender('ALL', 'ALL')"
            :class="[`text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer`,
             selectedGender === 'ALL' ? 'text-black scale-115' : 'text-[#A3A3A3]']">( All )</button>
    <button @click="selectGender('GENDER', 'Man')"
            :class="[`text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer`,
             selectedGender === 'Man' ? 'text-black scale-115' : 'text-[#A3A3A3]']">Man</button>
    <button @click="selectGender('GENDER', 'Woman')"
            :class="[`text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer`,
             selectedGender === 'Woman' ? 'text-black scale-115' : 'text-[#A3A3A3]']">Woman</button>
    <button @click="selectGender('GENDER', 'Kids')"
            :class="[`text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer`,
             selectedGender === 'Kids' ? 'text-black scale-115' : 'text-[#A3A3A3]']">Kids</button>
  </div>
</template>

<script setup lang="ts">
const { selectGender, selectedGender } = filterProduct();

import { filterProduct } from "@/features/use-navigation/model/filter-product.ts";
</script>

<style scoped>

</style>