import { isAgreeFormError } from "@/entities/product-info/model/add-to-cart-form";
import type { CartItem } from "@/entities/cart-item";
import type { OrderItem } from "@/entities/order";

export const saveOrderItems = (orderItems: OrderItem[], product: CartItem) => {
    const index = orderItems.findIndex(
        item => item.id === product.id);
    if(index === -1) {
        orderItems.push(product);
        isAgreeFormError.value.agreeMessage = false
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
    }else{
        orderItems.splice(index, 1);
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
    }
}