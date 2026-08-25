<template>
  <div class="bg-[#F0F0F0] h-screen">
    <Loading v-if="loading" />
    <div v-else-if="componentError" class="flex flex-col items-center justify-center pt-80 p-6 text-red-700 rounded-xl">
      <span class="text-lg font-semibold mb-2">
        Something went wrong 😔
      </span>
      <p class="text-sm mb-4">{{ componentError }}</p>
      <button @click="resetError('FILTER')" class="px-4 py-2 mt-5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Try again
      </button>
    </div>
    <div v-else class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
      <div class="flex flex-col mt-12">
        <HeaderNewCollections />
        <NewCollectionList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainNavBar from "@/entities/navigation/ui/MainNavBar.vue";

const { loading } = useBaseModals();
const { componentError, resetError } = errorHandler();

import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";

import HeaderNewCollections from "@/entities/navigation/ui/HeaderNewCollections.vue";
import NewCollectionList from "@/entities/product/ui/NewCollectionList.vue";

</script>

<style scoped>

</style>