<template>
    <div class="flex gap-5 border-b border-gray-300 py-3 text-lg">
        <button
            @click="selectGender('ALL', 'ALL')"
            :class="[
                filterGenderClass,
                selectedGender === 'ALL' ? selectedFilterGenderClass : 'text-[#A3A3A3]',
            ]"
        >
            ( All )
        </button>
        <button
            @click="selectGender('GENDER', 'Man')"
            :class="[
                filterGenderClass,
                selectedGender === 'Man' ? selectedFilterGenderClass : 'text-[#A3A3A3]',
            ]"
        >
            Man
        </button>
        <button
            @click="selectGender('GENDER', 'Woman')"
            :class="[
                filterGenderClass,
                selectedGender === 'Woman' ? selectedFilterGenderClass : 'text-[#A3A3A3]',
            ]"
        >
            Woman
        </button>
        <button
            @click="selectGender('GENDER', 'Kids')"
            :class="[
                filterGenderClass,
                selectedGender === 'Kids' ? selectedFilterGenderClass : 'text-[#A3A3A3]',
            ]"
        >
            Kids
        </button>
    </div>
</template>

<script setup lang="ts">
import { filterProduct } from "@/shared/lib/filter-product";
import {
    filterGenderClass,
    selectedFilterGenderClass,
} from "@/widgets/home/model/filter-gender.variants";

const { selectGender, selectedGender } = filterProduct();
</script>
