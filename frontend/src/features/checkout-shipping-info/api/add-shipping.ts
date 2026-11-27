import { useBaseModals } from "@/shared/ui/notification";
import { checkoutSession, type DeliveryMethod } from "@/entities/checkout-session";
import { shippingForm, shippingFormErrorMessage } from "@/entities/checkout-shipping";
import { addShippingSchema } from "@/entities/checkout-shipping";
import { applyZodErrors } from "@/shared/lib";
import { useRouter } from "vue-router";

const { openNotify } = useBaseModals();

export const useSelectShipping = () => {
  const router = useRouter()

  const selectShipping = async () => {
    const result = addShippingSchema.safeParse(shippingForm.value);
    if (!result.success) {
      applyZodErrors(result.error, shippingFormErrorMessage);
      return;
    }

    checkoutSession.delivery = shippingForm.value.delivery as DeliveryMethod;

    await openNotify({ variant: "shipping", state: "success" });

    await router.push({ name: "payment" });
  };

  return {
    selectShipping,
  };
};
