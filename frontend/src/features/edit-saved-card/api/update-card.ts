import { handler } from "@/shared/api/http";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import { useBaseModals } from "@/widgets/notification/lib/use-notify";
import {card_id, closeEditCard} from "@/features/edit-saved-card/lib/toggle-edit-card";
import { paymentForm } from "@/entities/checkout-payment-form/model/payment-form";
import { EDITABLE_CARD } from "@/features/edit-saved-card/model/edit-card.types";
import {clearPaymentForm} from "@/features/checkout-payment-dashboard/lib/clear-payment";

const { openNotify } = useBaseModals();

const buildPatch = () => {
    const patch: Record<string, string> = {};
    for (const field of EDITABLE_CARD) {
        const value = String(paymentForm.value[field] ?? "").trim();
        if (value) patch[field] = value;
    }
    return patch;
};

export const useUpdateCard = () => {
    const queryClient = useQueryClient()

    const {
        mutateAsync: updateCard,
        isPending,
        isError
    } = useMutation(({
        mutationKey: ["updateCard"],
        mutationFn: async () => {
            if(!card_id) {
                throw new Error("Card id is missing");
            }

            const patch = buildPatch()
            if (!Object.keys(patch).length) throw new Error("Nothing to update");


            await handler(`/payment/${card_id.value}`, {
                method: 'PATCH',
                body: JSON.stringify(patch)
            })

            clearPaymentForm()
            closeEditCard()
        },

        onSuccess: async () => {
            await openNotify({ variant: 'edit-payment', state: 'success' })

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['userPaymentCards'] }),
                queryClient.invalidateQueries({ queryKey: ['userPaymentCard'] })
            ])

            clearPaymentForm()
            closeEditCard()
        },

        onError: async () => {
            await openNotify({ variant: 'edit-payment', state: 'error' })
        }
    }))

    return {
        updateCard,
        isPending,
        isError
    }
}