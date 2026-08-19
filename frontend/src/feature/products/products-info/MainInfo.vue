<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { productsCover } from "@/shared/composables/product.cover.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { useBaseModals } from "@/shared/composables/modals/base.modals";

import ProductInfo from "./ProductInfo.vue";
import cart from '@/app/assets/icons/nav/cart.png';
import NavBar from "../../navigation/NavBar.vue";
import profile from '@/app/assets/icons/nav/profile.png';
import go_to_shop from '@/app/assets/icons/arrows/right-long-arrow.png';
import Notification from "@/shared/ui/base/base-modals/Notification.vue";
import Loading from "@/shared/ui/base/base-modals/Loading.vue";

const { getProduct } = useProducts();
const { notify, loading } = useBaseModals();
const { product, activeProductImg } = productsStore();
const { changeImg, productInfoPreview, angelCards } = productsCover();

const router = useRouter();

const userId = localStorage.getItem("userId");

onMounted(async () => {
  loading.value = true;

  await getProduct();

  if(product.value && Array.isArray(product.value.images) && product.value.images[0]) {
    activeProductImg.value = productInfoPreview.value(product.value) ?? '';
  }

  loading.value = false;
})

const routerBack = () => {
  router.back();
}
</script>

<template>
  <Loading v-if="loading"/>
  <div v-else>
    <NavBar class="hidden xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 lg:block" />
    <div class="font-[Montserrat] flex flex-col lg:flex-row lg:justify-center lg:items-center lg:mt-25">
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
      <div class="flex justify-center items-cente">
        <div class="overflow-y-auto no-scrollbar mt-6 lg:mt-0 lg:w-300">
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <div v-if="product && product.id && product.id.length > 0" class="flex gap-18 lg:gap-20">
              <div class="flex flex-col items-center gap-3">
                <img :src="activeProductImg" alt="" class="w-97.5">
              </div>
              <div class="flex flex-col justify-between">
                <div v-for="(img, index) in angelCards(product)" :key="index" class="h-21.25 w-18">
                  <img @click="changeImg(index)" :src="img" alt="" class="opacity-70 transition duration-400 hover:scale-120">
                </div>
              </div>
            </div>
            <ProductInfo />
            <div class="flex justify-center lg:hidden">
              <router-link v-if="!userId" :to="{name: 'signIn'}">
                <span class="bg-black font-semibold text-sm py-5 px-46 text-white font-[Montserrat] lg:block">ADD TO CART</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>

</style>