import { ref } from "vue";

import { clearUsersForms } from "@/features/change-user-data-form/lib/clear-user-update";

const savedAddresses = ref<boolean>(false);
const savedPaymentCard = ref<boolean>(false);
const confidentialityData = ref<boolean>(false);

const { clearUpdateUserForm } = clearUsersForms();

export const useProfileModals = () => {
  const toggleConfidentialityData = () => {
    confidentialityData.value = !confidentialityData.value;
    clearUpdateUserForm();
  };

  const toggleSavedAddresses = () => {
    savedAddresses.value = !savedAddresses.value;
  };

  const toggleSavedPaymentCard = () => {
    savedPaymentCard.value = !savedPaymentCard.value;
  };

  return {
    toggleConfidentialityData,
    toggleSavedAddresses,
    toggleSavedPaymentCard,

    confidentialityData,
    savedAddresses,
    savedPaymentCard,
  };
};
