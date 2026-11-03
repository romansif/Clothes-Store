import { computed } from "vue";

import { useCheckoutItems } from "@/features/checkout-order-info/lib/use-checkout-items";
import type { CartItem } from "@/entities/cart-item";
import { checkoutSession } from "@/entities/checkout-session/model/checkout-session";

const COMMISSION_RATE = 0.08;
const EXPRESS_PRICE = 15;
const round2 = (n: number) => Math.round(n * 100) / 100;

export const orderPriceInfo = () => {
  const { checkoutItems } = useCheckoutItems();

  const price = computed(() => round2(checkoutItems.value.reduce((sum: number, item: CartItem) => sum + Number(item.price) * Number(item.quantity), 0)));

  const commissionPrice = computed(() => round2(price.value * COMMISSION_RATE));

  const ship = computed(() => (checkoutSession.delivery === "express" ? EXPRESS_PRICE : 0));

  const totalPrice = computed(() => round2(price.value + commissionPrice.value + ship.value));

  return {
    price,
    commissionPrice,
    ship,
    totalPrice,
  };
};
