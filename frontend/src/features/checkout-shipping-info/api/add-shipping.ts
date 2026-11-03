import router from "@/app/router";
import {
    shippingForm,
    shippingFormErrorMessage,
} from "@/entities/checkout-shipping/model/shipping-form";
import { addShippingSchema } from "@/entities/checkout-shipping/model/shipping-schemas";
import { applyZodErrors } from "@/shared/lib/errors-helper";
import { useBaseModals } from "@/widgets/notification/lib/use-notify";
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

       await openNotify({variant: "shipping", state: "success"});

       await router.push({ name: "payment" });
   }

   return {
       selectShipping
   }
};
