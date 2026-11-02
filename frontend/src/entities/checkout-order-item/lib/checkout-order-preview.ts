import { computed } from "vue";
import { useCheckoutItems } from "@/features/checkout-order-info/lib/use-checkout-items";
import type { CartItem } from "@/entities/cart-item";
import type { Product } from "@/shared";


export const useCheckoutOrder = (product: Product) => {
    const { checkoutItems } = useCheckoutItems()

    const item = computed(() =>
        checkoutItems.value.find((row) => row.id === product?.id) ??
        (product as CartItem),
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