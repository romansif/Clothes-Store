import { isChosenPayment } from "@/entities/checkout-payment-item";
import { checkoutSession } from "@/entities/checkout-session";
import type { UserPayment } from "@/entities/user-payment";

export const useSavedCard = (card: UserPayment) => {
  checkoutSession.paymentId = card.id;
  isChosenPayment.value = true;
};
