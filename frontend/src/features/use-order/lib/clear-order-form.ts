import {
    cancelChoiceForm,
    cancelChoiceMessage,
    reviewForm,
    reviewFormMessages
} from "@/features/use-order/model/order.forms.ts";

export const clearReplaceForm = () => {
    cancelChoiceForm.value.cancelChoice = '';
    cancelChoiceMessage.value.cancelChoice = '';
}

export const clearReviewForm = () => {
    reviewForm.value.rating = 0;
    reviewForm.value.comment = '';

    reviewFormMessages.value.rating = '';
    reviewFormMessages.value.comment = '';
}