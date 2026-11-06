<template>
  <div
    @click="emit('toggleReview', [], 0)"
    class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
  >
    <div @click.stop class="flex items-center justify-center gap-15">
      <div class="flex rounded-xl bg-white">
        <img :src="images[props.currentIndex]" alt="" class="h-190 w-160" />
      </div>
      <div class="flex flex-col gap-9">
        <img
          v-for="thumb in thumbnails"
          :key="thumb.index"
          :src="thumb.src"
          alt=""
          class="h-30 w-30 cursor-pointer rounded object-cover opacity-60 transition duration-300 hover:opacity-100"
          @click="emit('changePhoto', 'select', props.reviewImages, thumb.index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageItem } from "@/entities/product-review";
import {useReviewPhotos} from "@/entities/product-review/lib/review-photo";

const props = defineProps<{
  currentIndex: number;
  reviewImages: ImageItem[];
}>();

const emit = defineEmits<{
  toggleReview: [array: [], index: number];
  changePhoto: [type: "next" | "prev" | "select", images: ImageItem[], index: number];
}>();

const { images, thumbnails } = useReviewPhotos(props)
</script>
