import { useMutation, useQueryClient } from "@tanstack/vue-query";

import router from "@/app/router";
import { clearInformationForm } from "@/features/checkout-contact-info/lib/clear-address";
import { toggleInformation } from "@/features/checkout-contact-info/lib/toggle-contact-info";
import {
    informationForm,
    informationFormErrorMessages,
} from "@/entities/checkout-info-form/model/information-form";
import { addContactInfoSchema } from "@/entities/checkout-info-form/model/information-schemas";
import { handler } from "@/shared/api/http";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { useBaseModals } from "@/shared/lib/use-notify";

const { openNotify } = useBaseModals();
const { informationId } = toggleInformation();

export const useAddInformation = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");

    const {
        mutateAsync: addInformation,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["addInformation"],
        mutationFn: async () => {
            if (!informationId.value) {
                throw new Error("ID чекаута не найден");
            }

            return await handler(`/address/${informationId.value}`, {
                method: "PUT",
                body: JSON.stringify({
                    userId: userId,
                    addressName: informationForm.value.addressName,
                    email: informationForm.value.email,
                    phone: informationForm.value.phone,
                    firstName: informationForm.value.firstName,
                    lastName: informationForm.value.lastName,
                    country: informationForm.value.country,
                    stateRegion: informationForm.value.stateRegion,
                    address: informationForm.value.address,
                    city: informationForm.value.city,
                    postalCode: informationForm.value.postalCode,
                }),
            });
        },

        onSuccess: async (data) => {
            clearInformationForm();

            await queryClient.invalidateQueries({ queryKey: ["userAddresses"] });

            localStorage.setItem("addressId", data.id);

            await router.push({ name: "shipping" });

            throw new Error("ID сохранен");
        },

        onError: async (err) => {
            await openNotify(
                "You must choose.",
                "What contact and address information should we use for delivery?",
            );

            throw new Error(`Ошибка при добавлении адреса`, err);
        },
    });

    return {
        addInformation,
        isPending,
        isError,
    };
};

export const useCreateInformation = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");

    const { mutateAsync: createInformation, isPending } = useMutation({
        mutationKey: ["createInformation"],
        mutationFn: async () => {
            const result = addContactInfoSchema.safeParse(informationForm.value);
            if (!result.success) {
                applyZodErrors(result.error, informationFormErrorMessages);
                return;
            }

            return await handler(`/address`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    addressName: informationForm.value.addressName,
                    email: informationForm.value.email,
                    phone: informationForm.value.phone,
                    firstName: informationForm.value.firstName,
                    lastName: informationForm.value.lastName,
                    country: informationForm.value.country,
                    stateRegion: informationForm.value.stateRegion,
                    address: informationForm.value.address,
                    city: informationForm.value.city,
                    postalCode: informationForm.value.postalCode,
                }),
            });
        },

        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["userAddresses"] });

            localStorage.setItem("addressId", data.id);

            console.log("Успешно сохранено в localStorage!");

            await openNotify(
                "You have successfully added the shipping address",
                "You will now be redirected to the shipping method selection page",
            );

            await router.push({ name: "shipping" });

            clearInformationForm();
        },

        onError: (err) => {
            applyErrors(err, informationFormErrorMessages);

            console.error(`Failed to create the new address:`, err);
        },
    });

    return {
        createInformation,
        isPending,
    };
};
