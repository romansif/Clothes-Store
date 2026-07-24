<script setup lang="ts">
import { useProductsModals } from "../../composables/modals/products/productsModals.ts";

import star from '../../../app/assets/icons/notification/star.svg';
import close from '../../../app/assets/icons/notification/close.svg';
import transit from '../../../app/assets/icons/notification/transit.svg';

const { notifyTitle, notifyMessage, notifyRoute, closeNotify } = useProductsModals();
</script>

<template>
  <div @click="closeNotify" class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex justify-center py-10">
    <div class="bg-white w-[607px] h-[112px] p-2 rounded-lg">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <img :src="star" alt="" class="w-[30px]">
            <h1 class="font-bold">{{ notifyTitle }}</h1>
          </div>
          <div class="flex gap-2 items-center">
            <router-link @click="closeNotify" :to="notifyRoute">
              <img :src="transit" alt="" class="w-[30px]">
            </router-link>
            <img @click="closeNotify" :src="close" alt="" class="w-[20px]">
          </div>
        </div>
        <div class="flex p-2">
          <span class="font-medium text-sm">{{ notifyMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>