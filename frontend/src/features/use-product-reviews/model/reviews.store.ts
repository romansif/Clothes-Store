import { ref } from "vue";
import type {ReviewFilter} from "@/features/use-product-reviews/model/reviews.types.ts";

const reviewsFilter: ReviewFilter[] = [
    {isActive: true, type: 'All', review: 'All reviews'},
    {isActive: false, type: 'Photos', review: `With Photos`},
    {isActive: false, type: 'Latest', review: 'Latest'},
    {isActive: false, type: 'Highest', review: `Highest rated`},
    {isActive: false, type: 'Lowest', review: 'Lowest rated'},
]

export const ratings = [
    1,
    2,
    3,
    4,
    5,
]

export const productId = ref<string>('');

export const ratingDirection = ref<'up' | 'down'>('up');

export const reviewsStore = () => {
    return {
        reviewsFilter,
    }
}