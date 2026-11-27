import type { CartItem } from "@/shared/model";
import { toOrderItem } from "@/entities/order";
import type { NewOrderPosition } from "@/shared/model";
import { isAgreeFormError } from "@/entities/product-info";

export const saveOrderItems = (orderItems: NewOrderPosition[], product: CartItem) => {
  const index = orderItems.findIndex((item) => item.id === product.id);
  if (index === -1) {
    orderItems.push(toOrderItem(product));
    isAgreeFormError.value.agreeMessage = false;
  } else {
    orderItems.splice(index, 1);
  }
  localStorage.setItem("orderItems", JSON.stringify(orderItems));
};
