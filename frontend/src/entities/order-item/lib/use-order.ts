import { computed, ref } from "vue";
import type { Product } from "@/shared";

import type { OrderPosition } from "@/entities/order";

const clipboard = ref<boolean>(false);

const COMMISSION_RATE = 0.08;
const round2 = (n: number) => Math.round(n * 100) / 100;

export const useOrder = () => {
  const copyText = async (text: string) => {
    try {
      clipboard.value = true;

      setTimeout(() => {
        clipboard.value = false;
      }, 1500);

      await navigator.clipboard.writeText(text);
    } catch (err) {
      throw new Error("Error while copying");
    }
  };

  const orderQuantity = (product: Product) => {
    const quantityList = product.variants || [];

    const totalCount = quantityList.find((p) => p.size === product.sizes);

    return totalCount?.count ?? 0;
  };

  const orderPreview = (item: OrderPosition) => {
    const image = item?.images?.[0];

    return computed(() => (image ? `${import.meta.env.VITE_SERVER_URL}/${image}` : undefined));
  };

  const orderItemsPrice = (orderItems: OrderPosition[]) => {
    return computed(() => orderItems.reduce((sum, item) => sum + item.total_price, 0));
  };

  const orderCommission = (orderItems: OrderPosition[]) => {
    return computed(() => orderItems.reduce((sum, item) => sum + round2(item.total_price * COMMISSION_RATE), 0));
  };

  return {
    clipboard,

    copyText,
    orderQuantity,
    orderPreview,
    orderItemsPrice,
    orderCommission,
  };
};
