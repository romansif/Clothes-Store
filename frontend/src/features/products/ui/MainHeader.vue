<template>
    <header class="font-raleway flex flex-col xl:flex-row xl:gap-29">
        <div class="flex flex-col">
            <div class="flex flex-col">
                <div class="flex flex-col items-center gap-2 xl:items-start">
                    <div class="flex gap-2 font-semibold">
                        <router-link :to="{ name: 'home' }" class="text-[#A3A3A3]">
                            Home
                        </router-link>
                        <span>/</span>
                        <span> Products </span>
                    </div>
                    <h1 class="text-4xl font-extrabold">SHOP ALL</h1>
                </div>
            </div>
            <div class="relative mt-15 flex">
                <img :src="search" alt="" class="absolute top-1/2 left-4 -translate-y-1/2" />
                <input
                    v-model="searchProductForm.search"
                    type="text"
                    placeholder="Search"
                    class="font-dm-sans h-12.5 border-b-2 border-[#D9D9D9] px-13 transition duration-400 outline-none sm:placeholder:px-114 md:placeholder:px-134 lg:placeholder:px-195 xl:w-92.5 xl:placeholder:px-62"
                />
                <img
                    v-if="searchProductForm.search"
                    :src="del"
                    alt=""
                    class="absolute top-1/4 left-85 w-6.25 cursor-pointer"
                    @click="clearSearchProductForm"
                />
            </div>
        </div>
        <div class="mt-12 flex h-10 flex-col gap-5 sm:h-35 xl:mt-5 xl:h-53.75">
            <div class="flex items-center gap-5 xl:hidden" @click="toggleFilterAside">
                <span class="font-bold"> Filter </span>
                <img :src="right_arrow" alt="" />
            </div>
            <div class="hidden gap-x-5 gap-y-2 font-medium sm:grid sm:grid-cols-4 xl:mt-19">
                <button
                    v-for="(isActive, categoryName) in category"
                    :class="[
                        categoryAndCollectionClass,
                        isActive ? selectedCategoryAndCollectionClass : '',
                    ]"
                    @click="toggleFilter('ALL', categoryName)"
                >
                    All
                </button>
                <button
                    v-for="(isActive, categoryName) in categories"
                    :class="[
                        categoryAndCollectionClass,
                        isActive ? selectedCategoryAndCollectionClass : '',
                    ]"
                    @click="toggleFilter('CATEGORY', categoryName)"
                >
                    {{ categoryName }}
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { filterProduct } from "@/shared/lib/filter-product";
import { useGetProducts } from "@/widgets/product-list/api/get-product";
import {
    categoryAndCollectionClass,
    selectedCategoryAndCollectionClass,
} from "@/widgets/filter-products/model/filter-item.variants";
import { clearSearchProductForm } from "@/features/search-product/lib/clear-search";
import { toggleFilterAside } from "@/features/products/lib/product-modal";
import { searchProductForm } from "@/features/search-product/model/search-form";
import { debouncedSearch, getSearchedProducts } from "@/features/search-product/api/search-product";

import del from "@/assets/icons/delete-close/clean_search.svg";
import search from "@/assets/icons/nav/search.png";
import right_arrow from "@/assets/icons/arrows/arrow-right.svg";

const { getFilteredProducts, products } = useGetProducts();
const { toggleFilter, categories, category } = filterProduct();

watch(debouncedSearch, async (value) => {
    if (!value) {
        await getFilteredProducts("ALL", "ALL");
    } else {
        await getSearchedProducts(products);
    }
});
</script>
