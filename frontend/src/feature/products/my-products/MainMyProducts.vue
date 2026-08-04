<script setup lang="ts">
import { onMounted } from "vue";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { useProfileModals } from "@/shared/composables/modals/profile.modals";
import { useBaseModals } from "@/shared/composables/modals/base.modals";

import NavBar from "../../navigation/NavBar.vue";
import OutOfStackList from "./lists/OutOfStackList.vue";
import icon_products from "@/app/assets/icons/products/icon-products.svg";
import EditProduct from "@/shared/ui/products-modals/EditProduct.vue";
import DeleteModal from "@/shared/ui/base/base-modals/DeleteModal.vue";
import StackList from "@/feature/products/my-products/lists/StackList.vue";
import Loading from "@/shared/ui/base/base-modals/Loading.vue";

const { deleteChoice } = useProfileModals();
const { loading, loadData } = useBaseModals();
const { stack, outOfStack } = productsStore();
const { getMyStackProducts, getMyOutOfStackProducts } = useProducts();

onMounted(async () => {
  try{
    await getMyStackProducts();
    await getMyOutOfStackProducts();
  }finally {
    await loadData()
  }
})
</script>

<template>
  <Loading v-if="loading" />
  <div v-else class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
    <div v-if="stack.length > 0 || outOfStack.length > 0" class="flex mt-10">
      <StackList />
      <div v-if="stack.length > 0 && outOfStack.length > 0" class="border-l"></div>
      <OutOfStackList />
    </div>
    <div v-else class="flex justify-center pt-80">
      <div class="flex flex-col items-center gap-5">
        <img :src="icon_products" alt="">
        <div class="flex flex-col gap-2 items-center">
          <span class="font-bold">You haven't created any product cards</span>
          <span class="text-[#A3A3A3]">It’s the perfect time to start building your own business.</span>
          <span class="text-[#A3A3A3]">To do this, go to your profile and tap "CREATE PRODUCT COVER".</span>
        </div>
      </div>
    </div>
  </div>
  <Transition>
    <DeleteModal v-if="deleteChoice"/>
  </Transition>
  <Transition>
    <EditProduct />
  </Transition>
</template>

<style scoped>
/* мы объясним, что делают эти классы дальше! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>