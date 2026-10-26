import { handler } from "@/shared/api/http";
import { orderStore } from "@/shared/model/order.store";
import { getCartProducts } from "@/widgets/cart-list/api/get-cart";
import { userData } from "@/shared/model/user.store";

const { orderItems } = orderStore();

export const updateCartChecked = async () => {
    if(!userData.value) return

    try{
        const allCartItems = await handler(`/cart/${userData.value.id}`, {
            method: "GET"
        });
        for(const item of allCartItems) {
            await handler(`/cart/${item.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    checked: false
                })
            })
        }
        orderItems.value = [];

        await getCartProducts(userData.value.id);
    }catch(err){
        console.error(`Failed to remove the products to status false:`, err);
    }
};
