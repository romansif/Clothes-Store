import { useRouter } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { clearInformationForm } from "@/features/checkout-contact-info";
import { addContactInfoSchema, informationForm, informationFormErrorMessages } from "@/entities/checkout-info-form";
import { checkoutSession } from "@/entities/checkout-session";
import { handler } from "@/shared/api";
import { applyErrors, applyZodErrors } from "@/shared/lib";
import { useBaseModals } from "@/shared/ui/notification";

const { openNotify } = useBaseModals();

export const useConfirmInformation = () => {
  const router = useRouter();

  const confirmInformation = async () => {
    if (!checkoutSession.contactId || !checkoutSession.addressId) {
      await openNotify({ variant: "information", state: "error" });
      return;
    }
    clearInformationForm();

    await openNotify({ variant: "information", state: "success" });
    await router.push({ name: "shipping" });
  };

  return {
    confirmInformation,
  };
};

export const useCreateInformation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createInformation } = useMutation({
    mutationKey: ["createInformation"],
    mutationFn: async () => {
      const result = addContactInfoSchema.safeParse(informationForm.value);
      if (!result.success) {
        applyZodErrors(result.error, informationFormErrorMessages);
        return;
      }

      return await handler(`/address`, {
        method: "POST",
        body: JSON.stringify(informationForm.value),
      });
    },

    onSuccess: async (address) => {
      checkoutSession.contactId = address.id;
      checkoutSession.addressId = address.id;

      clearInformationForm();

      await openNotify({ variant: "information", state: "success" });
      await router.push({ name: "shipping" });

      await queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },

    onError: (err) => {
      applyErrors(err, informationFormErrorMessages);
    },
  });

  return {
    createInformation,
  };
};
