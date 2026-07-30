import { ref } from "vue";
import { useAuth } from "@/feature/auth/auth-composables/useAuth.ts";
import { useDeleteProduct } from "@/feature/products/composables/useDeleteProduct.ts";
import { useDeleteCheckout } from "@/feature/profile/profile-composables/useDeleteInfo.ts";

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
const { deleteAddress, deletePayment } = useDeleteCheckout();
const { deleteProduct, deleteProductCart, deleteFavoriteProduct, deleteOrderProducts } = useDeleteProduct();

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
    }

    const toggleAddressesAndCards = () => {
        addressesAndCards.value = !addressesAndCards.value;
    }

    const toggleDeleteChoice = (message: string, type: string, id: string) => {
        generalId.value = id;
        deleteType.value = type;
        deleteMessage.value = message;
        deleteChoice.value = !deleteChoice.value;
        console.log('a')
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

                case "DELETE_SAVED_CARD":
                    await deleteAddress(generalId.value)
                    break;

                case "DELETE_SAVED_ADDRESS":
                    await deletePayment(generalId.value)
                    break;
            }
            deleteChoice.value = false
        }catch(err){
            console.log(`Не удалось провести ${deleteType.value}`, err);
        }
    }

    return {
        toggleAvatar,
        openSelectAvatar,

        toggleOrderHistory,
        toggleCurrentOrder,
        toggleConfidentialityData,
        toggleAddressesAndCards,

        toggleDeleteChoice,
        generalDelete,

        orderHistory,
        currentOrder,
        confidentialityData,
        addressesAndCards,

        avatarModal,
        fileInput,

        deleteChoice,
        deleteMessage,
    }
}