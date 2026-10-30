import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { v4 as uuidv4 } from "uuid";

import router from "@/app/router";
import { clearShippingForm } from "@/features/checkout-shipping-info/lib/clear-shipping";
import {
    shippingForm,
    shippingFormErrorMessage,
} from "@/entities/checkout-shipping/model/shipping-form";
import { addShippingSchema } from "@/entities/checkout-shipping/model/shipping-schemas";
import { handler } from "@/shared/api/http";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { useBaseModals } from "@/shared/lib/use-notify";

const { openNotify } = useBaseModals();

export const useAddShipping = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");

    const {
        mutateAsync: addShipping,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["addShipping"],
        mutationFn: async () => {
            const result = addShippingSchema.safeParse(shippingForm.value);

            if (!result.success) {
                applyZodErrors(result.error, shippingFormErrorMessage);
                return;
            }

            return await handler(`/shipping`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    paymentId: uuidv4(),
                    delivery: shippingForm.value.delivery,
                }),
            });
        },

        onSuccess: async (data) => {
            localStorage.setItem("paymentId", data.paymentId);

            await queryClient.invalidateQueries({ queryKey: ["shipping"] });

            await openNotify(
                "You have successfully added the shipping method",
                "You will now be redirected to the payment method selection page",
            );
            await router.push({ name: "payment" });

            clearShippingForm();
        },

        onError: (err) => {
            applyErrors(err, shippingFormErrorMessage);

            throw new Error(`Ошибка при выборе способа доставки`, err);
        },
    });

    return {
        addShipping,
        isPending,
        isError,
    };
};
