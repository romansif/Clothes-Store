<template>
  <div class="bg-[#F0F0F0] h-screen">
    <Loading v-if="loading"/>
    <div v-else>
      <MainNavBar class="hidden xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 lg:block" />
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
            <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10">
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
                <router-link v-if="!userData.id" :to="{name: 'signIn'}">
                <span class="bg-black font-semibold text-sm py-8 px-46 text-white font-[Montserrat] lg:block">
                  ADD TO CART
                </span>
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
  </div>
</template>

<script setup lang="ts">
const { userData } = userStore();
const { notify, loading } = useBaseModals();
const { product, activeProductImg } = productStore();
const { changeImg, angelCards } = productsCover();

import { useRouter } from "vue-router";
import { productsCover } from "@/feature/product/model/product-cover.ts";
import { productStore } from "@/entities/product/product.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { userStore } from "@/entities/profile/user.store.ts";

import ProductInfo from "@/feature/product/ui/ProductInfo.vue";
import cart from '@/assets/icons/nav/cart.png';
import MainNavBar from "@/feature/navigation/ui/MainNavBar.vue";
import profile from '@/assets/icons/nav/profile.png';
import go_to_shop from '@/assets/icons/arrows/right-long-arrow.png';
import Notification from "@/shared/ui/Notification.vue";
import Loading from "@/shared/ui/Loading.vue";

const router = useRouter();

const routerBack = () => {
  router.back();
}
</script>
<style scoped>

</style>