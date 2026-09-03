import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { cartStore } from "@/entities/cart/model/cart.store.ts";

const { cart } = cartStore();
const { userData } = userStore();

export const useGetCart = () => {
    const getCartProducts = async () => {
        try{
            const res = await handler(`/cart/${userData.id}`, {
                method: 'GET',
            })
            console.log(res);
            cart.value = res;
        }catch(err){
            console.error(`Failed to get the cart products:`, err);
        }
    };

    return {
        getCartProducts,
    }
}