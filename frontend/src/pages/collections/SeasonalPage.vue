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
        <div class="flex flex-col gap-12 mt-10">
          <section v-if="autumnSelection.length > 0" class="font-raleway flex flex-col text-5xl">
            <div class="flex flex-col font-extrabold border-b border-gray-300 pb-5">
              <span>AUTUMN</span>
            </div>
            <AutumnList />
          </section>
          <section v-if="winterSelections.length > 0" class="font-raleway flex flex-col text-5xl">
            <div class="flex flex-col font-extrabold border-b border-gray-300 pb-5">
              <span>WINTER</span>
            </div>
            <WinterList />
          </section>
          <section v-if="springSelection.length > 0" class="font-raleway flex flex-col text-5xl">
            <div class="flex flex-col font-extrabold border-b border-gray-300 pb-5">
              <span>SPRING</span>
            </div>
            <SpringList />
          </section>
          <section v-if="summerSelection.length > 0" class="font-raleway flex flex-col text-5xl">
            <div class="flex flex-col font-extrabold border-b border-gray-300 pb-5">
              <span>SUMMER</span>
            </div>
            <SummerList />
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderSelections from "@/widgets/header/HeaderSelections.vue";

const { loading } = useBaseModals();
const { componentError, resetError } = errorHandler();
const { autumnSelection, winterSelections, springSelection, summerSelection } = productStore();

import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";

import Loading from "@/widgets/Loading.vue";
import MainNavBar from "@/widgets/navigation/ui/MainNavBar.vue";
import WinterList from "@/entities/collection/WinterList.vue";
import SpringList from "@/entities/collection/SpringList.vue";
import SummerList from "@/entities/collection/SummerList.vue";
import AutumnList from "@/entities/collection/AutumnList.vue";
import {productStore} from "@/entities/product/model/product.store.ts";
</script>

<style scoped>

</style>