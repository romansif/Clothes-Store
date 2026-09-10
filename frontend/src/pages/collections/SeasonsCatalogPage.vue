<template>
  <div class="bg-[#F0F0F0] h-screen">
    <Loading v-if="loading" />
    <div v-else-if="componentError" class="font-raleway flex flex-col items-center justify-center pt-80 p-6 text-red-700 rounded-xl">
      <span class="text-lg font-semibold mb-2">
        Something went wrong 😔
      </span>
      <p class="text-sm mb-4">{{ componentError }}</p>
      <button @click="resetError('FILTER')"
              class="px-4 py-2 mt-5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Try again
      </button>
    </div>
    <div v-else class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
      <main class="flex flex-col gap-6 mt-14">
        <HeaderCatalog />
        <div class="flex gap-10">
          <SeasonsCatalog />
        </div>
      </main>
    </div>
    <Transition name="sidebar">
      <AsideFilter v-if="filterAside" />
    </Transition>
    <Transition name="notify">
      <Notification v-if="notify" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import SeasonsCatalog from "@/entities/collection/ui/SeasonsCatalog.vue";

const { filterAside } = useProductsModals();
const { notify, loading } = useBaseModals();
const { componentError, resetError } = errorHandler();

import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";

import Loading from "@/widgets/Loading.vue";
import MainNavBar from "@/widgets/navigation/ui/MainNavBar.vue";
import HeaderCatalog from "@/entities/collection/ui/HeaderCatalog.vue";
import AsideFilter from "@/widgets/AsideFilter.vue";
import Notification from "@/shared/ui/Notification.vue";
</script>

<style scoped>

</style>