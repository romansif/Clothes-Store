import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearReviewForm } from "@/features/use-order/lib/clear-order-form.ts";
import { reviewForm } from "@/features/use-order/model/order.forms.ts";

const { userData } = userStore();
const { productId } = orderStore();
const { openNotify } = useBaseModals();

export const useAddReview = () => {
    const createReview = async () => {
        if(!userData.value) return;

        try{
            await handler('/reviews', {
                method: 'POST',
                body: JSON.stringify({
                    productId: productId.value,
                    user: {
                        name: userData.value.name,
                        surName: userData.value.surName,
                        avatar: userData.value.avatarUrl,
                    },
                    rating: reviewForm.value.rating,
                    comment: reviewForm.value.comment,
                })
            });

            clearReviewForm();
            await openNotify('You have successfully add review for product.',
                'Thank you for providing your feedback helps other customers make the right choice', '')

        }catch(err){
            await openNotify('An error occurred.',
                'We are working on this issue please try again later.', '')
            console.error(`Failed to create the order:`, err);
        }
    };

    return {
        createReview
    }
}