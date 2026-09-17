import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";

const { cart } = cartStore();
const { userData } = userStore();
const { loading } = useBaseModals();

export const useGetCart = () => {
    const getCartProducts = async () => {
        loading.value = true;

        try{
            if(!userData.value) return;

            cart.value = await handler(`/cart/${userData.value.id}`, {
                method: 'GET',
            });
        }catch(err){
            console.error(`Failed to get the cart products:`, err);
        }finally {
            loading.value = false;
        }
    };

    return {
        getCartProducts,
    }
}