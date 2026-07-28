<script setup lang="ts">
import { watch } from "vue";
import { useGetProducts } from "../composables/getProducts.ts";
import { useGetSearchedProducts } from "./composables/useGetSearched.ts";
import { useProductsModals } from "../../../shared/composables/modals/products/productsModals.ts";
import { productsForms } from "../../../shared/composables/forms-composables/forms/products.forms.ts";
import { useFilter } from "./composables/useFilter.ts";

import search from "../../../app/assets/icons/nav/search.png";
import right_arrow from '../../../app/assets/icons/arrows/right-arrow.png';
import del from '../../../app/assets/icons/clean_search.svg';

const { toggleFilter, categories, category } = useFilter();
const { searchProductForm } = productsForms();
const { getFilteredProducts } = useGetProducts();
const { toggleFilterAside } = useProductsModals();
const { debouncedSearch, resetSearch } = useGetSearchedProducts()

watch(() => searchProductForm.value.search, async (newValue) => {
  if(newValue) {
    await debouncedSearch();
  }else{
    await getFilteredProducts('ALL', 'Availability')
  }
})
</script>

<template>
  <div class="font-[Montserrat] flex flex-col xl:flex-row xl:gap-25">
    <div class="flex flex-col">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2 items-center xl:items-start">
          <div class="font-semibold flex gap-2">
            <span class="text-[#A3A3A3]">
              Home
            </span>
            <span>/</span>
            <span>
              Products
            </span>
          </div>
          <h1 class="text-4xl font-extrabold">
            PRODUCTS
          </h1>
        </div>
      </div>
      <div class="flex mt-10 relative">
        <input v-model="searchProductForm.search" type="text" class="bg-[#D9D9D9] h-[50px] px-10 w-full placeholder:px-52
            border-none outline-none sm:placeholder:px-122 md:placeholder:px-130 lg:placeholder:px-190 xl:w-[370px]
            xl:placeholder:px-65 transition duration-400 hover:bg-[#D9D9D9]/40 focus:bg-[#D9D9D9]/40"
               placeholder="Search">
        <img :src=search alt="" class="absolute left-4 top-1/2 -translate-y-1/2">
        <img v-if="searchProductForm.search" @click="resetSearch" :src="del" alt="" class="w-[25px] absolute top-1/4 left-85">
      </div>
    </div>
    <div class="flex flex-col h-[40px] sm:h-[140px] xl:h-[215px] gap-5 mt-12 xl:mt-0">
      <div class="flex items-center gap-5 xl:hidden" @click=toggleFilterAside>
        <span class="font-bold">
          Filter
        </span>
        <img :src=right_arrow alt="">
      </div>
      <div class="font-medium hidden gap-x-5 gap-y-2 sm:grid sm:grid-cols-4 xl:mt-19">
        <button v-for="(isActive, categoryName) in category" @click="toggleFilter('ALL', categoryName)"
                :class="['border-2 sm:px-2 sm:py-1 md:px-5 text-lg transition duration-400 hover:border-black hover:text-black hover:scale-110', isActive ? ' border-black' : 'text-[#A3A3A3] border-[#A3A3A3]']">
          All
        </button>
        <button v-for="(isActive, categoryName) in categories" @click="toggleFilter('CATEGORY', categoryName)"
                :class="['border-2 sm:px-2 sm:py-1 md:px-5 text-lg transition duration-400 hover:border-black hover:text-black hover:scale-110', isActive ? ' border-black' : 'text-[#A3A3A3] border-[#A3A3A3]']">
          {{ categoryName }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>