<template>
  <div :class="['bg-[#F0F0F0] font-raleway', springCatalog.length ? '' : 'h-screen']">
    <Loading v-if="loading" />
    <div v-else-if="componentError" class="flex flex-col items-center justify-center pt-80 p-6 text-red-700 rounded-xl">
      <span class="text-lg font-semibold mb-2">
        Something went wrong 😔
      </span>
      <p class="text-sm mb-4">{{ componentError }}</p>
      <button @click="resetError('FILTER')"
              class="px-4 py-2 mt-5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Try again
      </button>
    </div>
    <div v-else class="xl:px-6 xl:py-6 lg:px-6 lg:py-6 md:px-5 md:py-5 sm:px-4 px-4 py-4">
      <MainNavBar />
      <main class="flex flex-col gap-6 mt-14">
        <SeasonsHeader />
        <div :class="['flex gap-10', springCatalog.length ? '' : 'justify-center']">
          <SpringList />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { loading } = useBaseModals();
const { getSeasonal } = useGetProduct();
const { springCatalog } = productStore();
const { componentError, resetError } = errorHandler();

import { onMounted } from "vue";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";

import MainNavBar from "@/widgets/navigation/ui/MainNavBar.vue";
import SeasonsHeader from "@/entities/collection/ui/SeasonsHeader.vue";
import Loading from "@/widgets/Loading.vue";
import SpringList from "@/entities/collection/ui/SpringList.vue";

onMounted(async () => {
  await getSeasonal('Spring');
})
</script>

<style scoped>

</style>