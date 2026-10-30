import { useMutation } from "@tanstack/vue-query";

import type { UpdateCartAndProductPayload } from "@/features/checkout-payment-dashboard";
import { useCreateOrder } from "@/features/checkout-payment-dashboard/api/create-order";
import { useUpdateCheckedQuantity } from "@/features/checkout-payment-dashboard/api/update-order-item";
import { clearPaymentForm } from "@/features/checkout-payment-dashboard/lib/clear-payment";
import { togglePaymentForm } from "@/features/checkout-payment-dashboard/lib/toggle-payment";
import {
    paymentForm,
    paymentFormErrorMessage,
} from "@/entities/checkout-payment-form/model/payment-form";
import { addPaymentSchema } from "@/entities/checkout-payment-form/model/payment-schemas";
import { handler } from "@/shared/api/http";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { useBaseModals } from "@/shared/lib/use-notify";
import {showSuccessFullPayment} from "@/features/payment-success/model/success-payment.refs";

const { openNotify } = useBaseModals();
const { paymentId } = togglePaymentForm();

const useFinalizeOrder = () => {
    const { createOrder } = useCreateOrder();
    const { updateCheckedQuantity } = useUpdateCheckedQuantity();

    return async ({ products, cart }: UpdateCartAndProductPayload) => {
        await createOrder();
        await updateCheckedQuantity({ products, cart });
    };
};

export const useAddPayment = () => {
    const finalizeOrder = useFinalizeOrder();

    const {
        mutateAsync: addPayment,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["addPayment"],
        mutationFn: async ({ products, cart }: UpdateCartAndProductPayload) => {
            await handler(`/payment/${paymentId.value}`, {
                method: "PUT",
                body: JSON.stringify({
                    paymentMethod: "card",
                    cardName: paymentForm.value.cardName,
                    cardNumber: paymentForm.value.cardNumber,
                    expiryDate: paymentForm.value.expiryDate,
                    cardCvv: String(paymentForm.value.cardCvv),
                }),
            });

            await finalizeOrder({ products, cart });
        },

        onSuccess: async () => {
            clearPaymentForm();

            await openNotify(
                "You have successfully paid and created order",
                "You will now be redirected to the profile page",
            );

            showSuccessFullPayment.value = true
        },

        onError: async (err) => {
            await openNotify(
                "You must choose",
                "Which card and payment method should we use for payment?",
            );

            throw new Error(`Ошибка при оплате`, err);
        },
    });

    return {
        addPayment,
        isPending,
        isError,
    };
};

export const useCreatePayment = () => {
    const finalizeOrder = useFinalizeOrder();
    const userId = localStorage.getItem("userId");

    const {
        mutateAsync: createPayment,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["createPayment"],
        mutationFn: async ({ products, cart }: UpdateCartAndProductPayload) => {
            const paymentId = localStorage.getItem("paymentId");

            const result = addPaymentSchema.safeParse(paymentForm.value);
            if (!result.success) {
                applyZodErrors(result.error, paymentFormErrorMessage);
                return;
            }

            if (paymentForm.value.paymentMethod === "card") {
                await handler(`/payment`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                        paymentId: paymentId,
                        paymentMethod: "card",
                        cardName: paymentForm.value.paymentMethod,
                        cardNumber: paymentForm.value.cardNumber,
                        expiryDate: paymentForm.value.expiryDate,
                        cardCvv: String(paymentForm.value.cardCvv),
                    }),
                });
            } else {
                await handler(`/payment`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                        paymentId: paymentId,
                        paymentMethod: paymentForm.value.paymentMethod,
                    }),
                });
            }

            await finalizeOrder({ products, cart });
        },

        onSuccess: () => {
            localStorage.removeItem("addressId");
            localStorage.removeItem("paymentId");

            showSuccessFullPayment.value = true
        },

        onError: async (err) => {
            applyErrors(err, paymentFormErrorMessage);

            throw new Error(`Ошибка при оплате`, err);
        },
    });

    return {
        createPayment,
        isPending,
        isError,
    };
};
