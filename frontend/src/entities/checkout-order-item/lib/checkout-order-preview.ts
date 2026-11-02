import { computed } from "vue";
import { useCheckoutItems } from "@/features/checkout-order-info/lib/use-checkout-items";
import type { CartItem } from "@/entities/cart-item";
import type { Product } from "@/shared";
import type { OrderItem } from "@/entities/order";

const { checkoutItems } = useCheckoutItems()

export const useCheckoutOrder = (
    props:{ product: Product; items: OrderItem[] }
) => {
    const item = computed(() =>
        checkoutItems.value.find((row) => row.id === props.product?.id) ??
        (props.product as CartItem),
    );

    const preview = computed(() => {
        const image = item.value?.images?.[0];
        return image ? `${import.meta.env.VITE_SERVER_URL}/${image}` : undefined;
    });

    const linePrice = computed(() => Number(item.value?.price) * Number(item.value?.quantity));

    return {
        item,
        preview,
        linePrice
    }
}