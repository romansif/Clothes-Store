<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center gap-1">
      <h2 class="text-lg">Add Photos</h2>
      <span class="text-[#A3A3A3]">(optional)</span>
    </div>
    <div class="flex gap-2.5">
      <div class="flex flex-col gap-8 mt-auto">
        <span class="text-sm text-[#A3A3A3] w-75">
          Add up to 4 photos. JPG, PNG or WEBP.
          Max 10 MB each.
        </span>
        <div class="flex gap-2.5">
          <div v-for="index in [1, 2, 3, 4]" :key="index" @click="openSelectImage(index)"
               class="bg-gray-50 h-22.5 w-22.5 border border-gray-300 transition duration-400 hover:scale-105
                         hover:bg-gray-100 cursor-pointer overflow-hidden rounded-lg">
            <img v-if="itemPreview[index]" :src="itemPreview[index]" alt=""
                 class="h-22.5 w-22.5 transition duration-400">
            <div v-else class="flex justify-center py-6.5 font-extralight">
                <span class="text-4xl text-[#A3A3A3]">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { itemPreview } from "@/shared/lib/helper/product-helper.ts";

const emit = defineEmits<{
  openSelect: [index: number];
}>();

const openSelectImage = (index: number) => {
  emit('openSelect', index);
};
</script>

<style scoped>

</style>