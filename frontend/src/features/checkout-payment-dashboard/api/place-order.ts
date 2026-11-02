import { ref } from "vue";
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { clearPaymentForm } from "@/features/checkout-payment-dashboard/lib/clear-payment";
import { checkoutSession } from "@/entities/checkout-session/model/checkout-session";
import { addPaymentSchema } from "@/entities/checkout-payment-form/model/payment-schemas";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment-form/model/payment-form";
import router from "@/app/router";

const { openNotify } = useBaseModals();

export const usePlaceOrder = () => {
    const queryClient = useQueryClient()
    const idempotencyKey = ref(crypto.randomUUID());

    const { mutate, isPending, isError } = useMutation({mutationKey: ['placeOrder'],
        mutationFn: async ({ useSaved }: { useSaved: boolean }) => {
            const { contactId, addressId, delivery } = checkoutSession
            if( !contactId || !addressId || !delivery ){
                throw new Error("Please complete the contact and shipping steps first");
            }

            let paymentId = checkoutSession.paymentId

            if(useSaved){
                if(!checkoutSession.paymentId) throw new Error("Please choose a saved payment method.");
            }else{
                const result = addPaymentSchema.safeParse(paymentForm.value);
                if (!result.success) {
                    applyZodErrors(result.error, paymentFormErrorMessage);
                    return;
                }

                const isCard = paymentForm.value.paymentMethod === "card";
                const payment = await handler<{ id: string }>("/payment", {
                    method: "POST",
                    body: JSON.stringify(
                        isCard
                            ? {
                                paymentMethod: "card",
                                cardName: paymentForm.value.cardName,
                                cardNumber: paymentForm.value.cardNumber,
                                expiryDate: paymentForm.value.expiryDate,
                                cardCvv: paymentForm.value.cardCvv
                            }
                            : { paymentMethod: paymentForm.value.paymentMethod },
                    ),
                });
                paymentId = payment.id
                checkoutSession.paymentId = payment.id
            }

            return await handler("/orders", {
                method: "POST",
                body: JSON.stringify({
                    addressId,
                    contactId,
                    paymentId,
                    delivery,
                    idempotencyKey: idempotencyKey.value,
                }),
            });
        },

        onSuccess: async () => {
            idempotencyKey.value = crypto.randomUUID();
            clearPaymentForm();

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["products"] }),
                queryClient.invalidateQueries({ queryKey: ["orders"] }),
                queryClient.invalidateQueries({ queryKey: ["activeOrders"] }),
            ]);

            await router.push({ name: "payment-success" })
        },

        onError: async (err) => {
            applyErrors(err, paymentFormErrorMessage);

            await openNotify("Could not place the order", err.message);
        }
    });


    const placeOrder = (vars: { useSaved: boolean }) => {
        if (!isPending.value) mutate(vars);
    };

    return {
        placeOrder,
        isError,
        isPending
    };
}