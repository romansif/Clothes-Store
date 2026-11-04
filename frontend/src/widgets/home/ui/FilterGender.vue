<template>
  <div class="flex gap-5 border-b border-gray-300 py-3 text-lg">
    <button @click="selectGender('ALL', 'ALL')" :class="[filterGenderClass, selectedGender === 'ALL' ? selectedFilterGenderClass : 'text-[#A3A3A3]']">
      {{ t("home.gender.all") }}
    </button>
    <button
      @click="selectGender('GENDER', 'Man')"
      :class="[filterGenderClass, selectedGender === 'Man' ? selectedFilterGenderClass : 'text-[#A3A3A3]']"
    >
      {{ t("home.gender.man") }}
    </button>
    <button
      @click="selectGender('GENDER', 'Woman')"
      :class="[filterGenderClass, selectedGender === 'Woman' ? selectedFilterGenderClass : 'text-[#A3A3A3]']"
    >
      {{ t("home.gender.woman") }}
    </button>
    <button
      @click="selectGender('GENDER', 'Kids')"
      :class="[filterGenderClass, selectedGender === 'Kids' ? selectedFilterGenderClass : 'text-[#A3A3A3]']"
    >
      {{ t("home.gender.kids") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { filterProduct } from "@/widgets/filter-products/lib/filter-product";
import { filterGenderClass, selectedFilterGenderClass } from "@/widgets/home/model/filter-gender.variants";

const { t } = useI18n();
const { selectGender, selectedGender } = filterProduct();
</script>
