<script setup lang="ts">
import BaseButton from "../../button/BaseButton.vue";

const BASE_URL = 'http://localhost:3000';

import { computed } from "vue";
import { useGetProducts } from "../../../../feature/products/composables/getProducts.ts";
import { productsStore } from "../../../composables/stores/products.store.ts";

const { getProductId } = useGetProducts();
const { orders } = productsStore();

const items = computed(() => {
  if(Array.isArray(orders.value)) {
    return orders.value.flatMap(order => order.orderItems || []);
  }
})

const productPreview = computed(() => {
  return(id: string) => {
    if(!id){
      console.log('Id не найден')
      return
    }

    const product = items.value?.find(p => p.id === id)
    if(product && Array.isArray(product.images) && product.images[0]){
      return `${BASE_URL}/${product.images[0]}`
    }
  }
});
</script>

<template>
  <li v-for="order in orders" :key="order.id" class="flex flex-col">
    <div class="flex bg-gray-50 p-3 border-b border-gray-300">
      <div class="flex flex-col gap-2">
        <div class="flex gap-4">
          <span class="font-medium">№ {{ order.id.slice(0, 8) }}</span>
          <span class="text-xs px-2.5 py-1 rounded-md" :class="[
                  {
                    'bg-teal-50 text-teal-700 border border-teal-200' : order.status === 'Delivered',
                    'bg-sky-50 text-sky-700 border border-sky-200' : order.status === 'En route',
                     'bg-indigo-50 text-indigo-700 border border-indigo-200' : order.status === 'Convene',
                  }
              ]">
                {{ order.status }}
              </span>
        </div>
        <span class="text-xs text-[#A3A3A3]">Processed: {{ order.dateCreatedOrder }}, {{ order.timeCreatedOrder }}</span>
      </div>
      <div class="flex flex-col gap-2 ml-auto">
        <span class="text-[#A3A3A3]">Order total</span>
        <span class="font-bold ml-auto">$ {{ order.orderTotal }}</span>
      </div>
    </div>
    <div @click="getProductId(item.productId)" v-for="item in order.orderItems" :key="item.id">
      <router-link :to="{ name: '/products/ProductsInfoPage' }">
        <div class="flex py-5 px-3">
          <div class="flex gap-5">
            <img :src="productPreview(item.id)" alt="" class="w-[120px] rounded-2xl border border-gray-400">
            <div class="flex flex-col mt-15 gap-5">
              <div class="flex flex-col gap-1">
                <span class="font-medium">{{ item.title }}</span>
                <span class="text-[#A3A3A3]">{{ item.description }}</span>
              </div>
              <div class="flex gap-6 text-sm">
                <div class="px-2.5 py-0.5 bg-[#F0F0F0] rounded">
                  Size: <span>{{ item.size }}</span>
                </div>
                <div class="px-2.5 py-0.5 bg-[#F0F0F0] rounded">
                  <span>Color: <span class="font-medium">{{ item.color }}</span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2 ml-auto mt-15">
            <span class="font-medium">$ {{ item.price }}</span>
            <span class="text-[#A3A3A3] ml-auto">{{ item.quantity }} pcs.</span>
          </div>
        </div>
      </router-link>
    </div>
    <div class="flex bg-gray-50 p-3 border-t border-gray-300">
     <BaseButton name="Repeat Order" variant="repeatOrder" />
    </div>
  </li>
</template>

<style scoped>

</style>