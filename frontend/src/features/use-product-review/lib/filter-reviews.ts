import { ref } from "vue";
import { useGetReviews } from "@/features/use-product-review/api/get-reviews.ts";

const { getFilteredReviews } = useGetReviews();

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

    const toggleFilter = async (id: string | string[], value: string) => {
        setActiveKey(reviewsType.value, value);

        await getFilteredReviews(id, value)
    };

    return {
        reviewsType,
        toggleFilter,
    }
}