import { ref } from "vue";
import type {ImageItem} from "@/entities/product-review/model/reviews.types.ts";

export const reviewModal = ref<boolean>(false);
export const reviewImages = ref<ImageItem[]>([]);
export const currentIndex = ref<number>(0);

export const toggleReviewPhotos = (images: ImageItem[] | undefined, index: number) => {
    reviewModal.value = !reviewModal.value;

    if(!images) return;
    reviewImages.value = images;
    currentIndex.value = index
};

export const changeReviewPhoto = (type: string, images: ImageItem[] | undefined) => {
    if (!images?.length) return;

    if (type === "next") {
        currentIndex.value += 1;

        if(currentIndex.value >= images.length) {
            currentIndex.value = 0;
        }
    }

    if (type === "prev") {
        currentIndex.value -= 1;

        if (currentIndex.value < 0) {
            currentIndex.value = images.length - 1;
        }
    }
};