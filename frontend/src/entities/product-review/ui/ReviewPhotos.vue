<template>
  <div @click="emit('toggleReview', [], 0)" class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
    <div @click.stop class="flex items-center justify-center gap-15">
      <div class="flex rounded-xl bg-white">
        <img :src="images[currentIndex]" alt="" class="h-190 w-160" />
      </div>
      <div class="flex flex-col gap-9">
        <img
          v-for="thumb in thumbnails"
          :key="thumb.index"
          :src="thumb.src"
          alt=""
          class="h-30 w-30 cursor-pointer rounded object-cover opacity-60 transition duration-300 hover:opacity-100"
          @click="emit('changePhoto', 'select', reviewImages, thumb.index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ratingHelper } from "@/entities/product-review/lib/rating-helper";
import type { ImageItem } from "@/entities/product-review";

const props = defineProps<{
  currentIndex: number;
  reviewImages: ImageItem[];
}>();

const emit = defineEmits<{
  toggleReview: [array: [], index: number];
  changePhoto: [type: "next" | "prev" | "select", images: ImageItem[], index: number];
}>();

const { reviewAngel } = ratingHelper();
const images = computed(() => reviewAngel(props.reviewImages));

const thumbnails = computed(() => images.value.map((src, index) => ({ src, index })).filter(({ index }) => index !== props.currentIndex));
</script>
