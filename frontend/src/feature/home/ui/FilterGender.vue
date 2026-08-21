<template>
  <div class="flex border-b border-gray-300 gap-5 py-3 text-lg">
    <button @click="selectGender('ALL', 'ALL')" :class="selectGenderClass('ALL')">
      (
      All
      )
    </button>
    <button @click="selectGender('GENDER', 'Man')" :class="selectGenderClass('Man')">Man</button>
    <button @click="selectGender('GENDER', 'Woman')"  :class="selectGenderClass('Woman')">Woman</button>
    <button @click="selectGender('GENDER', 'Kids')" :class="selectGenderClass('Kids')">Kids</button>
  </div>
</template>

<script setup lang="ts">

const { selectedGender } = filterProducts();
const { getYearProducts } = productsApi();
const { selectGenderClass } = productsClasses();

import { productsApi } from "@/feature/products/api/products.api.ts";
import { filterProducts } from "@/feature/navigation/lib/filter-products.ts";
import { productsClasses } from "@/shared/constants/products/products.classes.ts";

const selectGender = async (type: string, filter: string) => {
  await getYearProducts(type, filter);
  selectedGender.value = filter;
}
</script>

<style scoped>

</style>