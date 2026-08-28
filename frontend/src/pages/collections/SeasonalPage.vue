<template>
  <div class="bg-[#F0F0F0]">
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
    <div v-else class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
      <main class="flex flex-col gap-6 mt-12">
        <HeaderSelections />
        <div class="flex flex-col gap-14">
          <section class="font-raleway flex flex-col">
            <div class="flex flex-col gap-2.5">
              <h2 class="font-extrabold text-5xl">
                SEARCH RESULTS
              </h2>
              <span class="border-b-4 w-120"></span>
              <h3 class="text-2xl font-medium text-[#A3A3A3]">
                Products matching your selected filters and query
              </h3>
            </div>
            <SeasonalList />
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { loading } = useBaseModals();
const { componentError, resetError } = errorHandler();

import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";

import Loading from "@/widgets/Loading.vue";
import MainNavBar from "@/widgets/navigation/ui/MainNavBar.vue";
import HeaderSelections from "@/widgets/header/HeaderSelections.vue";
import SeasonalList from "@/entities/collection/SeasonalList.vue";
</script>

<style scoped>

</style>