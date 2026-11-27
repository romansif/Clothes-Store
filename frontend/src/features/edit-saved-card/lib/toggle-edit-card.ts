import { ref } from "vue";

import { useProfileModals } from "@/shared/lib";

export const editCardModal = ref<boolean>(false);
export const card_id = ref<string>("");

export const openEditCard = (id: string) => {
  const { savedPaymentCard } = useProfileModals();

  editCardModal.value = true;
  savedPaymentCard.value = false;
  card_id.value = id;
};

export const closeEditCard = () => {
  const { savedPaymentCard } = useProfileModals();

  editCardModal.value = false;
  savedPaymentCard.value = true;
};
