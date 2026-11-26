import { reviewForm, reviewFormMessages } from "@/features/add-review";
import { imageFiles, itemPreview } from "@/shared/lib";

export const clearReviewForm = () => {
  reviewForm.value.rating = 0;
  reviewForm.value.comment = "";
  imageFiles.value = [];
  itemPreview.value = [];

  reviewFormMessages.value.rating = "";
  reviewFormMessages.value.comment = "";
};
