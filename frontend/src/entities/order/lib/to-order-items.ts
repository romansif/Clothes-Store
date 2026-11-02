import type { CartItem } from "@/entities/cart-item";
import type { OrderItem } from "@/entities/order";

export const toOrderItem = (c: CartItem): OrderItem => ({
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
    image: (c.images?.[0] as unknown as string) ?? undefined,
});