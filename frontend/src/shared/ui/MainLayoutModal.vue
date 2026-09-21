
<template>
  <Transition name="sidebar">
    <AsideFilter v-if="filterAside" />
  </Transition>
  <Transition name="notify">
    <SizeGuideModal v-if="sizeGuideModel"/>
  </Transition>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
  <Transition name="notify">
    <DeleteModal v-if="deleteChoice"/>
  </Transition>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import { useProductsModals } from "@/features/use-main-product/lib/product-modal.ts";
import { sizeGuideModel } from "@/features/use-product/lib/toggle-more-info.ts";

import AsideFilter from "@/widgets/product/ui/AsideFilter.vue";
import Notification from "@/shared/ui/Notification.vue";
import SizeGuideModal from "@/entities/product/ui/SizeGuideModal.vue";
import DeleteModal from "@/shared/ui/DeleteModal.vue";

const { notify } = useBaseModals();
const { deleteChoice } = useProfileModals();
const { filterAside } = useProductsModals();
</script>

<style scoped>

</style>