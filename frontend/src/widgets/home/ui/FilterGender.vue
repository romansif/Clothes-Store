<template>
  <div class="flex gap-5 border-b border-gray-300 py-3 text-lg">
    <button
      :class="[filterGenderClass, selectedGender === 'ALL' ? selectedFilterGenderClass : 'text-[#A3A3A3]']"
      @click="selectGender('ALL', 'ALL')"
    >
      {{ t("home.gender.all") }}
    </button>
    <button
      :class="[filterGenderClass, selectedGender === 'Man' ? selectedFilterGenderClass : 'text-[#A3A3A3]']"
      @click="selectGender('GENDER', 'Man')"
    >
      {{ t("home.gender.man") }}
    </button>
    <button
      :class="[filterGenderClass, selectedGender === 'Woman' ? selectedFilterGenderClass : 'text-[#A3A3A3]']"
      @click="selectGender('GENDER', 'Woman')"
    >
      {{ t("home.gender.woman") }}
    </button>
    <button
      :class="[filterGenderClass, selectedGender === 'Kids' ? selectedFilterGenderClass : 'text-[#A3A3A3]']"
      @click="selectGender('GENDER', 'Kids')"
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
