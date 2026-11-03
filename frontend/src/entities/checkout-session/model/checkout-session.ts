import { reactive, watch } from "vue";

export type DeliveryMethod = "standard" | "express";

export const checkoutSession = reactive({
  contactId: "",
  addressId: "",
  delivery: "",
  paymentId: "",
});

try {
  const saved = sessionStorage.getItem("checkoutSession");
  if (saved) Object.assign(checkoutSession, JSON.parse(saved));
} catch {}

watch(checkoutSession, () => {
  sessionStorage.setItem("checkoutSession", JSON.stringify(checkoutSession));
});

export const resetCheckoutSession = () => {
  checkoutSession.contactId = "";
  checkoutSession.addressId = "";
  checkoutSession.delivery = "";
  checkoutSession.paymentId = "";
};
