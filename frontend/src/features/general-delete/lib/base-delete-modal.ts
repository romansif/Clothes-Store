import { ref } from "vue";

import { useDeletePayment } from "@/features/saved-payment-card/api/delete-payment";
import { deleteProduct } from "@/features/my-products/api/delete-product";
import { deleteProductCart } from "@/features/cart-item-action/api/delete-cart";
import { useDeleteAddress } from "@/features/saved-user-address/api/delete-address";
import { useDeleteOrder } from "@/features/order-action/api/delete-order";
import { getMyProducts } from "@/features/my-products/api/get-my-product";
import { deleteAccount, logout } from "@/features/general-delete/api/delete-logout-user.ts";
import { deleteFavoriteProduct } from "@/features/general-delete/api/delete-favorite-item";

const { deletePayment } = useDeletePayment();
const { deleteAddress } = useDeleteAddress();
const { deleteOrderProducts } = useDeleteOrder();

const generalId = ref<string>('');
const deleteType = ref<string>('');
const deleteMessage = ref<string>('');
const deleteModal = ref<boolean>(false);

export const baseDeleteModal = () => {
    const toggleDeleteChoice = (message: string, type: string, id: string) => {
        console.log('SADA')
        generalId.value = id;
        deleteType.value = type;
        deleteMessage.value = message;
        deleteModal.value = !deleteModal.value;
    }

    const generalDelete = async () => {
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
                    await getMyProducts()
                    break

                case "DELETE_CART_ITEM":
                    await deleteProductCart(generalId.value)
                    break;

                case "DELETE_FAVORITE_ITEM":
                    await deleteFavoriteProduct(generalId.value)
                    break;

                case "DELETE_ORDERS":
                    await deleteOrderProducts(generalId.value)
                    break;

                case "DELETE_SAVED_ADDRESS":
                    await deleteAddress(generalId.value)
                    break;

                case "DELETE_SAVED_CARD":
                    await deletePayment(generalId.value)
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