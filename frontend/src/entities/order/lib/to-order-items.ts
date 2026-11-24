import type { CartItem } from "@/entities/cart-item";
import type { OrderPosition } from "@/entities/order/model/order.types";

export type NewOrderPosition = Pick<
    OrderPosition,
    'id' | 'productId' | 'title' | 'category' | 'description' | 'sku' | 'price' | 'quantity' | 'size' | 'color' | 'images'
>;

export const toOrderItem = (c: CartItem): NewOrderPosition => ({
  id: c.id,
  productId: c.productId,
  title: c.title,
  category: c.category,
  description: c.description,
  sku: c.sku,
  price: Number(c.price),
  quantity: Number(c.quantity),
  size: c.size,
  color: c.color,
  images: (c.images?.[0] as unknown as string) ?? undefined,
});
