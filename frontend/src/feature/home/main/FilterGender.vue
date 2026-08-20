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

const { selectedGender } = filtered();
const { getYearProducts } = useProducts();
const { selectGenderClass } = productsClasses();

import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { filtered } from "@/feature/navigation/products-header/nav-actions/filtered.ts";
import { productsClasses } from "@/shared/composables/style/products.classes.ts";

const selectGender = async (type: string, filter: string) => {
  await getYearProducts(type, filter);
  selectedGender.value = filter;
}
</script>

<style scoped>

</style>