import {ref} from "vue";
import type {ReviewForm, ReviewFormMessage} from "@/entities/review-form/model/review-form.types.ts";

export const reviewForm = ref<ReviewForm>({
    rating: 0,
    comment: ''
})

export const reviewFormMessages = ref<ReviewFormMessage>({
    rating: '',
    comment: ''
})