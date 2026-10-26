import { handler} from "@/shared/api/http";
import { getCartProducts } from "@/widgets/cart-list/api/get-cart";
import { orderStore } from "@/shared/model/order.store";
import { isAgreeFormError } from "@/entities/product-info/model/add-to-cart-form";
import type { CartItem } from "@/entities/cart-item";

const { orderItems } = orderStore();

export const checkCartItem = async (id: string, product: CartItem, cart: CartItem[]) => {
    const userId = localStorage.getItem("userId");

    try{
        const productCart = cart.find((c: CartItem) => c.id === id);
        if(productCart){
            if(!productCart?.checked){
                await handler(`/cart/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        checked: true
                    })
                });
            }else{
                await handler(`/cart/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        checked: false
                    })
                });
            }
        }
        addToOrder(product);

        await getCartProducts(userId);
    }catch(err){
        console.error(`Failed to add the product to order:`, err);
    }
};

export const addToOrder = (product: CartItem) => {
    const index = orderItems.value.findIndex(
        item => item.id === product.id);
    if(index === -1) {
        orderItems.value.push(product);
        isAgreeFormError.value.agreeMessage = false
        localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
    }else{
        orderItems.value.splice(index, 1);
        localStorage.setItem('orderItems', JSON.stringify(orderItems.value));
    }
}