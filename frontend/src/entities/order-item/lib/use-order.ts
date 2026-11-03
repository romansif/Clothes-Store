import { ref } from "vue";
import type { Product } from "@/shared";

const clipboard = ref<boolean>(false);

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

  return {
    clipboard,

    copyText,
    orderQuantity,
  };
};
