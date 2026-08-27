<template>
  <header class="font-raleway flex gap-50">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <div class="flex flex-col gap-2 items-center xl:items-start">
          <div class="font-semibold flex gap-2">
            <router-link :to="{ name: 'shop' }" class="text-[#A3A3A3]">
              Products
            </router-link>
            <span>/</span>
            <span v-if="isNew">
              New
            </span>
            <span v-if="isSeasonal">
              Seasonal
            </span>
          </div>
          <h1 v-if="isNew" class="text-4xl font-extrabold">
            NEW ARRIVALS
          </h1>
          <h1 v-if="isSeasonal" class="text-4xl font-extrabold">
            IN SEASON
          </h1>
        </div>
      </div>
      <div class="flex mt-15 relative">
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
      <MainSlider />
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const { searchProductForm } = searchForm();
const { getFilteredProducts } = productApi();
const { debouncedSearch } = useGetSearchedProducts();

import { useRoute } from "vue-router";
import { computed, watch } from "vue";
import { searchForm } from "@/widgets/navigation/model/search.form.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { clearSearchProductForm } from "@/features/use-navigation/lib/clear.search.ts";
import { useGetSearchedProducts } from "@/features/use-navigation/model/search-product.ts";

import MainSlider from "@/widgets/navigation/ui/MainSlider.vue";
import del from '@/assets/icons/delete-close/clean_search.svg';
import search from "@/assets/icons/nav/search.png";

watch(() => searchProductForm.value.search, async (newValue) => {
  if(newValue) {
    await debouncedSearch();
  }else{
    await getFilteredProducts('ALL', 'Availability');
  }
})

const isNew = computed(() => route.name === 'shop/new-collections')
const isSeasonal = computed(() => route.name === 'shop/seasonal-collections')
</script>

<style scoped>

</style>