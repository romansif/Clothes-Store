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
        <input v-model="searchProductForm.search" type="text" placeholder="Search"
               class="bg-[#D9D9D9]/40 h-12.5 px-10 w-full placeholder:px-52 border-none outline-none
               sm:placeholder:px-114 md:placeholder:px-134 lg:placeholder:px-195 xl:w-92.5 xl:placeholder:px-65
               transition duration-400 hover:bg-gray-50" />
        <img :src=search alt="" class="absolute left-4 top-1/2 -translate-y-1/2">
        <img v-if="searchProductForm.search" @click="resetSearch" :src="del" alt=""
             class="w-6.25 absolute top-1/4 left-85 cursor-pointer">
      </div>
    </div>
    <div class="flex flex-col h-10 sm:h-35 xl:h-53.75 gap-5 mt-12 xl:mt-0">
      <div class="flex items-center gap-5 xl:hidden" @click=toggleFilterAside>
        <span class="font-bold">
          Filter
        </span>
        <img :src=right_arrow alt="">
      </div>
      <div class="font-medium hidden gap-x-5 gap-y-2 sm:grid sm:grid-cols-4 xl:mt-19">
        <button v-for="(isActive, categoryName) in category" @click="toggleFilter('ALL', categoryName)"
                :class="selectedCategoryClass(isActive)">
          All
        </button>
        <button v-for="(isActive, categoryName) in categories" @click="toggleFilter('CATEGORY', categoryName)"
                :class="selectedCategoryClass(isActive)">
          {{ categoryName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { searchProductForm } = productForms();
const { getFilteredProducts } = productsApi();
const { selectedCategoryClass } = productsClasses();
const { toggleFilterAside } = useProductsModals();
const { toggleFilter, categories, category } = filterProducts();
const { debouncedSearch, resetSearch } = useGetSearchedProducts();

import { watch } from "vue";
import { filterProducts } from "@/feature/navigation/lib/filter-products.ts";
import { productsClasses } from "@/shared/constants/products/products.classes.ts";
import { productsApi } from "@/feature/products/api/products.api.ts";
import { useGetSearchedProducts } from "@/feature/navigation/lib/search-products.ts";
import { useProductsModals } from "@/feature/products/lib/products.modals.ts";
import { productForms } from "@/feature/products/model/product.forms.ts";

import del from '@/assets/icons/delete-close/clean_search.svg';
import search from "@/assets/icons/nav/search.png";
import right_arrow from '@/assets/icons/arrows/right-arrow.png';

watch(() => searchProductForm.value.search, async (newValue) => {
  if(newValue) {
    await debouncedSearch();
  }else{
    await getFilteredProducts('ALL', 'Availability');
  }
})
</script>

<style scoped>

</style>