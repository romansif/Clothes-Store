import { ref } from "vue";
import type { ReviewForm, ReviewFormMessage } from "@/entities/review-form";

export const reviewForm = ref<ReviewForm>({
    rating: 0,
    comment: "",
});

export const reviewFormMessages = ref<ReviewFormMessage>({
    rating: "",
    comment: "",
});
