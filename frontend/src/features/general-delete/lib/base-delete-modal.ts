import { ref } from "vue";

import { useDeletePayment } from "@/features/delete-saved-payment-card/api/delete-payment";
import { useDeleteCartItem } from "@/features/cart-item-action/api/delete-cart";
import { useDeleteAddress } from "@/features/delete-saved-address/api/delete-address";
import { useDeleteOrder } from "@/features/order-action/api/delete-order";
import { useLogout, useDeleteAccount } from "@/features/profile-menu/api/delete-logout-user.ts";
import { useDeleteFavoriteProduct } from "@/features/general-delete/api/delete-favorite-item";
import { useDeleteProduct } from "@/features/delete-my-product/api/delete-product";

const generalId = ref<string>('');
const deleteType = ref<string>('');
const deleteMessage = ref<string>('');
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
        console.log('SADA')
        generalId.value = id;
        deleteType.value = type;
        deleteMessage.value = message;
        deleteModal.value = !deleteModal.value;
    }

    const generalDelete = async () => {
        const userId = localStorage.getItem("userId");
        if(!userId) return

        try{
            switch (deleteType.value) {
                case "EXIT":
                    await logout()
                    break;

                case "DELETE_ACCOUNT":
                    await deleteAccount()
                    break;

                case "DELETE_PROUCT_ITEM":
                    await deleteProduct(generalId.value)
                    break

                case "DELETE_CART_ITEM":
                    await deleteCartItem(generalId.value)
                    break;

                case "DELETE_FAVORITE_ITEM":
                    await deleteFavoriteItem(generalId.value)
                    break;

                case "DELETE_ORDERS":
                    await deleteOrder(generalId.value)
                    break;

                case "DELETE_SAVED_ADDRESS":
                    await deleteAddressItem(generalId.value)
                    break;

                case "DELETE_SAVED_CARD":
                    await deletePaymentCard(generalId.value)
                    break;
            }
            deleteModal.value = false
        }catch(err){
            console.log(`Не удалось провести ${deleteType.value}`, err);
        }
    };

    return {
        generalId,
        deleteMessage,
        deleteModal,

        toggleDeleteChoice,
        generalDelete,
    }
}