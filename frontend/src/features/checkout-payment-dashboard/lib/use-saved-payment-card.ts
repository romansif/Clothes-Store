import { isChosenPayment } from "@/entities/checkout-payment-item/model/payment.refs";
import { checkoutSession } from "@/entities/checkout-session/model/checkout-session";
import type { UserPayment } from "@/entities/user-payment/model/payment.types";

export const useSavedCard = (card: UserPayment) => {
  checkoutSession.paymentId = card.id;
  isChosenPayment.value = true;
};
