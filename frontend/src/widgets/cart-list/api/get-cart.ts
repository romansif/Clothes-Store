import { handler } from "@/shared/api/http";
import { userStore } from "@/shared/model/user.store";
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import { useBaseModals } from "@/shared/lib/use-notify";

const { cart } = cartStore();
const { userData } = userStore();
const { loading } = useBaseModals();

export const getCartProducts = async () => {
    loading.value = true;

    try{
        if(!userData.value) return;

        cart.value = await handler(`/cart/${userData.value.id}`, {
                method: 'GET',
        });
    }catch(err){
        console.error(`Failed to get the cart products:`, err);}
    finally {
        loading.value = false;
    }
};


