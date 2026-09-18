import { ref } from "vue";
import type {
    CancelChoiceForm,
    CancelChoiceFormMessage,
    ReviewForm, ReviewFormMessage
} from "@/features/use-order/model/order.types.form.ts";

export const cancelChoiceForm = ref<CancelChoiceForm>({
    cancelChoice: ''
})

export const cancelChoiceMessage = ref<CancelChoiceFormMessage>({
    cancelChoice: ''
});


export const reviewForm = ref<ReviewForm>({
    rating: 0,
    comment: ''
})

export const reviewFormMessages = ref<ReviewFormMessage>({
    rating: '',
    comment: ''
})