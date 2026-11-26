import { ref } from "vue";
import type { ReviewForm, ReviewFormMessage } from "@/features/add-review";

export const reviewForm = ref<ReviewForm>({
  rating: 0,
  comment: "",
});

export const reviewFormMessages = ref<ReviewFormMessage>({
  rating: "",
  comment: "",
});
