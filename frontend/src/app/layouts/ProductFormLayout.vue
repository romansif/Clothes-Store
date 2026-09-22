<template>
  <Loading v-if="loading" />
  <div class="font-dm-sans fixed inset-0">
    <div class="py-2 px-4 bg-[#F0F0F0] shadow-md overflow-hidden h-full overflow-y-auto no-scrollbar">
      <div class="flex">
        <router-link @click="clearProductForm" :to="{ name: 'my/products' }" class="text-start ml-auto h-fit w-fit px-10 py-2 bg-[#3B3C36] text-white
              font-medium text-xs rounded-md cursor-pointer transition duration-300 transform hover:scale-108 hover:bg-[#1d1e1b]">
          Exit
        </router-link>
      </div>
      <div class="flex justify-center">
        <main class="flex flex-col gap-5">
          <router-view />
        </main>
      </div>
    </div>
  </div>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearProductForm } from "@/features/use-product-form/lib/clear-product-form.ts";

import Notification from "@/widgets/ui/base-component/Notification.vue";
import Loading from "@/widgets/ui/base-component/Loading.vue";

const { loading, notify } = useBaseModals();
</script>

<style scoped>

</style>