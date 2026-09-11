<template>
  <div class="bg-[#F0F0F0] h-screen">
    <div v-if="componentError" class="flex flex-col items-center justify-center pt-80 p-6 text-red-700 rounded-xl">
      <span class="text-lg font-semibold mb-2">
        Something went wrong 😔
      </span>
      <p class="text-sm mb-4">{{ componentError }}</p>
      <BaseButton name="Try again" variant="refresh" @click="resetError('CART_FAVORITE')" />
    </div>
    <div v-else class="font-raleway xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
      <router-view />
    </div>
    <Transition name="sidebar">
      <AsideFilter v-if="filterAside" />
    </Transition>
    <Transition name="notify">
      <SizeGuideModal v-if="guideModel"/>
    </Transition>
    <Transition name="notify">
      <Notification v-if="notify"/>
    </Transition>
    <Transition name="notify">
      <DeleteModal v-if="deleteChoice"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";

import Notification from "@/shared/ui/Notification.vue";
import AsideFilter from "@/widgets/AsideFilter.vue";
import MainNavBar from "@/widgets/navigation/ui/MainNavBar.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import DeleteModal from "@/shared/ui/DeleteModal.vue";
import SizeGuideModal from "@/features/use-product/ui/SizeGuideModal.vue";

const { notify } = useBaseModals();
const { deleteChoice } = useProfileModals();
const { componentError, resetError } = errorHandler();
const { filterAside, guideModel } = useProductsModals();
</script>

<style scoped>

</style>