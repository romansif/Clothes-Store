import type { CartItem, Product } from "@/shared/model";

export const isInCart = (cart: CartItem[], product: Product) => {
  if (!cart || !product?.id) return;

  return cart.find((item) => item.productId === product.id);
};
