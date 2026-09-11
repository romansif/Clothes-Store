<template>
  <div class="flex flex-col gap-6 bg-white w-full p-6.5 rounded shadow-xl">
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-semibold">Image slots</h1>
      <h2 class="text-sm text-[#A3A3A3] font-medium">
        5 slots: 1 main photo + 4 additional ones. Click on a slot to select a file
      </h2>
    </div>
    <div class="flex gap-6">
      <div @click="openSelectProductCard(0)" :key="0" class="bg-gray-50 h-90 w-90 border border-gray-300 transition duration-400 hover:scale-105
                          hover:bg-gray-100 cursor-pointer overflow-hidden rounded-lg">
        <img v-if="pureCards(product)[0]" :src="pureCards(product)[0]" alt=""
             class="h-90 w-90 transition duration-400">
        <div v-else class="p-4 text-mauve-100">
          <span class="bg-black font-bold px-2 py-1.5 rounded-full">
            Main Photo
          </span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="index in [1, 2, 3, 4]" :key="index" @click="openSelectProductCard(index)"
             class="bg-gray-50 h-43.5 w-43.5 border border-gray-300 transition duration-400 hover:scale-105
                       hover:bg-gray-100 cursor-pointer overflow-hidden rounded-lg">
          <img v-if="pureCards(product)[index]" :src="pureCards(product)[index]" alt=""
               class="h-43.5 w-43.5 transition duration-400">
          <div v-else class="p-4 text-mauve-500">
            <span class="bg-gray-100 font-bold px-2 py-1.5 rounded-full border border-gray-400">
              Photo {{ index }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h2 class="text-sm text-[#A3A3A3] font-medium">The first photo is used in the catalog</h2>
      <h2 class="text-sm text-[#A3A3A3] font-medium">Formats: JPG · PNG · WEBP Max. size: 5 MB Aspect ratio: 4:5</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { openSelectProductCard } from "@/features/use-product-form/lib/toggle.imge.product.ts";
import { productStore } from "@/features/use-all-product/model/product.store.ts";
import { productHelper } from "@/features/use-product/lib/product.helper.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

const props = defineProps<{
  product: Product,
}>();

const { activeProductImg } = productStore();
const { pureCards, productInfoPreview } = productHelper();

onMounted(async () => {
  if(props.product && Array.isArray(props.product.images) && props.product.images[0]) {
    activeProductImg.value = productInfoPreview(props.product) ?? '';
  }
})
</script>

<style scoped>

</style>