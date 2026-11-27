import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { clearInformationForm } from "@/features/checkout-contact-info";
import { address_id, closeEditAddress } from "@/features/edit-saved-address";
import { EDITABLE_ADDRESS } from "@/features/edit-saved-address/model/edit-address.types";
import { informationForm } from "@/entities/checkout-info-form";
import { handler } from "@/shared/api";
import { useBaseModals } from "@/shared/ui/notification";

const { openNotify } = useBaseModals();

const buildPatch = () => {
  const patch: Record<string, string> = {};
  for (const field of EDITABLE_ADDRESS) {
    const value = String(informationForm.value[field] ?? "").trim();
    if (value) patch[field] = value;
  }
  return patch;
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateAddress,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["updateAddress"],
    mutationFn: async () => {
      if (!address_id) {
        throw new Error("Address id is missing");
      }

      const patch = buildPatch();
      if (!Object.keys(patch).length) throw new Error("Nothing to update");

      await handler(`/address/${address_id.value}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });

      clearInformationForm();
      closeEditAddress();
    },

    onSuccess: async () => {
      await openNotify({ variant: "edit-address", state: "error" });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userAddresses"] }),
        queryClient.invalidateQueries({ queryKey: ["userAddress"] }),
      ]);

      clearInformationForm();
      closeEditAddress();
    },

    onError: async () => {
      await openNotify({ variant: "edit-address", state: "error" });
    },
  });

  return {
    updateAddress,
    isPending,
    isError,
  };
};
