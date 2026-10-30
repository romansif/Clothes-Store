<template>
  <aside class="font-raleway mt-32.5 hidden xl:flex xl:flex-col">
    <span class="text-xl font-bold">Filters</span>
    <div class="mt-7 flex flex-col">
      <span class="font-medium">Size</span>
      <div class="mt-2 flex items-center gap-2">
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
    <div class="mt-3.5 border-b border-gray-400"></div>
    <div class="mt-3.5 flex flex-col gap-2 filter">
      <div class="flex items-center font-medium cursor-pointer" @click="toggleAvailabilityFilter()">
        <span class="font-bold">Availability</span>
        <img :src="arrow_down" alt=""
            class="ml-auto w-5 arrow"
            :class="{ rotated: showAvailability }"
        />
      </div>
      <div class="filter-body" :class="{ open: showAvailability }">
        <div class="filter-inner">
          <div class="flex flex-col gap-2">
            <div v-for="(isActive, stackName) in stackProducts" :key="stackName" class="flex gap-3">
              <img
                  :src="isActive ? checked : square"
                  alt=""
                  :class="[filterClass, isActive ? selectedFilterAndSizeClass : '']"
                  @click="toggleFilter('STATUS', stackName)"
              />
              <div class="flex gap-1">
                <span>{{ stackName }}</span>
                <span>
              (<span class="font-dm-sans font-medium text-blue-700">
                {{ getStackCount(products, stackName) }}
              </span>)
            </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3.5 border-b border-gray-400"></div>
    <div class="mt-3.5 flex flex-col gap-2 filter">
      <div class="flex items-center font-medium" @click="toggleGenderFilter()">
        <span class="font-bold">Gender</span>
        <img :src="arrow_down" alt="" class="ml-auto w-5 arrow"
             :class="{ rotated: showGender }" />
      </div>
      <div class="filter-body" :class="{ open: showGender }">
        <div class="filter-inner">
          <div class="flex flex-col gap-2">
            <div v-for="(isActive, genderName) in genders" class="flex gap-3">
              <img
                  :src="isActive ? checked : square"
                  alt=""
                  :class="[filterClass, isActive ? selectedFilterAndSizeClass : '']"
                  @click="toggleFilter('GENDER', genderName)"
              />
              <div class="flex gap-1">
                <span>{{ genderName }}</span>
                <span>
                  (<span class="font-dm-sans font-medium text-blue-700">
                    {{ products.filter((p) => p.gender === genderName).length }}
                  </span>)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3.5 border-b border-gray-400"></div>
    <div class="mt-3.5 flex flex-col gap-2 filter">
      <div class="flex items-center font-medium" @click="toggleColorFilter()">
        <span class="font-bold">Color</span>
        <img :src="arrow_down" alt="" class="ml-auto w-5 arrow"
             :class="{ rotated: showColor }" />
      </div>
      <div class="filter-body" :class="{ open: showColor }">
        <div class="filter-inner">
          <div class="grid grid-cols-2 gap-x-6 gap-y-2">
            <div v-for="(isActive, colorName) in colors" :key="colorName" class="flex gap-3">
              <img
                  :src="isActive ? checked : square"
                  alt=""
                  :class="[filterClass, isActive ? selectedFilterAndSizeClass : '']"
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
  </aside>
</template>

<script setup lang="ts">
import { sizes } from "@/shared/model/product-sizes.ts";
import { filterProduct } from "@/shared/lib/filter-product";
import { useProductsData } from "@/widgets/product-list/lib/use-product-data";
import {
  toggleAvailabilityFilter,
  toggleColorFilter,
  toggleGenderFilter
} from "@/widgets/filter-products/lib/show-filter";
import {
    filterSizeClass,
    filterClass,
    selectedFilterAndSizeClass,
} from "@/widgets/filter-products/model/filter-item.variants";
import { showAvailability, showColor, showGender } from "@/widgets/filter-products/model/filter.refs";

import square from "@/assets/icons/squares/square.png";
import checked from "@/assets/icons/squares/check-square.png";
import arrow_down from "@/assets/icons/arrows/arrow-down.svg"

const { products } = useProductsData();
const { toggleFilter, getStackCount, toggleSize, stackProducts, genders, colors } = filterProduct();
</script>
