import type { CartItem } from "@/entities/cart-item";
import type { OrderItem } from "@/entities/order";

export type AddToOrderPayload = {
    product: CartItem;
    orderItems: OrderItem[];
};

export type UpdateCartItemPayload = {
    type: "add" | "remove";
    cartItem: CartItem;
};
