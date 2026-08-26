<template>
  <div class="font-raleway flex gap-62.5">
    <div class="flex flex-col">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2 items-center xl:items-start">
          <div class="font-semibold flex gap-2">
            <router-link :to="{ name: 'products' }" class="text-[#A3A3A3]">
              Products
            </router-link>
            <span>/</span>
            <span>
              New
            </span>
          </div>
          <h1 class="text-4xl font-extrabold">
            NEW ARRIVALS
          </h1>
        </div>
      </div>
      <div class="flex mt-10 relative">
        <input v-model="searchProductForm.search" type="text" placeholder="Search"
               class="bg-[#D9D9D9]/40 h-12.5 px-10 placeholder:px-52 border-none outline-none
               sm:placeholder:px-114 md:placeholder:px-134 lg:placeholder:px-195 xl:w-92.5 xl:placeholder:px-65
               transition duration-400 hover:bg-gray-50 font-dm-sans" />
        <img :src=search alt="" class="absolute left-4 top-1/2 -translate-y-1/2">
        <img v-if="searchProductForm.search" @click="clearSearchProductForm" :src="del" alt=""
             class="w-6.25 absolute top-1/4 left-85 cursor-pointer">
      </div>
    </div>
    <div class="flex flex-col h-10 sm:h-35 xl:h-53.75 gap-5 mt-12 xl:mt-0">
      <div class="flex items-center gap-5 xl:hidden" @click="toggleFilterAside">
        <span class="font-bold">
          Filter
        </span>
        <img :src=right_arrow alt="">
      </div>
      <div class="font-medium hidden gap-x-6 gap-y-2 sm:grid sm:grid-cols-5 xl:mt-19">
        <button v-for="(isActive, categoryName) in collections" @click="toggleFilter('COLLECTION', categoryName)"
                :class="selectedCollectionsClass(isActive)">
          {{ categoryName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { searchProductForm } = searchForm();
const { getFilteredProducts } = productApi();
const { selectedCollectionsClass } = productsClasses();
const { toggleFilterAside } = useProductsModals();
const { toggleFilter, collections } = filterProduct();
const { debouncedSearch } = useGetSearchedProducts();

import { watch } from "vue";
import { filterProduct } from "@/features/use-navigation/model/filter-product.ts";
import { productsClasses } from "@/shared/constants/product/products.classes.ts";
import { searchForm } from "@/widgets/navigation/model/search.form.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { clearSearchProductForm } from "@/features/use-navigation/lib/clear.search.ts";
import { useGetSearchedProducts } from "@/features/use-navigation/model/search-product.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";

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