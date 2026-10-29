import router from "@/app/router";
import { v4 as uuidv4 } from 'uuid';
import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { clearShippingForm } from "@/features/checkout-shipping-info/lib/clear-shipping";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { shippingForm, shippingFormErrorMessage } from "@/entities/checkout-shipping/model/shipping-form";
import { addShippingSchema } from "@/entities/checkout-shipping/model/shipping-schemas";

const { openNotify  } = useBaseModals();

export const useAddShipping = () => {
    const queryClient = useQueryClient()
    const userId = localStorage.getItem("userId");

    const { mutateAsync: addShipping, isPending, isError } = useMutation({mutationKey: ['addShipping'],
        mutationFn: async () => {
            const result = addShippingSchema.safeParse(shippingForm.value)

            if(!result.success){
                applyZodErrors(
                    result.error,
                    shippingFormErrorMessage
                );
                return
            }

            return await handler(`/shipping`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    paymentId: uuidv4(),
                    delivery: shippingForm.value.delivery,
                })
            });
        },

        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ['shipping']})

            localStorage.setItem("paymentId", data.paymentId);

            await openNotify('You have successfully added the shipping method',
                'You will now be redirected to the payment method selection page')
            await router.push({name: 'payment'})

            clearShippingForm();
        },

        onError: (err) => {
            applyErrors(err, shippingFormErrorMessage)

            console.error(`Ошибка при выборе способа доставки`, err);
        }
    })

    return {
        addShipping,
        isPending,
        isError
    }
}