<template>
  <div class="bg-[#F0F0F0] h-screen">
    <Loading v-if="loading" />
    <div v-else class="xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
      <div v-if="myProducts.length > 0" class="flex mt-10">
        <MyProductsList />
      </div>
      <div v-else class="flex justify-center pt-80">
        <div class="flex flex-col items-center gap-5">
          <img :src="icon_products" alt="">
          <div class="flex flex-col gap-2 items-center">
            <span class="font-bold">You haven't created any product cards</span>
            <span class="text-[#A3A3A3]">It’s the perfect time to start building your own business.</span>
            <span class="text-[#A3A3A3]">To do this, go to your useProfile and tap "CREATE PRODUCT COVER".</span>
          </div>
        </div>
      </div>
    </div>
    <Transition name="notify">
      <DeleteModal v-if="deleteChoice"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { loading } = useBaseModals();
const { myProducts } = productStore();
const { getMyProducts } = productsApi();
const { deleteChoice } = useProfileModals();

import { onMounted } from "vue";
import { productsApi } from "@/feature/products/api/products.api.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";
import { useProfileModals } from "@/feature/profile/lib/profile.modals.ts";;

import MainNavBar from "@/feature/navigation/ui/MainNavBar.vue";
import icon_products from "@/assets/icons/products/icon-products.svg";
import DeleteModal from "@/shared/ui/DeleteModal.vue";
import MyProductsList from "@/feature/products/ui/MyProductsList.vue";
import Loading from "@/shared/ui/Loading.vue";

onMounted(async () => {
  loading.value = true;

  await getMyProducts();

  loading.value = false;
})
</script>

<style scoped>

</style>