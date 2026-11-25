import { computed } from "vue";

import type { ImageItem } from "@/entities/product-review";
import { ratingHelper } from "@/entities/product-review/lib/rating-helper";

const { reviewAngel } = ratingHelper();

export const useReviewPhotos = (props: { currentIndex: number; reviewImages: ImageItem[] }) => {
  const images = computed(() => reviewAngel(props.reviewImages));

  const thumbnails = computed(() =>
    images.value.map((src, index) => ({ src, index })).filter(({ index }) => index !== props.currentIndex),
  );

  return {
    images,
    thumbnails,
  };
};
