import { computed } from "vue";
import { useI18n } from "vue-i18n";

import router from "@/app/router";
import { useCartData } from "@/widgets/cart-list";
import type { CartItem } from "@/entities/cart-item";
import { isAgreeFormError, isAgreeFormErrorMessage } from "@/entities/product-info";

const COMMISSION_RATE = 0.08;
const round2 = (n: number) => Math.round(n * 100) / 100;

export const useCartOrderInfo = () => {
  const { t } = useI18n();
  const { cart } = useCartData();

  const checkedItems = computed(() => {
    return cart.value.filter((item: CartItem) => item.checked);
  });

  const price = computed(() => {
    return checkedItems.value.reduce(
      (sum: number, item: CartItem) => sum + Number(item.price) * Number(item.quantity),
      0,
    );
  });

  const commissionPrice = computed(() => {
    return round2(price.value * COMMISSION_RATE);
  });

  const totalPrice = computed(() => {
    return price.value + commissionPrice.value;
  });

  const toggleAgree = () => {
    isAgreeFormError.value.agree = !isAgreeFormError.value.agree;
  };

  const continueToOrder = async () => {
    const isChecked = cart.value.some((item) => item.checked);

    try {
      if (!isAgreeFormError.value.agree && !isChecked) {
        isAgreeFormErrorMessage.value.agree = t("errors.selectItemsAndAgree");
        return;
      } else if (!isAgreeFormError.value.agree) {
        isAgreeFormErrorMessage.value.agree = t("errors.agreeTerms");
        return;
      } else if (!isChecked) {
        isAgreeFormErrorMessage.value.agree = t("errors.selectItems");
        return;
      } else {
        isAgreeFormErrorMessage.value.agree = "";
        isAgreeFormError.value.agree = false;

        await router.push({ name: "information" });
      }
    } catch (err) {
      console.error(`Failed to go the create order:`, err);
    }
  };

  return {
    price,
    commissionPrice,
    totalPrice,
    toggleAgree,
    continueToOrder,
  };
};
