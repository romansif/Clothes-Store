import router from "@/app/router";
import {
    shippingForm,
    shippingFormErrorMessage,
} from "@/entities/checkout-shipping/model/shipping-form";
import { addShippingSchema } from "@/entities/checkout-shipping/model/shipping-schemas";
import { applyZodErrors } from "@/shared/lib/errors-helper";
import { useBaseModals } from "@/shared/lib/use-notify";
import { checkoutSession, type DeliveryMethod } from "@/entities/checkout-session/model/checkout-session";

const { openNotify } = useBaseModals();

export const useSelectShipping = () => {
   const selectShipping = async () => {
       const result = addShippingSchema.safeParse(shippingForm.value);
       if (!result.success) {
           applyZodErrors(result.error, shippingFormErrorMessage);
           return;
       }

       checkoutSession.delivery = shippingForm.value.delivery as DeliveryMethod

       await openNotify(
           "You have successfully added the shipping method",
           "You will now be redirected to the payment method selection page",
       );
       await router.push({ name: "payment" });
   }

   return {
       selectShipping
   }
};
