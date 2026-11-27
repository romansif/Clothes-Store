import type { OrderItem } from "@/entities/order";
import type { CartItem } from "@/shared/model";

export type AddToOrderPayload = {
  product: CartItem;
  orderItems: OrderItem[];
};

export type UpdateCartItemPayload = {
  type: "add" | "remove";
  cartItem: CartItem;
};
