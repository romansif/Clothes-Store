import type { CartItem } from "@/entities/cart-item";
import type { OrderItem } from "@/entities/order";
import { toOrderItem } from "@/entities/order/lib/to-order-items";
import { isAgreeFormError } from "@/entities/product-info/model/add-to-cart-form";

export const saveOrderItems = (orderItems: OrderItem[], product: CartItem) => {
  const index = orderItems.findIndex((item) => item.id === product.id);
  if (index === -1) {
    orderItems.push(toOrderItem(product));
    isAgreeFormError.value.agreeMessage = false;
  } else {
    orderItems.splice(index, 1);
  }
  localStorage.setItem("orderItems", JSON.stringify(orderItems));
};
