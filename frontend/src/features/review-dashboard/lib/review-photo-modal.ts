import { ref } from "vue";

import type { ImageItem } from "@/entities/product-review";

export const reviewModal = ref<boolean>(false);
export const reviewImages = ref<ImageItem[]>([]);
export const currentIndex = ref<number>(0);

export const toggleReviewPhotos = (images: ImageItem[] | undefined, index: number) => {
    reviewModal.value = !reviewModal.value;

    if (!images) return;
    reviewImages.value = images;
    currentIndex.value = index;
};

export const changeReviewPhoto = (
    type: "next" | "prev" | "select",
    images: ImageItem[] | undefined,
    index: number,
) => {
    if (!images?.length) return;

    if (type === "select") {
        currentIndex.value = index;
        return;
    }

    if (type === "next") currentIndex.value = (index + 1) % images.length;
    if (type === "prev") currentIndex.value = (index - 1 + images.length) % images.length;
};