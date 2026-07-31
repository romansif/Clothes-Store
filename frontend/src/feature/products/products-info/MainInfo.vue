<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGetProducts } from "../composables/get-products.ts";
import { useProducts } from "@/shared/composables/use.products.ts";
import { useUpdateProduct } from "../composables/use-update-product.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";

import ProductInfo from "./ProductInfo.vue";
import cart from '@/app/assets/icons/nav/cart.png';
import NavBar from "../../navigation/NavBar.vue";
import profile from '@/app/assets/icons/nav/profile.png';
import go_to_shop from '@/app/assets/icons/arrows/go-to-shop.png';
import Notification from "@/shared/ui/base-modals/Notification.vue";

const { notify } = useProductsModals();
const { getProduct } = useGetProducts();
const { changeImg } = useUpdateProduct();
const { product, activeProductImg } = productsStore();

const router = useRouter();

const userId = localStorage.getItem("userId");

onMounted(async () => {
  await getProduct();

  if(product.value && Array.isArray(product.value.images) && product.value.images[0]) {
    activeProductImg.value = useProducts.productInfoPreview.value(product.value) ?? '';
  }
})

const routerBack = () => {
  router.back();
}
</script>

<template>
  <NavBar class="hidden xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 lg:block" />
  <div class="font-[Montserrat] flex flex-col lg:flex-row lg:justify-center lg:items-center lg:mt-30">
    <div class="flex justify-between items-center px-4 pt-4 lg:hidden">
      <img @click="routerBack" :src=go_to_shop alt="" class="rotate-180">
      <div class="flex gap-2">
        <router-link :to="{name: 'cart'}">
          <img :src=cart alt="">
        </router-link>
        <router-link :to="{name: 'profile'}">
          <img :src=profile alt="">
        </router-link>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div class="w-[500px] h-[580px] overflow-y-auto no-scrollbar mt-6 lg:mt-0 lg:w-[1200px]">
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div v-if="product && product.id && product.id.length > 0" class="flex gap-18 lg:gap-20">
            <div class="flex flex-col items-center gap-3">
              <img :src="activeProductImg" alt="" class="w-[390px]">
            </div>
            <div class="flex flex-col justify-between">
              <div v-for="(img, index) in useProducts.angelCards.value(product)" :key="index" class="h-[85px] w-[72px]">
                <img @click="changeImg(index)" :src="img" alt="" class="opacity-70 transition duration-400 hover:scale-120">
              </div>
            </div>
          </div>
          <ProductInfo />
        <div class="flex justify-center lg:hidden">
          <router-link v-if="!userId" :to="{name: 'signIn'}">
            <span class="bg-black font-semibold text-sm py-5 px-46 text-white font-[Montserrat] lg:block cursor-pointer">ADD TO CART</span>
          </router-link>
        </div>
        </div>
      </div>
    </div>
  </div>
  <Transition>
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>