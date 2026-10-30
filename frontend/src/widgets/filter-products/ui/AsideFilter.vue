<template>
    <aside class="fixed inset-0 z-50">
        <div class="font-raleway flex h-screen flex-col bg-white px-6 py-6 sm:w-76.25 md:w-82.5">
            <div class="flex items-center gap-5" @click="toggleFilterAside">
                <span class="cursor-pointer text-xl font-bold">Filters</span>
                <img :src="left_arrow" alt="" class="arrow w-5" :class="{ rotated: filterAside }" />
            </div>
            <div class="mt-6 flex flex-col sm:mt-7.5">
                <span class="font-medium">Size</span>
                <div class="mt-3.5 flex gap-4 sm:gap-1 md:gap-2">
                    <img
                        v-for="size in sizes"
                        :key="size.name"
                        :src="size.url"
                        alt=""
                        :class="[
                            filterSizeClass(size.class),
                            size.isActive ? selectedFilterAndSizeClass : '',
                        ]"
                        @click="toggleSize('SIZE', `${size.name}`)"
                    />
                </div>
            </div>
            <div class="mt-3.5 border-b border-gray-400 sm:mt-5"></div>
            <div class="mt-3.5 flex flex-col gap-2">
                <div class="flex items-center font-medium" @click="toggleAvailabilityFilter()">
                    <span class="font-bold">Availability</span>
                    <img
                        :src="arrow_down"
                        alt=""
                        class="arrow ml-auto w-5"
                        :class="{ rotated: showAvailability }"
                    />
                </div>
                <div class="filter-body" :class="{ open: showAvailability }">
                    <div class="filter-inner">
                        <div class="flex flex-col gap-2">
                            <div v-for="(isActive, stackName) in stackProducts" class="flex gap-3">
                                <img
                                    alt=""
                                    :src="isActive ? checked : square"
                                    :class="[
                                        filterClass,
                                        isActive ? selectedFilterAndSizeClass : '',
                                    ]"
                                    @click="toggleFilter('STATUS', stackName)"
                                />
                                <div class="flex gap-1">
                                    <span>{{ stackName }}</span>
                                    <span>
                                        (<span class="font-dm-sans font-medium text-blue-700">
                                            {{
                                                products.filter((p) =>
                                                    p.variants.every((v) => v.count !== 0),
                                                ).length
                                            }} </span
                                        >)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3.5 border-b border-gray-400"></div>
            <div class="mt-3.5 flex flex-col gap-2">
                <div class="flex items-center font-medium" @click="toggleGenderFilter()">
                    <span class="font-bold">Gender</span>
                    <img
                        :src="arrow_down"
                        alt=""
                        class="arrow ml-auto w-5"
                        :class="{ rotated: showGender }"
                    />
                </div>
                <div class="filter-body" :class="{ open: showGender }">
                    <div class="filter-inner">
                        <div class="flex flex-col gap-2">
                            <div v-for="(isActive, genderName) in genders" class="flex gap-3">
                                <img
                                    alt=""
                                    :src="isActive ? checked : square"
                                    :class="[
                                        filterClass,
                                        isActive ? selectedFilterAndSizeClass : '',
                                    ]"
                                    @click="toggleFilter('GENDER', genderName)"
                                />
                                <div class="flex gap-1">
                                    <span>{{ genderName }}</span>
                                    <span>
                                        (<span class="font-dm-sans font-medium text-blue-700">
                                            {{
                                                products.filter((p) => p.gender === genderName)
                                                    .length
                                            }} </span
                                        >)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3.5 border-b border-gray-400"></div>
            <div class="mt-3.5 flex flex-col gap-2">
                <div class="flex items-center font-medium" @click="toggleColorFilter()">
                    <span class="font-bold">Color</span>
                    <img
                        :src="arrow_down"
                        alt=""
                        class="arrow ml-auto w-5"
                        :class="{ rotated: showColor }"
                    />
                </div>
                <div class="filter-body" :class="{ open: showColor }">
                    <div class="filter-inner">
                        <div class="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div
                                v-for="(isActive, colorName) in colors"
                                :key="colorName"
                                class="flex gap-3"
                            >
                                <img
                                    alt=""
                                    :src="isActive ? checked : square"
                                    :class="[
                                        filterClass,
                                        isActive ? selectedFilterAndSizeClass : '',
                                    ]"
                                    @click="toggleFilter('COLOR', colorName)"
                                />
                                <div class="flex gap-1">
                                    <span>{{ colorName }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3.5 border-b border-gray-400"></div>
            <div class="mt-3.5 flex flex-col gap-2">
                <div class="flex items-center font-medium" @click="toggleCategoryFilter()">
                    <span class="font-bold">Category</span>
                    <img
                        :src="arrow_down"
                        alt=""
                        class="arrow ml-auto w-5"
                        :class="{ rotated: showCategory }"
                    />
                </div>
                <div class="filter-body" :class="{ open: showCategory }">
                    <div class="filter-inner">
                        <div
                            v-if="route.name === 'home'"
                            class="grid grid-cols-2 gap-x-6 gap-y-2 font-medium"
                        >
                            <button
                                v-for="(isActive, categoryName) in category"
                                :class="[
                                    sidebarCategoryClass,
                                    isActive ? selectedCategoryAndCollectionClass : '',
                                ]"
                                @click="toggleFilter('ALL', categoryName)"
                            >
                                All
                            </button>
                            <button
                                v-for="(isActive, categoryName) in categories"
                                :class="[
                                    sidebarCategoryClass,
                                    isActive ? selectedCategoryAndCollectionClass : '',
                                ]"
                                @click="toggleFilter('CATEGORY', categoryName)"
                            >
                                {{ categoryName }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { filterProduct } from "@/shared/lib/filter-product";
import { useProductsData } from "@/widgets/product-list/lib/use-product-data";
import { filterAside, toggleFilterAside } from "@/features/products/lib/product-modal";
import {
    toggleAvailabilityFilter,
    toggleCategoryFilter,
    toggleColorFilter,
    toggleGenderFilter,
} from "@/widgets/filter-products/lib/show-filter";
import {
    sidebarCategoryClass,
    selectedCategoryAndCollectionClass,
    filterSizeClass,
    selectedFilterAndSizeClass,
    filterClass,
} from "@/widgets/filter-products/model/filter-item.variants.ts";
import { sizes } from "@/shared/model/product-sizes";
import {
    showAvailability,
    showCategory,
    showColor,
    showGender,
} from "@/widgets/filter-products/model/filter.refs";

import square from "@/assets/icons/squares/square.png";
import left_arrow from "@/assets/icons/arrows/arrow-left.svg";
import checked from "@/assets/icons/squares/check-square.png";
import arrow_down from "@/assets/icons/arrows/arrow-down.svg";

const route = useRoute();

const { products } = useProductsData();
const { toggleFilter, toggleSize, stackProducts, genders, colors, category, categories } =
    filterProduct();
</script>
