<script setup lang="ts">
import { onMounted } from "vue";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { useBaseModals } from "@/shared/composables/modals/base.modals";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";

import NavBar from "@/feature/navigation/NavBar.vue";
import icon_products from "@/app/assets/icons/products/icon-products.svg";
import DeleteModal from "@/shared/ui/base/base-modals/DeleteModal.vue";
import MyProductsList from "@/feature/products/my-products/my-items/MyProductsList.vue";
import Loading from "@/shared/ui/base/base-modals/Loading.vue";

const { loading } = useBaseModals();
const { deleteChoice } = useProfileModals();
const { myProducts } = productsStore();
const { getMyProducts } = useProducts();

onMounted(async () => {
 await getMyProducts()
})
</script>

<template>
  <Loading v-if="loading" />
  <div v-else class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
    <div v-if="myProducts.length > 0" class="flex mt-10">
      <MyProductsList />
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
  <Transition name="notify">
    <DeleteModal v-if="deleteChoice"/>
  </Transition>
</template>

<style scoped>

</style>