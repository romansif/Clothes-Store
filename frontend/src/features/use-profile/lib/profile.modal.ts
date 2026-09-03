import { ref } from "vue";
import { clearUsersForms } from "@/features/use-profile/lib/clear.users.ts";
import { useDeleteProduct } from "@/features/use-product/api/delete-product";
import { useDeleteCart } from "@/features/use-cart/api/delete-cart";
import { useDeleteAddress } from "@/features/use-checkout/api/address/delete-address.ts";
import { useDeletePayment } from "@/features/use-checkout/api/payment/delete-payment.ts";
import { useDeleteOrder } from "@/features/use-order/api/delete-order.ts";
import { useAuth } from "@/features/use-auth/api/use-auth.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";

const avatarModal = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);

const currentOrder= ref<boolean>(false);
const orderHistory = ref<boolean>(false);
const addressesAndCards = ref<boolean>(false);
const confidentialityData = ref<boolean>(false);

const generalId = ref<string>('');
const deleteType = ref<string>('');
const deleteMessage = ref<string>('');
const deleteChoice = ref<boolean>(false);

const { logout, deleteAccount } = useAuth();
const { deletePayment } = useDeletePayment();
const { deleteProduct } = useDeleteProduct();
const { deleteProductCart } = useDeleteCart();
const { deleteAddress } = useDeleteAddress();
const { deleteOrderProducts } = useDeleteOrder();
const { clearUpdateUserForm } = clearUsersForms();
const { deleteFavoriteProduct } = useToggleFavorite();

export const useProfileModals = () => {
    const toggleAvatar = () => {
        avatarModal.value = !avatarModal.value;
    }

    const openSelectAvatar = () => {
        fileInput.value?.click()
    }

    const toggleOrderHistory = () => {
        orderHistory.value = !orderHistory.value;
    }

    const toggleCurrentOrder = () => {
        currentOrder.value = !currentOrder.value;
    }

    const toggleConfidentialityData = () => {
        confidentialityData.value = !confidentialityData.value;
        clearUpdateUserForm();
    }

    const toggleAddressesAndCards = () => {
        addressesAndCards.value = !addressesAndCards.value;
    }

    const toggleDeleteChoice = (message: string, type: string, id: string) => {
        generalId.value = id;
        deleteType.value = type;
        deleteMessage.value = message;
        deleteChoice.value = !deleteChoice.value;
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
            deleteChoice.value = false
        }catch(err){
            console.log(`Не удалось провести ${deleteType.value}`, err);
        }
    };

    return {
        toggleAvatar,
        openSelectAvatar,

        toggleOrderHistory,
        toggleCurrentOrder,
        toggleConfidentialityData,
        toggleAddressesAndCards,

        orderHistory,
        currentOrder,
        confidentialityData,
        addressesAndCards,

        avatarModal,
        fileInput,

        deleteType,
        deleteMessage,
        deleteChoice,

        toggleDeleteChoice,
        generalDelete,
    }
}