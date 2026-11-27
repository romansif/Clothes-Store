import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { Product } from "@/shared/model";

import type { OrderPosition, SellerOrderProps } from "@/shared/model";

const clipboard = ref<boolean>(false);

const COMMISSION_RATE = 0.08;
const round2 = (n: number) => Math.round(n * 100) / 100;

export const useOrder = () => {
  const { t } = useI18n();

  const copyText = async (id: string) => {
    try {
      clipboard.value = true;

      setTimeout(() => {
        clipboard.value = false;
      }, 1500);

      await navigator.clipboard.writeText(id);
    } catch (err) {
      throw new Error("Error while copying");
    }
  };

  const orderQuantity = (product: Product) => {
    const quantityList = product.variants || [];

    const totalCount = quantityList.find((p) => p.size === product.sizes);

    return totalCount?.count ?? 0;
  };

  const orderPreview = (item: OrderPosition | SellerOrderProps) => {
    const image = item?.images;

    return computed(() => (image ? `${import.meta.env.VITE_SERVER_URL}/${image}` : undefined));
  };

  const orderSetStatus = (item: SellerOrderProps) => {
    let message = "";

    if (item.status === "Convene") {
      message = t("orders.setStatus.acceptToEnRoute");
    } else if (item.status === "En Route") {
      message = t("orders.setStatus.acceptToDelivered");
    } else {
      message = t("orders.setStatus.delivered");
    }

    return message;
  };

  const orderItemsPrice = (orderItems: OrderPosition[]) => {
    return computed(() => orderItems.reduce((sum, item) => sum + item.total_price, 0));
  };

  const orderCommission = (orderItems: OrderPosition[]) => {
    return computed(() => orderItems.reduce((sum, item) => sum + round2(item.total_price * COMMISSION_RATE), 0));
  };

  const hasReplace = (status: string) => {
    return computed(() => status !== "Cancelled" && status !== "Delivered");
  };

  return {
    clipboard,

    copyText,
    orderQuantity,
    orderPreview,
    orderSetStatus,
    orderItemsPrice,
    orderCommission,
    hasReplace,
  };
};
