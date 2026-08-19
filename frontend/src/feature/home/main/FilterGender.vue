<template>
  <div class="flex border-b border-gray-300 gap-5 py-3 text-lg">
    <button @click="selectGender('ALL', 'ALL')" :class="[
          'transition duration-400 cursor-pointer',
          selectedGender === 'ALL' ? 'text-black scale-115' : 'text-[#A3A3A3]']">
      (
        All
      )
    </button>
    <button @click="selectGender('GENDER', 'Man')" :class="[`text-[#A3A3A3] transition duration-400
      hover:text-black hover:scale-115 cursor-pointer`, selectedGender === 'Man' ? 'text-black scale-115' : '']">Man</button>
    <button @click="selectGender('GENDER', 'Woman')" :class="[`text-[#A3A3A3] transition duration-400
      hover:text-black hover:scale-115 cursor-pointer`, selectedGender === 'Woman' ? 'text-black scale-115' : '']">Woman</button>
    <button @click="selectGender('GENDER', 'Kids')" :class="[`text-[#A3A3A3] transition duration-400
      hover:text-black hover:scale-115 cursor-pointer`, selectedGender === 'Kids' ? 'text-black scale-115' : '']">Kids</button>
  </div>
</template>

<script setup lang="ts">
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { filtered } from "@/feature/navigation/products-header/nav-actions/filtered.ts";

const { selectedGender } = filtered();
const { getYearProducts } = useProducts();

const selectGender = async (type: string, filter: string) => {
  await getYearProducts(type, filter);
  selectedGender.value = filter;
}
</script>

<style scoped>

</style>