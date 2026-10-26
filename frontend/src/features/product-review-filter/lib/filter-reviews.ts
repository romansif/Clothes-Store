import { ref } from "vue";
import { reviewFilter } from "@/features/product-review-filter/model/review-filter.store";

export const filterReviews = () => {
    const reviewsType = ref<Record<string, boolean>>({
        'All reviews': true,
        'With photos': false,
        Latest: false,
        'Highest rated': false,
        'Lowest rated': false,
    });

    const setActiveKey = (targetObj: Record<string, boolean>, selectedKey: string) => {
        Object.keys(targetObj).forEach(key => {
            targetObj[key] = key === selectedKey
        });
    };

    const toggleFilter = async (value: string) => {
        setActiveKey(reviewsType.value, value);

        reviewFilter.value = value;
    };

    return {
        reviewsType,
        toggleFilter,
    }
}