<template>
  <div class="flex border-b border-gray-300 gap-5 py-3 text-lg">
    <button @click="selectGender('ALL', 'ALL')"
            :class="[filterGenderClass,
             selectedGender === 'ALL' ? selectedFilterGenderClass : 'text-[#A3A3A3]']">( All )</button>
    <button @click="selectGender('GENDER', 'Man')"
            :class="[filterGenderClass,
             selectedGender === 'Man' ?selectedFilterGenderClass : 'text-[#A3A3A3]']">Man</button>
    <button @click="selectGender('GENDER', 'Woman')"
            :class="[filterGenderClass,
             selectedGender === 'Woman' ?selectedFilterGenderClass : 'text-[#A3A3A3]']">Woman</button>
    <button @click="selectGender('GENDER', 'Kids')"
            :class="[filterGenderClass,
             selectedGender === 'Kids' ?selectedFilterGenderClass : 'text-[#A3A3A3]']">Kids</button>
  </div>
</template>

<script setup lang="ts">
import { filterProduct } from "@/features/use-navigation/lib/filter-product";
import { filterGenderClass, selectedFilterGenderClass } from "@/widgets/ui/home/filter-gender.variants";

const { selectGender, selectedGender } = filterProduct();
</script>
