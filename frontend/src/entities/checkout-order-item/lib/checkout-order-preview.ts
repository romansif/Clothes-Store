import { computed } from "vue";
import type { Product } from "@/shared/model";
import type { CartItem } from "@/shared/model";

export const useCheckoutOrder = (product: Product, checkoutItems: CartItem[]) => {
  const item = computed(() => checkoutItems.find((row) => row.id === product?.id) ?? (product as CartItem));

  const preview = computed(() => {
    const image = item.value?.images?.[0];
    return image ? `${import.meta.env.VITE_SERVER_URL}/${image}` : undefined;
  });

  const linePrice = computed(() => Number(item.value?.price) * Number(item.value?.quantity));

  return {
    item,
    preview,
    linePrice,
  };
};
