import { ref } from "vue";

import { useDeleteCartItem } from "@/features/cart-item-action";
import { useDeleteProduct } from "@/features/delete-my-product";
import { useDeleteAddress } from "@/features/delete-saved-address";
import { useDeletePayment } from "@/features/delete-saved-payment-card";
import { useDeleteFavoriteProduct } from "@/features/general-delete";
import { useDeleteOrder } from "@/features/order-action";
import { useDeleteAccount, useLogout } from "@/features/profile-menu";

const generalId = ref<string>("");
const deleteType = ref<string>("");
const deleteMessage = ref<string>("");
const deleteModal = ref<boolean>(false);

export const baseDeleteModal = () => {
  const { logout } = useLogout();
  const { deleteOrder } = useDeleteOrder();
  const { deleteAccount } = useDeleteAccount();
  const { deleteProduct } = useDeleteProduct();
  const { deleteCartItem } = useDeleteCartItem();
  const { deletePaymentCard } = useDeletePayment();
  const { deleteAddressItem } = useDeleteAddress();
  const { deleteFavoriteItem } = useDeleteFavoriteProduct();

  const toggleDeleteChoice = (message: string, type: string, id: string) => {
    generalId.value = id;
    deleteType.value = type;
    deleteMessage.value = message;
    deleteModal.value = !deleteModal.value;
  };

  const generalDelete = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      switch (deleteType.value) {
        case "EXIT":
          await logout();
          break;

        case "DELETE_ACCOUNT":
          await deleteAccount();
          break;

        case "DELETE_PROUCT_ITEM":
          await deleteProduct(generalId.value);
          break;

        case "DELETE_CART_ITEM":
          await deleteCartItem(generalId.value);
          break;

        case "DELETE_FAVORITE_ITEM":
          await deleteFavoriteItem(generalId.value);
          break;

        case "DELETE_ORDERS":
          await deleteOrder(generalId.value);
          break;

        case "DELETE_SAVED_ADDRESS":
          await deleteAddressItem(generalId.value);
          break;

        case "DELETE_SAVED_CARD":
          await deletePaymentCard(generalId.value);
          break;
      }
      deleteModal.value = false;
    } catch (err) {
      console.log(`Не удалось провести ${deleteType.value}`, err);
    }
  };

  return {
    generalId,
    deleteMessage,
    deleteModal,

    toggleDeleteChoice,
    generalDelete,
  };
};
